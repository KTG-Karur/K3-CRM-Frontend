import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffLeaveContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createStaffLeaveRequest, getStaffLeaveRequest, resetCreateStaffLeave, resetGetStaffLeave, resetUpdateStaffLeave, updateStaffLeaveRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getStaffLeaveSuccess, getStaffLeaveList, getStaffLeaveFailure,
        createStaffLeaveSuccess, createStaffLeaveData, createStaffLeaveFailure,
        updateStaffLeaveSuccess, updateStaffLeaveData, updateStaffLeaveFailure,
        errorMessage,

    } = appSelector((state) => ({
        getStaffLeaveSuccess: state.staffLeaveReducer.getStaffLeaveSuccess,
        getStaffLeaveList: state.staffLeaveReducer.getStaffLeaveList,
        getStaffLeaveFailure: state.staffLeaveReducer.getStaffLeaveFailure,

        createStaffLeaveSuccess: state.staffLeaveReducer.createStaffLeaveSuccess,
        createStaffLeaveData: state.staffLeaveReducer.createStaffLeaveData,
        createStaffLeaveFailure: state.staffLeaveReducer.createStaffLeaveFailure,

        updateStaffLeaveSuccess: state.staffLeaveReducer.updateStaffLeaveSuccess,
        updateStaffLeaveData: state.staffLeaveReducer.updateStaffLeaveData,
        updateStaffLeaveFailure: state.staffLeaveReducer.updateStaffLeaveFailure,

        errorMessage: state.staffLeaveReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Leave Type',
            accessor: 'leaveTypeName',
            sort: true,
        },
        {
            Header: 'From Date',
            accessor: 'fromDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.fromDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'To Date',
            accessor: 'toDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.toDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Reason',
            accessor: 'reason',
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
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [optionListState, setOptionListState] = useState({
        staffList: [
            { staffId: 1, staffName: 'Suki' },
            { staffId: 2, staffName: 'Ragul' },
            { staffId: 3, staffName: 'Mohan' },
        ],
        leaveTypeList : [
            { leaveTypeId: 26, leaveTypeName: 'Causal Leave' },
            { leaveTypeId: 27, leaveTypeName: 'Sick Leave' }
        ]
    })
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStaffLeaveRequest());
    }, []);

    useEffect(() => {
        if (getStaffLeaveSuccess) {
            setIsLoading(false)
            setParentList(getStaffLeaveList)
            dispatch(resetGetStaffLeave())
        } else if (getStaffLeaveFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaffLeave())
        }
    }, [getStaffLeaveSuccess, getStaffLeaveFailure]);

    useEffect(() => {
        if (createStaffLeaveSuccess) {
            const temp_state = [createStaffLeaveData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaffLeave())
        } else if (createStaffLeaveFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffLeave())
        }
    }, [createStaffLeaveSuccess, createStaffLeaveFailure]);

    useEffect(() => {
        if (updateStaffLeaveSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffLeaveData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaffLeave())
        } else if (updateStaffLeaveFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffLeave())
        }
    }, [updateStaffLeaveSuccess, updateStaffLeaveFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            staffId: '',
            leaveTypeId: '',
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
            leaveTypeId: data?.leaveTypeId || "",
            fromDate: data?.fromDate || "",
            toDate: data?.toDate || "",
            reason: data?.reason || "",
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
            leaveTypeId: state?.leaveTypeId || "",
            fromDate: state?.fromDate || "",
            toDate: state?.toDate || "",
            reason: state?.reason || "",
        }
        if (isEdit) {
            dispatch(updateStaffLeaveRequest(submitRequest, selectedItem.staffLeaveId))
        } else {
            dispatch(createStaffLeaveRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateStaffLeaveRequest(submitRequest, data.staffLeaveId))
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
                Title={'Leave Apply List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Leave Request'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead ={true}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={staffLeaveContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    optionListState={optionListState}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
