import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Form, Spinner } from 'react-bootstrap';
import { reportFilterFormContainer, staffSalaryBtn } from './formFieldData';
import Table from '../../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../../utils/AllFunction';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { getBranchRequest, getClaimRequest, getDepartmentRequest, resetGetBranch, resetGetClaim, resetGetDepartment } from '../../../redux/actions';
import moment from 'moment';
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';

function Index() {

    const { dispatch, appSelector } = useRedux();

    const incentiveAmountRefs = useRef([]);
    const navigate = useNavigate();

    const {
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getClaimSuccess, getClaimList, getClaimFailure,
        errorMessage,
    } = appSelector((state) => ({

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,


        getClaimSuccess: state.claimReducer.getClaimSuccess,
        getClaimList: state.claimReducer.getClaimList,
        getClaimFailure: state.claimReducer.getClaimFailure,

        errorMessage: state.claimReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Apply Date',
            accessor: 'applyDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.applyDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Staff Code',
            accessor: 'staffCode',
            sort: true,
        },
        {
            Header: 'Req By',
            accessor: 'requestedBy',
            sort: true,
        },
        {
            Header: 'Claim Type',
            accessor: 'claimTypeName',
            sort: true,
        },
        {
            Header: 'Req Amt',
            accessor: 'requestedAmount',
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'statusId',
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
                return (
                    <div>
                        {
                            row.original.statusId !== 28 &&
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
        applyDate: moment().format('YYYY-MM-DD'),
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
            applyDate: state?.applyDate,
            durationId: state.durationId,
        }
        dispatch(getClaimRequest(searchReq));
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
        if (getClaimSuccess) {
            setIsLoading(false)
            setParentList(getClaimList)
            dispatch(resetGetClaim())
        } else if (getClaimFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetClaim())
        }
    }, [getClaimSuccess, getClaimFailure]);

    const onPrintDesign = (data) => {
        navigate('/birthday-claim-report', { state: data });
    }

    const onDateFilter = (event, formName) => {
        setState({
            ...state,
            [formName]: event.target.value
        })
        const filterDate = {
            applyDate: event.target.value,
            durationId: state.durationId,
        }
        dispatch(getClaimRequest(filterDate));
    }

    const onDurationFilter = (item, formName) => {
        setState({
            ...state,
            [formName]: item.durationId
        })
        const filterDuration = {
            durationId: item.durationId,
            applyDate: state?.applyDate
        }
        dispatch(getClaimRequest(filterDuration));
    }


    const onDepartmentFilter = (option, formName, uniqueKey, displayKey) => {
        const filterDepartment = {
            departmentId: option[uniqueKey] || '',
            branchId: state?.branchId || '',
            applyDate: state?.applyDate,
            durationId: state.durationId,
        }
        dispatch(getClaimRequest(filterDepartment));
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
            applyDate: state?.applyDate,
            durationId: state.durationId,
        }
        dispatch(getClaimRequest(filterBranch));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const onDownload = () => {
        const yearMonth = moment(state?.applyDate).format("MMMM YYYY");
        const additionalDetails = `Claim Report for ${yearMonth}`;
        const reportGeneratedDate = `Report Generated On: ${moment().format("DD-MM-YYYY")}`;
        // console.log(parentList)
        // return;
        const data = parentList.map((item, i) => ({
            ["s.no"]: i + 1,
            staffCode: item.staffCode,
            requestedBy: item.requestedBy,
            dob: moment(item.dob).format("DD-MM-YYYY"),
            branchName: item.branchName,
            designationName: item.designationName,
            applyDate: moment(item.applyDate).format("DD-MM-YYYY"),
            requestedAmount: item.requestedAmount,
            claimType: item.claimTypeName,
            claimAmount: item?.claimAmount || "0",
            statusName: item?.statusName || "",
            paymentModeName: item.paymentModeName,
        }));
        const header = [
            [additionalDetails],
            [reportGeneratedDate],
            [],
            ["S.no", "Staff Code", "Staff Name", "Date of birth", "Branch Name", "Designation Name", "Apply Date", "Bill Amount", "Claim type", "Claim Amount", "Payment Mode", "Status"]
        ];
        const rows = [
            ...header,
            ...data.map(item => [
                item["s.no"],
                item.staffCode,
                item.requestedBy,
                item.dob,
                item.branchName,
                item.designationName,
                item.applyDate,
                item.requestedAmount,
                item.claimType,
                item.claimAmount,
                item.paymentModeName,
                item.statusName,
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
            { wch: 12 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Claim Report");

        XLSX.writeFile(workbook, `K3-Claim-Report-${yearMonth}.xlsx`);
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
                    Title={'Claim Report List'}
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
