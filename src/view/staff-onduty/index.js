import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffOnDutyContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, deleteData, noOfDayCount, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createStaffOnDutyRequest,
    getBranchRequest,
    getStaffOnDutyRequest,
    getStaffRequest,
    resetCreateStaffOnDuty,
    resetGetBranch,
    resetGetStaff,
    resetGetStaffOnDuty,
    resetUpdateStaffOnDuty,
    updateStaffOnDutyRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() {
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const {
        getBranchSuccess, getBranchList, getBranchFailure,
        getStaffOnDutySuccess,
        getStaffOnDutyList,
        getStaffOnDutyFailure,
        createStaffOnDutySuccess,
        createStaffOnDutyData,
        createStaffOnDutyFailure,
        updateStaffOnDutySuccess,
        updateStaffOnDutyData,
        updateStaffOnDutyFailure,
        errorMessage,

        getStaffSuccess,
        getStaffList,
        getStaffFailure,
    } = appSelector((state) => ({
        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getStaffOnDutySuccess: state.staffOnDutyReducer.getStaffOnDutySuccess,
        getStaffOnDutyList: state.staffOnDutyReducer.getStaffOnDutyList,
        getStaffOnDutyFailure: state.staffOnDutyReducer.getStaffOnDutyFailure,

        createStaffOnDutySuccess: state.staffOnDutyReducer.createStaffOnDutySuccess,
        createStaffOnDutyData: state.staffOnDutyReducer.createStaffOnDutyData,
        createStaffOnDutyFailure: state.staffOnDutyReducer.createStaffOnDutyFailure,

        updateStaffOnDutySuccess: state.staffOnDutyReducer.updateStaffOnDutySuccess,
        updateStaffOnDutyData: state.staffOnDutyReducer.updateStaffOnDutyData,
        updateStaffOnDutyFailure: state.staffOnDutyReducer.updateStaffOnDutyFailure,

        errorMessage: state.staffOnDutyReducer.errorMessage,
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
            accessor: 'status',
            Cell: ({ row }) => (
                <Badge
                    bg={
                        row.original.statusId === 30
                            ? 'danger'
                            : row.original.statusId === 28
                                ? 'primary'
                                : 'success'
                    }>
                    {row.original.statusId === 30
                        ? 'Cancelled'
                        : row.original.statusId === 28
                            ? 'Request'
                            : 'Approved'}
                </Badge>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const passData = {
                    isLeave: true,
                    staffName: row.original?.staffName || "",
                    designationName: row.original?.designationName,
                    typeName: `${row.original?.dayCount || 0} days`,
                    fromDate: row.original?.fromDate,
                    toDate: row.original?.toDate,

                    spokenStaffName: row.original?.spokenStaffName,
                    spokenDesignationName: row.original?.spokenDesignationName,
                    spokenTime: row.original?.spokenTime,
                    spokenDate: row.original?.spokenDate,
                }
                return (
                    <div>
                        {row.original.statusId === 28 && (
                            <span>
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
                            </span>
                        )}

                        {
                            row.original.statusId == 29 && (
                                <div>
                                    <span className="text-success  me-2 cursor-pointer"
                                        onClick={() => navigate('/leave-slip-report', { state: passData })}>
                                        <i className={'fe-printer'} style={{ fontSize: '19px' }}></i>
                                    </span>
                                </div>
                            )
                        }
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({
        minmumFrom: moment().format("YYYY-MM-DD"),
        minmumTo: moment().format("YYYY-MM-DD"),
        spokenDate: moment().format("YYYY-MM-DD"),
        spokenTime: moment().format("HH:mm")
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        branchList: [],
    });
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getStaffOnDutyRequest());
        // dispatch(getStaffRequest());
        dispatch(getBranchRequest());
    }, []);


    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: getBranchList
            })
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: [],
            })
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);


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
            const remainingStaffList = deleteData(getStaffList, state?.staffId, "staffId");
            setOptionListState({
                ...optionListState,
                staffList: getStaffList,
                spokenStaffList: remainingStaffList
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
        if (getStaffOnDutySuccess) {
            setIsLoading(false);
            setParentList(getStaffOnDutyList);
            dispatch(resetGetStaffOnDuty());
        } else if (getStaffOnDutyFailure) {
            setIsLoading(false);
            setParentList([]);
            dispatch(resetGetStaffOnDuty());
        }
    }, [getStaffOnDutySuccess, getStaffOnDutyFailure]);

    useEffect(() => {
        if (createStaffOnDutySuccess) {
            const temp_state = [createStaffOnDutyData[0], ...parentList];
            setParentList(temp_state);
            showMessage('success', 'Created Successfully');
            closeModel();
            dispatch(resetCreateStaffOnDuty());
        } else if (createStaffOnDutyFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffOnDuty());
        }
    }, [createStaffOnDutySuccess, createStaffOnDutyFailure]);

    useEffect(() => {
        if (updateStaffOnDutySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffOnDutyData[0];
            setParentList(temp_state);
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel();
            dispatch(resetUpdateStaffOnDuty());
        } else if (updateStaffOnDutyFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffOnDuty());
        }
    }, [updateStaffOnDutySuccess, updateStaffOnDutyFailure]);

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
            branchId: '',
            dayCount: '',
            toDate: '',
            reason: '',
            spokenDate: moment().format("YYYY-MM-DD"),
            spokenTime: moment().format("HH:mm"),
            spokenStaffId: '',
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
            branchId: data?.branchId || '',
            dayCount: data?.dayCount || '',
            toDate: data?.toDate || '',
            reason: data?.reason || '',
            spokenDate: data.spokenDate ? dateConversion(data.spokenDate, "YYYY-MM-DD") : "",
            spokenTime: data?.spokenTime || moment().format("HH:mm"),
            spokenStaffId: data?.spokenStaffId || "",
        });

        const branchFilter = {
            branchId: data?.branchId
        }
        dispatch(getStaffRequest(branchFilter));
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
            dayCount: state?.dayCount || '',
            branchId: state?.branchId || '',
            reason: state?.reason || '',
            spokenDate: state?.spokenDate ? dateConversion(state.spokenDate, "YYYY-MM-DD") : "",
            spokenTime: state?.spokenTime || moment().format("HH:mm"),
            spokenStaffId: state?.spokenStaffId || "",
        };
        if (isEdit) {
            submitRequest.statusId = selectedItem?.statusId;
            dispatch(updateStaffOnDutyRequest(submitRequest, selectedItem.staffOnDutyId));
        } else {
            dispatch(createStaffOnDutyRequest(submitRequest));
        }
    };

    const onStatusForm = (data, index, activeChecker) => {
        const submitRequest = {
            statusId: activeChecker,
        };
        setSelectedIndex(index);
        dispatch(updateStaffOnDutyRequest(submitRequest, data.staffOnDutyId));
    };

    const onBranchChange = async (option, formName, formUniqueKey, formDisplayKey) => {
        const branchFilter = {
            branchId: option[formUniqueKey]
        }
        setState({
            ...state,
            [formName]: option[formUniqueKey]
        })

        dispatch(getStaffRequest(branchFilter));
    }

    const onStaffChange = async (option, formName, formUniqueKey, formDisplayKey) => {
        setState({
            ...state,
            [formName]: option[formUniqueKey]
        })
        const remainingStaffListTo = await deleteData(optionListState.staffList, option[formUniqueKey], formUniqueKey);
        setOptionListState({
            ...optionListState,
            spokenStaffList: remainingStaffListTo
        })
    }

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
                    Title={'On Duty Apply List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />
            )}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'On Duty Request'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead={true}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={staffOnDutyContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "onBranchChange": onBranchChange, "onStaffChange": onStaffChange }}
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
