import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Form, Spinner } from 'react-bootstrap';
import { reportFilterFormContainer, staffSalaryBtn } from './formFieldData';
import Table from '../../../components/Table';
import { showConfirmationDialog, showMessage } from '../../../utils/AllFunction';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { getBranchRequest, getDepartmentRequest, getStaffAttendanceReportRequest, resetGetBranch, resetGetDepartment, resetGetStaffReportAttendance } from '../../../redux/actions';
import moment from 'moment';
import * as XLSX from "xlsx";

function Index() {

    const { dispatch, appSelector } = useRedux();

    const incentiveAmountRefs = useRef([]);

    const {
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getStaffAttendanceReportSuccess,
        getStaffAttendanceReportList,
        getStaffAttendanceReportFailure,
        errorMessage,
    } = appSelector((state) => ({

        getStaffAttendanceReportSuccess: state.staffAttendanceReducer.getStaffAttendanceReportSuccess,
        getStaffAttendanceReportList: state.staffAttendanceReducer.getStaffAttendanceReportList,
        getStaffAttendanceReportFailure: state.staffAttendanceReducer.getStaffAttendanceReportFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        errorMessage: state.staffsalaryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Days',
            accessor: 'dayCount',
            Cell: ({ row }) => {
                const { absentDays, presentDays, halfDays } = row?.original;

                return (
                    <div>
                        {Number(absentDays) + Number(presentDays) + parseFloat(halfDays / 2)}
                    </div>
                )
            },
        },
        {
            Header: 'Full Days',
            accessor: 'presentDays'
        },
        {
            Header: 'Absent Days',
            accessor: 'absentDays',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original?.absentDays ? row.original?.absentDays : 0}
                    </div>
                )
            },
        },
        {
            Header: 'Half Days',
            accessor: 'halfDays',
        },
    ];

    const [state, setState] = useState({
        attendanceDate: moment().format('YYYY-MM-DD'),
        durationId: 0
    });
    const [optionListState, setOptionListState] = useState({
        departmentList: [
            {
                "departmentId": 0,
                "departmentName": "All",
            },
        ],
        branchList: [{
            "branchId": 0,
            "branchName": "All",
        }],
        durationList: [
            {
                "durationId": 0,
                "durationName": "Day",
            },
            {
                "durationId": 1,
                "durationName": "Month",
            },
            {
                "durationId": 2,
                "durationName": "Year",
            },
        ]
    })
    const [parentList, setParentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getBranchRequest());
        dispatch(getDepartmentRequest());
        const attendanceDate = {
            attendanceDate: state?.attendanceDate,
            durationId: state.durationId,
        }
        dispatch(getStaffAttendanceReportRequest(attendanceDate));
    }, []);

    useEffect(() => {
        if (getStaffAttendanceReportSuccess) {
            setIsLoading(false);
            setParentList(getStaffAttendanceReportList)
            dispatch(resetGetStaffReportAttendance());
        } else if (getStaffAttendanceReportFailure) {
            setIsLoading(false);
            dispatch(resetGetStaffReportAttendance());
        }
    }, [getStaffAttendanceReportSuccess, getStaffAttendanceReportFailure]);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: [...optionListState.branchList, ...getBranchList],
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
        if (getDepartmentSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: [...optionListState.departmentList, ...getDepartmentList],
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

    const onFormClear = () => {
        setState({
            ...state,
            attendanceDate: moment().format('YYYY-MM-DD'),
            durationId: 0
        });
    };


    const onDateFilter = (event, formName) => {
        setState({
            ...state,
            [formName]: event.target.value
        })
        const filterDate = {
            attendanceDate: event.target.value,
            durationId: state.durationId,
        }
        dispatch(getStaffAttendanceReportRequest(filterDate));
    }

    const onDurationFilter = (item, formName) => {
        setState({
            ...state,
            [formName]: item.durationId
        })
        const filterDuration = {
            durationId: item.durationId,
            attendanceDate: state?.attendanceDate
        }
        dispatch(getStaffAttendanceReportRequest(filterDuration));
    }


    const onDepartmentFilter = (option, formName, uniqueKey, displayKey) => {
        const filterDepartment = {
            departmentId: option[uniqueKey] || '',
            branchId: state?.branchId || '',
            attendanceDate: state?.attendanceDate,
            durationId: state.durationId,
        }
        dispatch(getStaffAttendanceReportRequest(filterDepartment));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const onBranchFilter = (option, formName, uniqueKey, displayKey) => {
        const filterBranch = {
            branchId: option[uniqueKey] || '',
            departmentId: state?.departmentId || '',
            attendanceDate: state?.attendanceDate,
            durationId: state.durationId,
        }
        dispatch(getStaffAttendanceReportRequest(filterBranch));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const onDownload = () => {
        const yearMonth = moment(state?.attendanceDate).format("MMMM YYYY");
        const additionalDetails = `Attendance Report for ${yearMonth}`;
        const reportGeneratedDate = `Report Generated On: ${moment().format("DD-MM-YYYY")}`;
        const data = parentList.map(item => ({
            staffCode: item.staffCode,
            staffName: item.staffName,
            branchName: item.branchName,
            departmentName: item.departmentName,
            totalDays: Number(item.absentDays) + Number(item.presentDays) + Number(item.halfDays / 2),
            absentDays: item.absentDays,
            halfDays: item.halfDays,
            presentDays: item.presentDays
        }));
        const header = [
            [additionalDetails],
            [reportGeneratedDate],
            [],
            ["Staff Code", "Staff Name", "Branch Name", "Department Name", "Total Days", "Absent Days", "Half Days", "Present Days"]
        ];
        const rows = [
            ...header,
            ...data.map(item => [
                item.staffCode,
                item.staffName,
                item.branchName,
                item.departmentName,
                item.totalDays,
                item.absentDays,
                item.halfDays,
                item.presentDays
            ])
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        worksheet["!cols"] = [
            { wch: 30 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
            { wch: 12 },
            { wch: 12 },
            { wch: 10 },
            { wch: 12 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

        XLSX.writeFile(workbook, `K3-${yearMonth}-Staff-Attendance-Report.xlsx`);
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
                    Title={'Staff Attendance Report List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={false}
                    pagination={false}
                    filterTbl={true}
                    footerTbl={true}
                    filterFormContainer={reportFilterFormContainer}
                    onChangeCallBack={{ "onDateFilter": onDateFilter, "onDepartmentFilter": onDepartmentFilter, "onBranchFilter": onBranchFilter, "onDurationFilter": onDurationFilter }}
                    onClickCallBack={{ "onDownload": onDownload }}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    noOfColumns={1}
                />}
        </React.Fragment>
    );
}

export default Index;
