import React, { useEffect, useState } from 'react';
import { Badge, Button, Form, Spinner } from 'react-bootstrap';
import { reportFilterFormContainer, staffSalaryBtn } from './formFieldData';
import Table from '../../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../../utils/AllFunction';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { getBranchRequest, getClaimRequest, getDepartmentRequest, getPetrolAllowanceReportRequest, getPetrolAllowanceRequest, resetGetBranch, resetGetClaim, resetGetDepartment, resetGetPetrolAllowance, resetGetPetrolAllowanceReport } from '../../../redux/actions';
import moment from 'moment';
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const navigate = useNavigate();

    const {
        getPetrolAllowanceSuccess, getPetrolAllowanceList, getPetrolAllowanceFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,

        getPetrolAllowanceReportSuccess,
        getPetrolAllowanceReportData,
        getPetrolAllowanceReportFailure,

        errorMessage,
    } = appSelector((state) => ({

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        getPetrolAllowanceSuccess: state.petrolAllowanceReducer.getPetrolAllowanceSuccess,
        getPetrolAllowanceList: state.petrolAllowanceReducer.getPetrolAllowanceList,
        getPetrolAllowanceFailure: state.petrolAllowanceReducer.getPetrolAllowanceFailure,

        getPetrolAllowanceReportSuccess: state.petrolAllowanceReducer.getPetrolAllowanceReportSuccess,
        getPetrolAllowanceReportData: state.petrolAllowanceReducer.getPetrolAllowanceReportData,
        getPetrolAllowanceReportFailure: state.petrolAllowanceReducer.getPetrolAllowanceReportFailure,

        errorMessage: state.petrolAllowanceReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'allowanceDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.allowanceDate, "DD-MM-YYYY")}
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
            accessor: 'fromPlace',
            sort: true,
        },
        {
            Header: 'To',
            accessor: 'toPlace',
            sort: true,
        },
        {
            Header: 'Activity',
            accessor: 'activityName',
            sort: true,
        },
        {
            Header: 'Total Km',
            accessor: 'totalKm',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'totalAmount',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        {
                            row?.original?.billNo &&
                            <span className="text-success  me-2 cursor-pointer"
                                onClick={() => onPrintDesign(row.original)}>
                                <i className={'fe-printer'} style={{ fontSize: '16px' }}></i>
                            </span>
                        }
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({
        allowanceDate: moment().format('YYYY-MM-DD'),
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
                "durationName": "Month",
            },
            {
                "durationId": 1,
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
        const searchReq = {
            allowanceDate: state?.allowanceDate,
            durationId: state.durationId,
        }
        dispatch(getPetrolAllowanceRequest(searchReq));
    }, []);


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


    useEffect(() => {
        if (getPetrolAllowanceSuccess) {
            setIsLoading(false)
            setParentList(getPetrolAllowanceList)
            dispatch(resetGetPetrolAllowance())
        } else if (getPetrolAllowanceFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetPetrolAllowance())
        }
    }, [getPetrolAllowanceSuccess, getPetrolAllowanceFailure]);


    useEffect(() => {
        if (getPetrolAllowanceReportSuccess) {
            setIsLoading(false);
            if (getPetrolAllowanceReportData.length > 0) {
                navigate('/petrol-allowance-report', { state: getPetrolAllowanceReportData[0] })
            }
            dispatch(resetGetPetrolAllowanceReport());
        } else if (getPetrolAllowanceReportFailure) {
            setIsLoading(false);
            dispatch(resetGetPetrolAllowanceReport());
        }
    }, [getPetrolAllowanceReportSuccess, getPetrolAllowanceReportFailure]);

    const onPrintDesign = (data) => {
        const reqReport = {
            staffId: data?.staffId,
            DateFilter: state?.allowanceDate
        }
        dispatch(getPetrolAllowanceReportRequest(reqReport));
    }

    const onAllowanceDate = (event, formName) => {
        setState({
            ...state,
            [formName]: event.target.value
        })
        const filterDate = {
            allowanceDate: event.target.value,
            durationId: state.durationId,
        }
        dispatch(getPetrolAllowanceRequest(filterDate));
    }

    const onDurationFilter = (item, formName) => {
        setState({
            ...state,
            [formName]: item.durationId
        })
        const filterDuration = {
            durationId: item.durationId,
            allowanceDate: state?.allowanceDate
        }
        dispatch(getPetrolAllowanceRequest(filterDuration));
    }


    const onDepartmentFilter = (option, formName, uniqueKey, displayKey) => {
        const filterDepartment = {
            departmentId: option[uniqueKey] || '',
            branchId: state?.branchId || '',
            allowanceDate: state?.allowanceDate,
            durationId: state.durationId,
        }
        dispatch(getPetrolAllowanceRequest(filterDepartment));
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
            allowanceDate: state?.allowanceDate,
            durationId: state.durationId,
        }
        dispatch(getPetrolAllowanceRequest(filterBranch));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const onDownload = () => {
        const yearMonth = moment(state?.allowanceDate).format("MMMM YYYY");
        const additionalDetails = `Petrol Allowance Report for ${yearMonth}`;
        const reportGeneratedDate = `Report Generated On: ${moment().format("DD-MM-YYYY")}`;
        const data = parentList.map((item, i) => ({
            ["s.no"]: i + 1,
            staffCode: item.staffCode,
            staffName: item.staffName,
            branchName: item.branchName,
            departmentName: item.departmentName,
            designationName: item.designationName,
            allowanceDate: moment(item.allowanceDate).format("DD-MM-YYYY"),
            fromPlace: item.fromPlace,
            toPlace: item.toPlace,
            totalKm: item.totalKm,
            activityName: item.activityName,
        }));
        const header = [
            [additionalDetails],
            [reportGeneratedDate],
            [],
            ["S.no", "Staff Code", "Staff Name", "Branch Name", "Department Name", "Designation Name", "Allowance Date", "From Place", "To Place", "Total Km", "Activities"]
        ];
        const rows = [
            ...header,
            ...data.map(item => [
                item["s.no"],
                item.staffCode,
                item.staffName,
                item.branchName,
                item.departmentName,
                item.designationName,
                item.allowanceDate,
                item.fromPlace,
                item.toPlace,
                item.totalKm,
                item.activityName,
            ])
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        worksheet["!cols"] = [
            { wch: 10 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 12 },
            { wch: 10 },
            { wch: 12 },
            { wch: 12 },
            { wch: 12 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Petrol Allowance Report");

        XLSX.writeFile(workbook, `K3-Petrol-Allowance-Report-${yearMonth}.xlsx`);
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
                    Title={'Petrol Allowance Report List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={false}
                    pagination={false}
                    filterTbl={true}
                    footerTbl={true}
                    filterFormContainer={reportFilterFormContainer}
                    onChangeCallBack={{ "onAllowanceDate": onAllowanceDate, "onDepartmentFilter": onDepartmentFilter, "onBranchFilter": onBranchFilter, "onDurationFilter": onDurationFilter }}
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
