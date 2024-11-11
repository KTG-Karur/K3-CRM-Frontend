import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { attendanceContainer, attendancePresentAbsent } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { resetGetHoliday, getHolidayRequest, getDepartmentRequest, resetGetDepartment, resetGetBranch, getBranchRequest, resetGetStaff, getStaffRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import Calendar from '../../components/Atom/Calendar';
import _ from "lodash"

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess, getStaffList, getStaffFailure,
        getHolidaySuccess, getHolidayList, getHolidayFailure, errorMessage,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
    } = appSelector((state) => ({
        getHolidaySuccess: state.holidayReducer.getHolidaySuccess,
        getHolidayList: state.holidayReducer.getHolidayList,
        getHolidayFailure: state.holidayReducer.getHolidayFailure,

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
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    <FormLayout
                        dynamicForm={attendancePresentAbsent}
                        handleSubmit={onFormSubmit}
                        optionListState={optionListState}
                        setState={setState}
                        state={state}
                        ref={errorHandle}
                        noOfColumns={1}
                        errors={errors}
                        setErrors={setErrors}
                    />
                </div>
            )
        }
    ];


    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
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
        if (getStaffSuccess) {
            setIsLoading(false)
            setParentList(getStaffList)
            dispatch(resetGetStaff())
        } else if (getStaffFailure) {
            setIsLoading(false)
            setParentList([])
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

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    console.log("state")
    console.log(state)
    
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
        const submitRequest = {
            designationName: state?.designationName || "",
            departmentId: state?.departmentId || ""
        }
        // if (isEdit) {
        //     dispatch(updateDesignationRequest(submitRequest, selectedItem.designationId))
        // } else {
        //     dispatch(createDesignationRequest(submitRequest))
        // }
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
        // console.log('arg')
        // console.log(arg?.dateStr)
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
                    <Calendar
                        onDateClick={onDateClick}
                        onEventClick={onEventClick}
                        // onDrop={onDrop}
                        Title={"Staff Attendance"}
                        events={events}
                    // onEventDrop={onEventDrop}
                    />
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
                    />
                }
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
