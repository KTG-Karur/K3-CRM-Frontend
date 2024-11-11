import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { attendanceContainer, attendancePresentAbsent } from './formFieldData';
import Table from '../../components/Table';
import { formatDate, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { resetGetHoliday, getHolidayRequest, getDepartmentRequest, resetGetDepartment, resetGetBranch, getBranchRequest, resetGetStaff, getStaffRequest, resetGetStaffLeave, getStaffLeaveRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import Calendar from '../../components/Atom/Calendar';
import _ from "lodash"
import { createStaffAttendanceRequest, resetCreateStaffAttendance, updateStaffAttendanceRequest } from '../../redux/staff-attendance/actions';

let isEdit = false;
let parentList = [];
function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess, getStaffList, getStaffFailure,
        getHolidaySuccess, getHolidayList, getHolidayFailure, errorMessage,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        createStaffAttendanceSuccess, createStaffAttendanceFailure, createStaffAttendanceData,
        getStaffLeaveSuccess,
        getStaffLeaveList,
        getStaffLeaveFailure,
    } = appSelector((state) => ({

        getStaffLeaveSuccess: state.staffLeaveReducer.getStaffLeaveSuccess,
        getStaffLeaveList: state.staffLeaveReducer.getStaffLeaveList,
        getStaffLeaveFailure: state.staffLeaveReducer.getStaffLeaveFailure,

        getHolidaySuccess: state.holidayReducer.getHolidaySuccess,
        getHolidayList: state.holidayReducer.getHolidayList,
        getHolidayFailure: state.holidayReducer.getHolidayFailure,

        createStaffAttendanceSuccess: state.holidayReducer.createStaffAttendanceSuccess,
        createStaffAttendanceData: state.holidayReducer.createStaffAttendanceData,
        createStaffAttendanceFailure: state.holidayReducer.createStaffAttendanceFailure,

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
                                    label={"Present" || ''}
                                    type="radio"
                                    id={`basic-radio-present-${row.index}`}
                                    name={`attendanceStatus-${row.index}`}
                                    className={'mb-2 form-check-Primary mx-2'}
                                    checked={state.staffAttendance[row.index]?.["attendanceStatus"] === 1 || false}
                                    value={state.staffAttendance[row.index]?.["attendanceStatus"] || ""}
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
                                    name={`attendanceStatus-${row.index}`}
                                    className="mb-2 form-check-Primary mx-2"
                                    checked={state.staffAttendance[row.index]?.["attendanceStatus"] === 0 || false}
                                    value={state.staffAttendance[row.index]?.["attendanceStatus"] || ""}
                                    onChange={(e) => handleChange(row.original, 0, row.index)}
                                />
                            </Col>
                        </Row>
                    </div>
                )
            }
        }
    ];

    const handleChange = (staffDetail, isPresentorAbsent, index) => {
        setState(prev => {
            const updatedStaffAttendance = [...prev.staffAttendance]

            updatedStaffAttendance[index] = {
                ...updatedStaffAttendance[index],
                "staffId": staffDetail.staffId,
                "attendanceStatus": isPresentorAbsent,
            };

            return {
                staffAttendance: updatedStaffAttendance
            }

        });
    }



    const [state, setState] = useState({
        attendanceDate: formatDate(new Date()),
        staffAttendance: [{
            staffId: '',
            attendanceStatus: '',
        }]
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [optionListState, setOptionListState] = useState({
        departmentList: [],
        branchList: [],
    })
    // event data
    const [events, setEvents] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
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
                getStaffLeaveList.map(attendanceData => {
                    const idx = updateStaffData.findIndex(staffData => staffData.staffId == attendanceData.staffId);
                    updateStaffData[idx] = {
                        ...updateStaffData[idx],
                        attendanceStatus: attendanceData.leaveStatusId === 29 ? 0 : 1
                    }
                })
                return {
                    staffAttendance: updateStaffData
                }
            });
            dispatch(resetGetStaffLeave());
        } else if (getStaffLeaveFailure) {
            setIsLoading(false);
            parentList = []
            dispatch(resetGetStaffLeave());
        }
    }, [getStaffLeaveSuccess, getStaffLeaveFailure]);

    // console.log("state.staffAttendance")
    // console.log(state.staffAttendance)

    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false)

            const staffList = getStaffList.map(staffData => {
                return {
                    staffId: staffData.staffId,
                    staffName: staffData.staffName,
                    departmentId: staffData.departmentId,
                    branchId: staffData.branchId,
                    departmentName: staffData.departmentName,
                    staffCode: staffData.staffCode,
                    attendanceStatus: staffData.leaveStatusId == 29 ? 0 : 1
                }
            })

            parentList = staffList
            setState((prev) => ({
                ...prev,
                staffAttendance: staffList
            }))

            dispatch(resetGetStaff())
        } else if (getStaffFailure) {
            setIsLoading(false)
            parentList = []
            dispatch(resetGetStaff())
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (getHolidaySuccess) {
            setIsLoading(false)
            const eventList = _.map(getHolidayList, (event) => ({
                id: event.holidayId,
                title: event.reason,
                start: new Date(event.holidayDate),
                className: 'bg-danger'
            }));
            setEvents(eventList)
            dispatch(resetGetHoliday())
        } else if (getHolidayFailure) {
            setIsLoading(false)
            setEvents([]);
            dispatch(resetGetHoliday())
        }
    }, [getHolidaySuccess, getHolidayFailure]);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: getDepartmentList
            })
            dispatch(resetGetDepartment())
        } else if (getDepartmentFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: []
            })
            dispatch(resetGetDepartment())
        }
    }, [getDepartmentSuccess, getDepartmentFailure]);

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
                branchList: []
            })
            dispatch(resetGetBranch())
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

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            designationName: '',
            departmentId: '',
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
            designationName: data?.designationName || "",
            departmentId: data?.departmentId || "",
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
        console.log(state)
        return;
        const submitRequest = {
            designationName: state?.designationName || "",
            departmentId: state?.departmentId || ""
        }
        if (isEdit) {
            dispatch(updateStaffAttendanceRequest(submitRequest, selectedItem.designationId))
        } else {
            dispatch(createStaffAttendanceRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        // dispatch(updateDesignationRequest(submitRequest, data.designationId))
    };

    const onDateClick = (arg) => {
        setModal(true);
        setState({
            ...state,
            attendanceDate: arg?.dateStr,
            staffAttendance: parentList
        })
        const leaveStatusId = {
            leaveStatusId: 29,
            attendanceDate: arg?.dateStr || state.attendanceDate
        }
        dispatch(getStaffLeaveRequest(leaveStatusId));
    };


    const onEventClick = (arg) => {
        // console.log(arg.event.title)
    };

    return (
        <React.Fragment>
            <NotificationContainer />

            <Card>
                <Card.Body>
                    {/* fullcalendar control */}
                    <Row className='d-flex justify-content-center'>
                        <Col lg={12}>
                            <Calendar
                                onDateClick={onDateClick}
                                onEventClick={onEventClick}
                                // onDrop={onDrop}
                                Title={"Staff Attendance"}
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
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={attendanceContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
                {isLoading ? <div className='bg-light opacity-0.25'>
                    <div className="d-flex justify-content-center m-5">
                        <Spinner className='mt-5 mb-5' animation="border" />
                    </div>
                </div> :
                    <Table
                        columns={columns}
                        Title={'Employee List'}
                        data={parentList || []}
                        pageSize={5}
                        toggle={false}
                        pagination={false}
                    />
                }
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
