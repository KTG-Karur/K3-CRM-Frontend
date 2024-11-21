import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { deputationContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDeputationRequest, getDeputationRequest, getStaffRequest, resetCreateDeputation, resetGetDeputation, resetUpdateDeputation, resetGetBranch, resetGetStaff, updateDeputationRequest, getBranchRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getDeputationSuccess, getDeputationList, getDeputationFailure,
        createDeputationSuccess, createDeputationData, createDeputationFailure,
        updateDeputationSuccess, updateDeputationData, updateDeputationFailure,
        errorMessage, getBranchFailure, getBranchList, getBranchSuccess, getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getDeputationSuccess: state.deputationReducer.getDeputationSuccess,
        getDeputationList: state.deputationReducer.getDeputationList,
        getDeputationFailure: state.deputationReducer.getDeputationFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        createDeputationSuccess: state.deputationReducer.createDeputationSuccess,
        createDeputationData: state.deputationReducer.createDeputationData,
        createDeputationFailure: state.deputationReducer.createDeputationFailure,

        updateDeputationSuccess: state.deputationReducer.updateDeputationSuccess,
        updateDeputationData: state.deputationReducer.updateDeputationData,
        updateDeputationFailure: state.deputationReducer.updateDeputationFailure,

        errorMessage: state.deputationReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'deputationDate',
            Cell: ({ row }) => {
                return (
                    <div>
                       {dateConversion(row.original.deputationDate, "DD-MM-YYYY") }
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
            accessor: 'fromPlaceName',
            sort: true,
        },
        {
            Header: 'To',
            accessor: 'toPlaceName',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'statusId',
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
        staffList: [],
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
        dispatch(getStaffRequest());      
        dispatch(getDeputationRequest());  
        dispatch(getBranchRequest());      
    }, []);

    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                staffList: getStaffList,
            });
            dispatch(resetGetStaff());
        } else if (getStaffFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                staffList: [],
            });
            dispatch(resetGetStaff());
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (getDeputationSuccess) {
            setIsLoading(false)
            setParentList(getDeputationList)
            dispatch(resetGetDeputation())
        } else if (getDeputationFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDeputation())
        }
    }, [getDeputationSuccess, getDeputationFailure]);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            console.log(getBranchList)
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
        if (createDeputationSuccess) {
            const temp_state = [createDeputationData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDeputation())
        } else if (createDeputationFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDeputation())
        }
    }, [createDeputationSuccess, createDeputationFailure]);

    useEffect(() => {
        if (updateDeputationSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDeputationData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDeputation())
        } else if (updateDeputationFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDeputation())
        }
    }, [updateDeputationSuccess, updateDeputationFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            deputationDate: '',
            staffId: '',
            fromPlace: '',
            toPlace: '',
            fromDate: '',
            toDate: '',
            reason: '',
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
            fromPlace: data?.fromPlace || "",
            toPlace: data?.toPlace || "",
            deputationDate: data.deputationDate ? dateConversion(data.deputationDate, "YYYY-MM-DD") : "",
            fromDate: data.fromDate ? dateConversion(data.fromDate, "YYYY-MM-DD") : "",
            toDate: data.toDate ? dateConversion(data.toDate, "YYYY-MM-DD") : "",
            reason: data?.reason || ""

            

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
            fromPlace: state?.fromPlace || "",
            toPlace: state?.toPlace || "",
            deputationDate: state.deputationDate ? dateConversion(state.deputationDate, "YYYY-MM-DD") : "",
            fromDate: state.fromDate ? dateConversion(state.fromDate, "YYYY-MM-DD") : "",
            toDate: state.toDate ? dateConversion(state.toDate, "YYYY-MM-DD") : "",
            reason: state?.reason || ""            

        }
        if (isEdit) {
            dispatch(updateDeputationRequest(submitRequest, selectedItem.deputationId))
        } else {
            console.log(submitRequest)
            dispatch(createDeputationRequest(submitRequest))
        }
    };

    
    return (
        <React.Fragment>
            <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Deputation List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Deputation Order'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={deputationContainer}
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
