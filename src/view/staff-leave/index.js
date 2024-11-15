import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffLeaveContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, noOfDayCount, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createStaffLeaveRequest,
    getStaffLeaveRequest,
    getStaffRequest,
    resetCreateStaffLeave,
    resetGetStaff,
    resetGetStaffLeave,
    resetUpdateStaffLeave,
    updateStaffLeaveRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';

let isEdit = false;

function Index({ userRole, userRights }) {
    const { dispatch, appSelector } = useRedux();

    const {
        getStaffLeaveSuccess,
        getStaffLeaveList,
        getStaffLeaveFailure,
        createStaffLeaveSuccess,
        createStaffLeaveData,
        createStaffLeaveFailure,
        updateStaffLeaveSuccess,
        updateStaffLeaveData,
        updateStaffLeaveFailure,
        errorMessage,

        getStaffSuccess,
        getStaffList,
        getStaffFailure,
    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

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
    const isUserCanCreate = userRole === 'Staff' && userRights.staff_leave_ins;
    const isUserCanUpdate = userRole === 'Staff' && userRights.staff_leave_upd;
    const isUserCanDelete = userRole === 'Staff' && userRights.staff_leave_del;
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
                return <div>{dateConversion(row.original.fromDate, 'DD-MM-YYYY')}</div>;
            },
        },
        {
            Header: 'To Date',
            accessor: 'toDate',
            Cell: ({ row }) => {
                return <div>{dateConversion(row.original.toDate, 'DD-MM-YYYY')}</div>;
            },
        },
        {
            Header: 'Reason',
            accessor: 'reason',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'nothig',
            Cell: ({ row }) => (
                <Badge
                    bg={
                        row.original.leaveStatusId === 30
                            ? 'danger'
                            : row.original.leaveStatusId === 28
                                ? 'primary'
                                : 'success'
                    }>
                    {row.original.leaveStatusId === 30
                        ? 'Cancelled'
                        : row.original.leaveStatusId === 28
                            ? 'Request'
                            : 'Approved'}
                </Badge>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original.leaveStatusId === 28 && (
                            <span>
                                {(isUserCanUpdate || userRole === 'Admin') && (
                                    <>
                                <span
                                    className="text-primary  me-2 cursor-pointer"
                                    onClick={() => onEditForm(row.original, row.index)}>
                                    <i className={'fe-edit-1'}></i>
                                </span>
                                <span
                                    className={`text-success me-2 cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Approved?',
                                            () => onStatusForm(row.original, row.index, 29),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-up'}></i>
                                </span>
                                <span
                                    className={`text-danger cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Cancelled?',
                                            () => onStatusForm(row.original, row.index, 30),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-down'}></i>
                                </span>
                                </>
                                )}
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({
        minmumFrom: moment().format("YYYY-MM-DD"),
        minmumTo: moment().format("YYYY-MM-DD"),
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        leaveTypeList: [
            { leaveTypeId: 26, leaveTypeName: 'Causal Leave' },
            { leaveTypeId: 27, leaveTypeName: 'Sick Leave' },
        ],
    });
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getStaffLeaveRequest());
        dispatch(getStaffRequest());
    }, []);

    useEffect(() => {
        setState({
            ...state,
            minmumTo: state?.fromDate,
            dayCount: noOfDayCount(state?.fromDate, state?.toDate)
        })
    }, [state?.fromDate, state?.toDate])

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
        if (getStaffLeaveSuccess) {
            setIsLoading(false);
            setParentList(getStaffLeaveList);
            dispatch(resetGetStaffLeave());
        } else if (getStaffLeaveFailure) {
            setIsLoading(false);
            setParentList([]);
            dispatch(resetGetStaffLeave());
        }
    }, [getStaffLeaveSuccess, getStaffLeaveFailure]);

    useEffect(() => {
        if (createStaffLeaveSuccess) {
            const temp_state = [createStaffLeaveData[0], ...parentList];
            setParentList(temp_state);
            showMessage('success', 'Created Successfully');
            closeModel();
            dispatch(resetCreateStaffLeave());
        } else if (createStaffLeaveFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffLeave());
        }
    }, [createStaffLeaveSuccess, createStaffLeaveFailure]);

    useEffect(() => {
        if (updateStaffLeaveSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffLeaveData[0];
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel();
            dispatch(resetUpdateStaffLeave());
        } else if (updateStaffLeaveFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffLeave());
        }
    }, [updateStaffLeaveSuccess, updateStaffLeaveFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear();
        setModal(false);
    };

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
        onFormClear();
        isEdit = false;
        setModal(true);
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            staffId: data?.staffId || '',
            leaveTypeId: data?.leaveTypeId || '',
            fromDate: data?.fromDate || '',
            toDate: data?.toDate || '',
            reason: data?.reason || '',
        });
        isEdit = true;
        setSelectedItem(data);
        setSelectedIndex(index);
        setModal(true);
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const onFormSubmit = async () => {
        let submitRequest = {
            staffId: state?.staffId || '',
            leaveTypeId: state?.leaveTypeId || '',
            fromDate: state?.fromDate || '',
            toDate: state?.toDate || '',
            reason: state?.reason || '',
        };
        if (isEdit) {
            submitRequest.leaveStatusId = selectedItem?.leaveStatusId;
            dispatch(updateStaffLeaveRequest(submitRequest, selectedItem.staffLeaveId));
        } else {
            dispatch(createStaffLeaveRequest(submitRequest));
        }
    };

    const onStatusForm = (data, index, activeChecker) => {
        const submitRequest = {
            leaveStatusId: activeChecker,
        };
        setSelectedIndex(index);
        dispatch(updateStaffLeaveRequest(submitRequest, data.staffLeaveId));
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? (
                <div className="bg-light opacity-0.25">
                    <div className="d-flex justify-content-center m-5">
                        <Spinner className="mt-5 mb-5" animation="border" />
                    </div>
                </div>
            ) : (
                <Table
                    columns={columns}
                    Title={'Leave Apply List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={isUserCanCreate || userRole === 'Admin' ? createModel : null}
                />
            )}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Leave Request'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead={true}
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
