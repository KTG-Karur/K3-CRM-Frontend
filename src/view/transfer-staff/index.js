import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { transferStaffContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createTransferStaffRequest, getActivityRequest, getBranchRequest, getTransferStaffRequest, resetCreateTransferStaff, resetGetActivity, resetGetBranch, resetGetTransferStaff, resetUpdateTransferStaff, updateTransferStaffRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getTransferStaffSuccess, getTransferStaffList, getTransferStaffFailure,
        getActivitySuccess, getActivityList, getActivityFailure,
        createTransferStaffSuccess, createTransferStaffData, createTransferStaffFailure,
        updateTransferStaffSuccess, updateTransferStaffData, updateTransferStaffFailure,
        errorMessage, getBranchFailure, getBranchList, getBranchSuccess

    } = appSelector((state) => ({
        getTransferStaffSuccess: state.transferStaffReducer.getTransferStaffSuccess,
        getTransferStaffList: state.transferStaffReducer.getTransferStaffList,
        getTransferStaffFailure: state.transferStaffReducer.getTransferStaffFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createTransferStaffSuccess: state.transferStaffReducer.createTransferStaffSuccess,
        createTransferStaffData: state.transferStaffReducer.createTransferStaffData,
        createTransferStaffFailure: state.transferStaffReducer.createTransferStaffFailure,

        updateTransferStaffSuccess: state.transferStaffReducer.updateTransferStaffSuccess,
        updateTransferStaffData: state.transferStaffReducer.updateTransferStaffData,
        updateTransferStaffFailure: state.transferStaffReducer.updateTransferStaffFailure,

        errorMessage: state.transferStaffReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'transferDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.transferDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'From',
            accessor: 'transferFromName',
            sort: true,
        },
        {
            Header: 'To',
            accessor: 'transferToName',
            sort: true,
        },

        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>

                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        staffList: [
            { staffId: 1, staffName: 'Suki' },
            { staffId: 2, staffName: 'Ragul' },
            { staffId: 3, staffName: 'Mohan' },
        ],
        branchList: [],
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getTransferStaffRequest());
        dispatch(getBranchRequest());
    }, []);

    useEffect(() => {
        if (getTransferStaffSuccess) {
            setIsLoading(false)
            setParentList(getTransferStaffList)
            dispatch(resetGetTransferStaff())
        } else if (getTransferStaffFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetTransferStaff())
        }
    }, [getTransferStaffSuccess, getTransferStaffFailure]);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            // console.log(getBranchList)
            setOptionListState({
                ...optionListState,
                branchList: getBranchList
            })
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: []
            })
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);

    useEffect(() => {
        if (createTransferStaffSuccess) {
            const temp_state = [createTransferStaffData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateTransferStaff())
        } else if (createTransferStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateTransferStaff())
        }
    }, [createTransferStaffSuccess, createTransferStaffFailure]);

    useEffect(() => {
        if (updateTransferStaffSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateTransferStaffData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateTransferStaff())
        } else if (updateTransferStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateTransferStaff())
        }
    }, [updateTransferStaffSuccess, updateTransferStaffFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            transferDate: '',
            staffId: '',
            transferFrom: '',
            transferTo: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {        
        setState({
            ...state,
            staffId: data?.staffId || "",
            transferFrom: data?.transferFrom || "",
            transferTo: data?.transferTo || "",
            transferDate: data.transferDate ? dateConversion(data.transferDate, "YYYY-MM-DD") : ""
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            staffId: state?.staffId || "",
            transferFrom: state?.transferFrom || "",
            transferTo: state?.transferTo || "",
            transferDate: state.transferDate ? dateConversion(state.transferDate, "YYYY-MM-DD") : "",
        }
        if (isEdit) {
            dispatch(updateTransferStaffRequest(submitRequest, selectedItem.transferStaffId))
        } else {
            console.log(submitRequest)
            dispatch(createTransferStaffRequest(submitRequest))
        }
    };


    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <Table
                    columns={columns}
                    Title={'Transfer Order List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Transfer Order'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={transferStaffContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
