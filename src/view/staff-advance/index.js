import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffAdvanceContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createStaffAdvanceRequest, getActivityRequest, getStaffAdvanceRequest, resetCreateStaffAdvance, resetGetActivity, resetGetStaffAdvance, resetUpdateStaffAdvance, updateStaffAdvanceRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getStaffAdvanceSuccess, getStaffAdvanceList, getStaffAdvanceFailure,
        getActivitySuccess, getActivityList, getActivityFailure,
        createStaffAdvanceSuccess, createStaffAdvanceData, createStaffAdvanceFailure,
        updateStaffAdvanceSuccess, updateStaffAdvanceData, updateStaffAdvanceFailure,
        errorMessage,

    } = appSelector((state) => ({
        getStaffAdvanceSuccess: state.staffAdvanceReducer.getStaffAdvanceSuccess,
        getStaffAdvanceList: state.staffAdvanceReducer.getStaffAdvanceList,
        getStaffAdvanceFailure: state.staffAdvanceReducer.getStaffAdvanceFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createStaffAdvanceSuccess: state.staffAdvanceReducer.createStaffAdvanceSuccess,
        createStaffAdvanceData: state.staffAdvanceReducer.createStaffAdvanceData,
        createStaffAdvanceFailure: state.staffAdvanceReducer.createStaffAdvanceFailure,

        updateStaffAdvanceSuccess: state.staffAdvanceReducer.updateStaffAdvanceSuccess,
        updateStaffAdvanceData: state.staffAdvanceReducer.updateStaffAdvanceData,
        updateStaffAdvanceFailure: state.staffAdvanceReducer.updateStaffAdvanceFailure,

        errorMessage: state.staffAdvanceReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'applyDate',
            Cell: ({ row }) => {
                return (
                    <div>
                       {dateConversion(row.original.applyDate, "DD-MM-YYYY") }
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
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)        
        dispatch(getStaffAdvanceRequest());        
    }, []);

    useEffect(() => {
        if (getStaffAdvanceSuccess) {
            setIsLoading(false)
            setParentList(getStaffAdvanceList)
            dispatch(resetGetStaffAdvance())
        } else if (getStaffAdvanceFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaffAdvance())
        }
    }, [getStaffAdvanceSuccess, getStaffAdvanceFailure]);

    useEffect(() => {
        if (createStaffAdvanceSuccess) {
            const temp_state = [createStaffAdvanceData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaffAdvance())
        } else if (createStaffAdvanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffAdvance())
        }
    }, [createStaffAdvanceSuccess, createStaffAdvanceFailure]);

    useEffect(() => {
        if (updateStaffAdvanceSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffAdvanceData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaffAdvance())
        } else if (updateStaffAdvanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffAdvance())
        }
    }, [updateStaffAdvanceSuccess, updateStaffAdvanceFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            applyDate: '',
            staffId: '',
            amount: '',
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
            amount: data?.amount || "",
            reason: data?.reason || "",
            applyDate: data.applyDate ? dateConversion(data.applyDate, "YYYY-MM-DD") : ""
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
            amount: state?.amount || "",
            reason: state?.reason || "",
            advanceStatus: 28,
            applyDate: state.applyDate ? dateConversion(state.applyDate, "YYYY-MM-DD") : "",
        }
        if (isEdit) {
            dispatch(updateStaffAdvanceRequest(submitRequest, selectedItem.staffAdvanceId))
        } else {
            console.log(submitRequest)
            dispatch(createStaffAdvanceRequest(submitRequest))
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
                Title={'Staff Advance List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Staff Advance'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={staffAdvanceContainer}
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
