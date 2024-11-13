import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { attendanceContainer, attendancePresentAbsent } from './formFieldData';
import Table from '../../components/Table';
import { formatDate, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    resetGetHoliday,
    getHolidayRequest,
    getDepartmentRequest,
    resetGetDepartment,
    resetGetBranch,
    getBranchRequest,
    resetGetStaff,
    getStaffRequest,
    resetGetStaffLeave,
    getStaffLeaveRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import Calendar from '../../components/Atom/Calendar';
import _ from 'lodash';
import {
    createStaffAttendanceRequest,
    getStaffAttendanceRequest,
    resetCreateStaffAttendance,
    resetGetStaffAttendance,
    resetUpdateStaffAttendance,
    updateStaffAttendanceRequest,
} from '../../redux/staff-attendance/actions';

let isEdit = false;
let parentList = [];
let staffPermanetList = [];
let isShowBtn = true;
function Index() {
    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess,
        getStaffList,
        getStaffFailure,
        getHolidaySuccess,
        getHolidayList,
        getHolidayFailure,
        errorMessage,
        getDepartmentSuccess,
        getDepartmentList,
        getDepartmentFailure,
        getBranchSuccess,
        getBranchList,
        getBranchFailure,
        createStaffAttendanceSuccess,
        createStaffAttendanceFailure,
        createStaffAttendanceData,
        getStaffLeaveSuccess,
        getStaffLeaveList,
        getStaffLeaveFailure,
        getStaffAttendanceSuccess,
        getStaffAttendanceList,
        getStaffAttendanceFailure,
        updateStaffAttendanceSuccess,
        updateStaffAttendanceFailure,
        updateStaffAttendanceData
    } = appSelector((state) => ({
        getStaffLeaveSuccess: state.staffLeaveReducer.getStaffLeaveSuccess,
        getStaffLeaveList: state.staffLeaveReducer.getStaffLeaveList,
        getStaffLeaveFailure: state.staffLeaveReducer.getStaffLeaveFailure,

        getHolidaySuccess: state.holidayReducer.getHolidaySuccess,
        getHolidayList: state.holidayReducer.getHolidayList,
        getHolidayFailure: state.holidayReducer.getHolidayFailure,

        getStaffAttendanceSuccess: state.staffAttendanceReducer.getStaffAttendanceSuccess,
        getStaffAttendanceList: state.staffAttendanceReducer.getStaffAttendanceList,
        getStaffAttendanceFailure: state.staffAttendanceReducer.getStaffAttendanceFailure,

        createStaffAttendanceSuccess: state.staffAttendanceReducer.createStaffAttendanceSuccess,
        createStaffAttendanceData: state.staffAttendanceReducer.createStaffAttendanceData,
        createStaffAttendanceFailure: state.staffAttendanceReducer.createStaffAttendanceFailure,

        updateStaffAttendanceSuccess: state.staffAttendanceReducer.updateStaffAttendanceSuccess,
        updateStaffAttendanceData: state.staffAttendanceReducer.updateStaffAttendanceData,
        updateStaffAttendanceFailure: state.staffAttendanceReducer.updateStaffAttendanceFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Employee Code',
            accessor: 'staffCode',
            sort: true,
        },
        {
            Header: 'Employee Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Department',
            accessor: 'departmentName',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'Attendance',
            Cell: ({ row }) => {
                return (
                    <div>
                        <Row>
                            <Col lg={6}>
                                <Form.Check
                                    label={'Present' || ''}
                                    type="radio"
                                    id={`basic-radio-present-${row.index}`}
                                    name={`attendanceStatusId-${row.index}`}
                                    className={'mb-2 form-check-Primary mx-2'}
                                    checked={state.staffAttendance[row.index]?.['attendanceStatusId'] === 1 || false}
                                    value={state.staffAttendance[row.index]?.['attendanceStatusId'] || ''}
                                    onChange={(e) => {
                                        handleChange(row.original, 1, row.index);
                                    }}
                                />
                            </Col>
                            <Col lg={6}>
                                <Form.Check
                                    label="Absent"
                                    type="radio"
                                    id={`basic-radio-absent-${row.index}`}
                                    name={`attendanceStatusId-${row.index}`}
                                    className="mb-2 form-check-Primary mx-2"
                                    checked={state.staffAttendance[row.index]?.['attendanceStatusId'] === 0 || false}
                                    value={state.staffAttendance[row.index]?.['attendanceStatusId'] || ''}
                                    onChange={(e) => handleChange(row.original, 0, row.index)}
                                />
                            </Col>
                        </Row>
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({
        attendanceDate: formatDate(new Date()),
        staffAttendance: [{}],
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [optionListState, setOptionListState] = useState({
        departmentList: [
            {
                "departmentId": '',
                "departmentName": "All",
            },
        ],
        branchList: [{
            "branchId": '',
            "branchName": "All",
        }],
    });
    // event data
    const [events, setEvents] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getHolidayRequest());
        dispatch(getBranchRequest());
        dispatch(getStaffRequest());
        dispatch(getDepartmentRequest());
    }, []);

    useEffect(() => {
        if (getStaffLeaveSuccess) {
            setIsLoading(false);
            setState((prev) => {
                const updateStaffData = [...prev.staffAttendance];
                getStaffLeaveList.map((attendanceData) => {
                    const idx = updateStaffData.findIndex((staffData) => staffData.staffId == attendanceData.staffId);
                    updateStaffData[idx] = {
                        ...updateStaffData[idx],
                        attendanceStatusId: attendanceData.leaveStatusId === 29 ? 0 : 1,
                    };
                });
                return {
                    ...prev,
                    staffAttendance: updateStaffData,
                };
            });
            dispatch(resetGetStaffLeave());
        } else if (getStaffLeaveFailure) {
            setIsLoading(false);
            dispatch(resetGetStaffLeave());
        }
    }, [getStaffLeaveSuccess, getStaffLeaveFailure]);

    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false);
            const staffList = getStaffList.map((staffData) => {
                return {
                    staffId: staffData.staffId,
                    staffName: staffData.staffName,
                    departmentId: staffData.departmentId,
                    branchId: staffData.branchId,
                    departmentName: staffData.departmentName,
                    staffCode: staffData.staffCode,
                    attendanceStatusId: staffData.leaveStatusId == 29 ? 0 : 1,
                };
            });

            parentList = staffList;
            staffPermanetList = staffList;
            setState((prev) => ({
                ...prev,
                staffAttendance: staffList,
            }));

            dispatch(resetGetStaff());
        } else if (getStaffFailure) {
            setIsLoading(false);
            parentList = staffPermanetList;
            dispatch(resetGetStaff());
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (getHolidaySuccess) {
            setIsLoading(false);
            const eventList = _.map(getHolidayList, (event) => ({
                id: event.holidayId,
                title: event.reason,
                start: new Date(event.holidayDate),
                className: 'bg-danger',
            }));
            setEvents(eventList);
            dispatch(resetGetHoliday());
        } else if (getHolidayFailure) {
            setIsLoading(false);
            setEvents([]);
            dispatch(resetGetHoliday());
        }
    }, [getHolidaySuccess, getHolidayFailure]);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                departmentList: [...optionListState.departmentList, ...getDepartmentList],
            });
            dispatch(resetGetDepartment());
        } else if (getDepartmentFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                departmentList: [],
            });
            dispatch(resetGetDepartment());
        }
    }, [getDepartmentSuccess, getDepartmentFailure]);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                branchList: [...optionListState.branchList, ...getBranchList],
            });
            dispatch(resetGetBranch());
        } else if (getBranchFailure) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                branchList: [],
            });
            dispatch(resetGetBranch());
        }
    }, [getBranchSuccess, getBranchFailure]);

    useEffect(() => {
        if (createStaffAttendanceSuccess) {
            showMessage('success', 'Created Successfully');
            closeModel();
            dispatch(resetCreateStaffAttendance());
        } else if (createStaffAttendanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffAttendance());
        }
    }, [createStaffAttendanceSuccess, createStaffAttendanceFailure]);

    useEffect(() => {
        if (getStaffAttendanceSuccess) {
            setIsLoading(false);
            if (getStaffAttendanceList.length > 0) {
                isEdit = true;
                parentList = getStaffAttendanceList;
                setState({
                    ...state,
                    staffAttendance: getStaffAttendanceList,
                });
            } else {
                if (state.attendanceDate === formatDate(new Date())) {
                    isEdit = false;

                    const updateDate = parentList.map((data) => {
                        return {
                            ...data,
                            attendanceDate: state.attendanceDate || '',
                            attendanceInchargeId: 1,
                        };
                    });
                    parentList = updateDate;
                    setState({
                        ...state,
                        staffAttendance: updateDate,
                    });
                    const leaveStatusId = {
                        leaveStatusId: 29,
                        attendanceDate: state.attendanceDate,
                    };
                    dispatch(getStaffLeaveRequest(leaveStatusId));
                } else {
                    parentList = getStaffAttendanceList;
                    setState({
                        ...state,
                        staffAttendance: getStaffAttendanceList,
                    });
                }

            }
            dispatch(resetGetStaffAttendance());
        } else if (getStaffAttendanceFailure) {
            setIsLoading(false);
            dispatch(resetGetStaffAttendance());
        }
    }, [getStaffAttendanceSuccess, getStaffAttendanceFailure]);

    useEffect(() => {
        if (updateStaffAttendanceSuccess) {
            showMessage('success', 'Created Successfully');
            closeModel();
            dispatch(resetUpdateStaffAttendance());
        } else if (updateStaffAttendanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffAttendance());
        }
    }, [updateStaffAttendanceSuccess, updateStaffAttendanceFailure]);

    useEffect(() => {
        if (!modal) {
            closeModel();
        }
    }, [modal])

    const closeModel = () => {
        setModal(false);
        isEdit = false;
        onFormClear();
        setTimeout(() => {
            parentList = staffPermanetList;
        }, 0)
    };

    const onFormClear = () => {
        setState({
            attendanceDate: formatDate(new Date()),
            staffAttendance: [{}],
        });
    };

    const createModel = () => {
        onFormClear();
        isEdit = false;
        setModal(true);
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const onFormSubmit = async () => {
        const submitRequest = {
            staffAttendance: state?.staffAttendance || '',
        };
        if (isEdit) {
            dispatch(updateStaffAttendanceRequest(submitRequest));
        } else {
            dispatch(createStaffAttendanceRequest(submitRequest));
        }
    };

    const onDateClick = (arg) => {
        createModel();
        setIsLoading(true);
        if (arg?.dateStr >= formatDate(new Date())) {
            if (arg?.dateStr == formatDate(new Date())) {
                isShowBtn = true;
                const attendanceDate = {
                    attendanceDate: arg?.dateStr || formatDate(new Date()),
                };
                dispatch(getStaffAttendanceRequest(attendanceDate));
            } else {
                isShowBtn = false;
                const leaveStatusId = {
                    leaveStatusId: 29,
                    attendanceDate: arg?.dateStr || state.attendanceDate,
                };
                dispatch(getStaffLeaveRequest(leaveStatusId));
            }

        } else {
            const attendanceDate = {
                attendanceDate: arg?.dateStr || state.attendanceDate,
            };
            dispatch(getStaffAttendanceRequest(attendanceDate));
            isShowBtn = false;
        }

        // add date and inchargeId into the staff attendance array
        const updateDate = parentList.map((data) => {
            return {
                ...data,
                attendanceDate: arg?.dateStr || '',
                attendanceInchargeId: 1,
            };
        });
        parentList = updateDate;
        setState({
            ...state,
            attendanceDate: arg?.dateStr,
            staffAttendance: parentList,
        });
    };

    const handleChange = (staffDetail, isPresentorAbsent, index) => {
        setState((prev) => {
            const updatedStaffAttendance = [...prev.staffAttendance];

            updatedStaffAttendance[index] = {
                ...updatedStaffAttendance[index],
                staffId: staffDetail.staffId,
                attendanceStatusId: isPresentorAbsent,
            };

            return {
                ...prev,
                staffAttendance: updatedStaffAttendance,
            };
        });
    };

    const handleDepartment = (option, formName, uniqueKey, displayKey) => {
        const filterDepartment = {
            departmentId: option[uniqueKey],
            branchId: state?.branchId || ''
        }
        dispatch(getStaffRequest(filterDepartment));
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const handleBranch = (option, formName, uniqueKey, displayKey) => {
        const filterBranch = {
            branchId: option[uniqueKey],
            departmentId: state?.departmentId || ''
        }
        dispatch(getStaffRequest(filterBranch));
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }


    return (
        <React.Fragment>
            <NotificationContainer />

            <Card>
                <Card.Body>
                    {/* fullcalendar control */}
                    <Row className="d-flex justify-content-center">
                        <Col lg={12}>
                            <Calendar
                                onDateClick={onDateClick}
                                // onEventClick={onEventClick}
                                // onDrop={onDrop}
                                Title={'Staff Attendance'}
                                events={events}
                            // onEventDrop={onEventDrop}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Attendance'}
                modelSize={'lg'}
                isEdit={isEdit}
                handleSubmit={handleValidation}
                saveBtn={isShowBtn}
                cancelBtn={isShowBtn}
            >
                <FormLayout
                    dynamicForm={attendanceContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "handleDepartment": handleDepartment, "handleBranch": handleBranch }}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
                {isLoading ? (
                    <div className="bg-light opacity-0.25">
                        <div className="d-flex justify-content-center m-5">
                            <Spinner className="mt-5 mb-5" animation="border" />
                        </div>
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        Title={'Employee List'}
                        data={parentList || []}
                        pageSize={5}
                        toggle={false}
                        pagination={false}
                    />
                )}
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
