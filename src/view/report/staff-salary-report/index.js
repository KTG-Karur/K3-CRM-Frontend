import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { staffFilterFormContainer, staffSalaryBtn, staffSalaryDetailsFormContainer } from './formFieldData';
import Table from '../../../components/Table';
import { useRedux } from '../../../hooks'
import { NotificationContainer } from 'react-notifications';
import { getStaffSalaryRequest, resetGetStaffSalary } from '../../../redux/staff-salary/actions';
import { getBranchRequest, getDepartmentRequest, getSettingBenefitRequest, resetGetBranch, resetGetDepartment } from '../../../redux/actions';
import moment from 'moment';
import * as XLSX from "xlsx";

let isEditStaffSalaryDetail = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSalarySuccess, getStaffSalaryList, getStaffSalaryFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
    } = appSelector((state) => ({

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        getStaffSalarySuccess: state.staffsalaryReducer.getStaffSalarySuccess,
        getStaffSalaryList: state.staffsalaryReducer.getStaffSalaryList,
        getStaffSalaryFailure: state.staffsalaryReducer.getStaffSalaryFailure,

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
            Header: 'Working Days',
            accessor: 'workingDays',
            Cell: ({ row }) => {
                return (
                    <div>
                        {`${Number(row.original?.workingDays || 0) - Number(row.original?.totalLeave || 0)} / ${row.original?.workingDays || 0}`}
                    </div>
                )
            }
        },
        {
            Header: 'Leave Count',
            accessor: 'leaveCount',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original?.totalLeave || 0}
                    </div>
                )
            },
        },
        {
            Header: 'Advance Amount',
            accessor: 'advanceAmount',
        },
        {
            Header: 'Paid Amount',
            accessor: 'paidAdvanceAmount',
        },
        {
            Header: 'Monthly Amount',
            accessor: 'monthlyAmount',
            Cell: ({ row }) => {
                return (
                    <div>
                        {`${row.original?.monthlyAmount || 0}.00`}
                    </div>
                )
            },
        },
        {
            Header: 'Deduction Amount',
            accessor: 'deductionAmount',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original?.deductionAmount || 0}
                    </div>
                )
            },
        },
        {
            Header: 'Total Salary Amount',
            accessor: 'totalSalaryAmount',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original?.totalSalaryAmount || 0}
                    </div>
                )
            }
        }
    ];

    const [state, setState] = useState({
        maximumDate: moment().subtract(1, 'months').endOf('month').format('YYYY-MM'),
        departmentId: 0,
        branchId: 0,
        filterSalaryMonth: moment().subtract(1, 'months').endOf('month').format('YYYY-MM'),
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
    })
    const [parentList, setParentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getSettingBenefitRequest());
        const searchReq = {
            salaryDate: `${state.filterSalaryMonth}-01`
        }
        dispatch(getStaffSalaryRequest(searchReq));
        dispatch(getBranchRequest());
        dispatch(getDepartmentRequest());
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
        if (getStaffSalarySuccess) {
            setIsLoading(false)
            setParentList(() => {
                const salaryList = (getStaffSalaryList || []).map(item => {
                    const { deductionAmount, totalSalaryAmount } = onHandleDeductionAmount(item?.incentiveAmount, item?.bonusAmount, item);
                    return {
                        ...item,
                        deductionAmount: item?.deductionAmount || deductionAmount || 0,
                        totalSalaryAmount: item?.totalSalaryAmount || totalSalaryAmount || 0,
                    }
                })
                return salaryList
            });
            dispatch(resetGetStaffSalary())
        } else if (getStaffSalaryFailure) {
            setIsLoading(false)
            dispatch(resetGetStaffSalary())
        }
    }, [getStaffSalarySuccess, getStaffSalaryFailure]);


    const handleDate = (event, formName) => {
        setState({
            ...state,
            [formName]: event.target.value
        })
        const filterDepartment = {
            filterSalaryMonth: event.target.value
        }
        dispatch(getStaffSalaryRequest(filterDepartment));
    }

    const handleDepartment = (option, formName, uniqueKey, displayKey) => {
        const filterDepartment = {
            departmentId: option[uniqueKey] || '',
            branchId: state?.branchId || '',
            salaryDate: `${state.filterSalaryMonth}-01`
        }
        dispatch(getStaffSalaryRequest(filterDepartment));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const handleBranch = (option, formName, uniqueKey, displayKey) => {
        const filterBranch = {
            branchId: option[uniqueKey] || '',
            departmentId: state?.departmentId || '',
            salaryDate: `${state.filterSalaryMonth}-01`
        }
        dispatch(getStaffSalaryRequest(filterBranch));
        setIsLoading(true);
        setState({
            ...state,
            [formName]: option[uniqueKey],
        })
    }

    const onHandleDeductionAmount = (incentiveAmount = 0, bonusAmount = 0, data) => {
        const casualLeaveCount = Number(data?.casualLeaveCount);
        const sickLeaveCount = Number(data?.sickLeaveCount);
        const lopDays = (casualLeaveCount + sickLeaveCount) > 0 ?
            (casualLeaveCount - 1) + (sickLeaveCount - 1) > 0 ? (casualLeaveCount - 1) + (sickLeaveCount - 1) : 0 : 0;
        const perDaysalary = Number(data?.monthlyAmount) / Number(data?.workingDays);
        const leaveDeductionAmount = perDaysalary * lopDays;
        let deductionAmount = Number(leaveDeductionAmount - (Number(incentiveAmount) + Number(bonusAmount))).toFixed(2);
        const totalSalaryAmount = Number(Number(data?.monthlyAmount) - deductionAmount).toFixed(2);
        if (deductionAmount < 0) {
            deductionAmount = Number(0).toFixed(2);
        }
        return { deductionAmount, totalSalaryAmount };
    }

    const onDownload = () => {
        const yearMonth = moment(state?.attendanceDate).format("MMMM YYYY");
        const additionalDetails = `Attendance Report for ${yearMonth}`;
        const reportGeneratedDate = `Report Generated On: ${moment().format("DD-MM-YYYY")}`;
        const data = parentList.map((item, i) => ({
            ["s.no"]: i + 1,
            staffCode: item.staffCode,
            staffName: item.staffName,
            branchName: item.branchName,
            departmentName: item.departmentName,

            advanceAmount: item.advanceAmount,
            paidAdvanceAmount: item.paidAdvanceAmount,

            pfAmount: item.pfAmount,
            esiAmount: item.esiAmount,

            workingDays: `${Number(item.workingDays || 0) - Number(item.totalLeave || 0)} / ${item.workingDays || 0}`,

            casualLeaveCount: item?.casualLeaveCount || 0,
            sickLeaveCount: item?.sickLeaveCount || 0,
            totalLeave: item?.totalLeave || 0,

            incentiveAmount: item.incentiveAmount,
            bonusAmount: item.bonusAmount,

            monthlyAmount: item.monthlyAmount,
            deductionAmount: item.deductionAmount,
            totalSalaryAmount: item.totalSalaryAmount,

        }));
        const header = [
            [additionalDetails],
            [reportGeneratedDate],
            [],
            ["S.no", "Staff Code", "Staff Name", "Branch Name", "Department Name", "Advance Amount", "Paid Advance Amount", "PF Amount",
                "ESI Amount",
                "Working Days",
                "Casual Leave",
                "Sick Leave",
                "Total Leave (CL + SL)",
                "Incentive Amount",
                "Bonus Amount",
                "Monthly Amount",
                "deduction Amount",
                "Total Salary Amount",

            ]
        ];
        const rows = [
            ...header,
            ...data.map(item => [
                item["s.no"],
                item.staffCode,
                item.staffName,
                item.branchName,
                item.departmentName,

                item.advanceAmount,
                item.paidAdvanceAmount,

                item.pfAmount,
                item.esiAmount,

                item.workingDays,
                item.casualLeaveCount,
                item.sickLeaveCount,
                item.totalLeave,

                item.incentiveAmount,
                item.bonusAmount,
                item.monthlyAmount,
                item.deductionAmount,
                item.totalSalaryAmount,
            ])
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        worksheet["!cols"] = [
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 20 },
            { wch: 30 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Report");

        XLSX.writeFile(workbook, `K3-Staff-Salary-Report-${yearMonth}.xlsx`);
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                <div>
                    <Table
                        columns={columns}
                        Title={'Staff Salary Report'}
                        data={parentList || []}
                        pageSize={5}
                        toggle={false}
                        pagination={false}
                        filterTbl={true}
                        footerTbl={true}
                        filterFormContainer={staffFilterFormContainer}
                        onChangeCallBack={{ "handleDate": handleDate, "handleDepartment": handleDepartment, "handleBranch": handleBranch }}
                        onClickCallBack={{ "onDownload": onDownload }}
                        optionListState={optionListState}
                        setState={setState}
                        state={state}
                        noOfColumns={1}
                    />
                </div>}
        </React.Fragment>
    );
}

export default Index;
