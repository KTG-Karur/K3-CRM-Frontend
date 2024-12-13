import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffFilterFormContainer, staffSalaryBtn, staffSalaryDetailsFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { createStaffSalaryRequest, getStaffSalaryDetailRequest, getStaffSalaryRequest, resetCreateStaffSalary, resetGetStaffSalary, resetGetStaffSalaryDetail, resetUpdateStaffSalary, updateStaffSalaryRequest } from '../../redux/staff-salary/actions';
import { getBranchRequest, getDepartmentRequest, getSettingBenefitRequest, resetGetBranch, resetGetDepartment, resetGetSettingBenefit } from '../../redux/actions';
import moment from 'moment';
import { alignPropType } from 'react-bootstrap/esm/types';

let isEditStaffSalaryDetail = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const incentiveAmountRefs = useRef([]);

    const {
        getStaffSalarySuccess, getStaffSalaryList, getStaffSalaryFailure,
        updateStaffSalarySuccess, updateStaffSalaryData, updateStaffSalaryFailure,
        createStaffSalarySuccess, createStaffSalaryFailure, createStaffSalaryData,
        errorMessage,

        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,


        getStaffSalaryDetailSuccess,
        getStaffSalaryDetailData,
        getStaffSalaryDetailFailure,

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

        getStaffSalaryDetailSuccess: state.staffsalaryReducer.getStaffSalaryDetailSuccess,
        getStaffSalaryDetailData: state.staffsalaryReducer.getStaffSalaryDetailData,
        getStaffSalaryDetailFailure: state.staffsalaryReducer.getStaffSalaryDetailFailure,

        createStaffSalarySuccess: state.staffsalaryReducer.createStaffSalarySuccess,
        createStaffSalaryData: state.staffsalaryReducer.createStaffSalaryData,
        createStaffSalaryFailure: state.staffsalaryReducer.createStaffSalaryFailure,

        updateStaffSalarySuccess: state.staffsalaryReducer.updateStaffSalarySuccess,
        updateStaffSalaryData: state.staffsalaryReducer.updateStaffSalaryData,
        updateStaffSalaryFailure: state.staffsalaryReducer.updateStaffSalaryFailure,

        errorMessage: state.staffsalaryReducer.errorMessage,
    }));


    const [isAlreadyCreated, setisAlreadyCreated] = useState(true);

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
        // {
        //     Header: 'Leave Count',
        //     accessor: 'leaveCount',
        //     Cell: ({ row }) => {
        //         return (
        //             <div>
        //                 {row.original?.totalLeave || 0}
        //             </div>
        //         )
        //     },
        // },
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
            },
            Footer: () => {
                return (
                    <div>
                        {
                            isAlreadyCreated ?
                                (<Button
                                    variant={'success'}
                                    onClick={onFormSubmit}
                                    style={{ padding: '10px' }}
                                >
                                    {'Submit'}
                                </Button>)
                                :
                                `${moment(state?.filterSalaryMonth).format('MMMM YYYY')} Salary inserted `
                        }
                    </div>
                )
            }
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" style={{ fontSize: "18px" }} onClick={() => onModalForm(row.original, row.index)}>
                            <i className={'fe-arrow-right-circle'}></i>
                        </span>
                    </div>
                )
            }
        },
    ];

    const [state, setState] = useState({
        minmumDate: moment().subtract(1, 'months').endOf('month').format('YYYY-MM'),
        maximumDate: moment().subtract(1, 'months').endOf('month').format('YYYY-MM'),
        staffSalary: [{}],
        departmentId: 0,
        branchId: 0,
        filterSalaryMonth: moment().subtract(1, 'months').endOf('month').format('YYYY-MM'),
        staffSalaryDetails: {},
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
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

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
        if (getStaffSalaryDetailSuccess) {
            setIsLoading(false)
            // setParentList(getSettingBenefitList)
            const { deductionAmount, totalSalaryAmount } = onHandleDeductionAmount(getStaffSalaryDetailData[0]?.incentiveAmount || 0, getStaffSalaryDetailData[0]?.bonusAmount || 0, getStaffSalaryDetailData[0]);

            if (getStaffSalaryDetailData[0].staffSalaryHistoryId) {
                isEditStaffSalaryDetail = true;
            } else {
                isEditStaffSalaryDetail = false;
            }
            setState((prevState) => {
                const updatedStaffSalary = [...prevState.staffSalary];
                const selectedStaff = updatedStaffSalary[selectedIndex];
                return {
                    ...prevState,
                    staffSalaryDetails: getStaffSalaryDetailData[0],
                    deductionAmount: getStaffSalaryDetailData[0]?.deductionAmount || deductionAmount,
                    totalSalaryAmount: getStaffSalaryDetailData[0]?.totalSalaryAmount || totalSalaryAmount,
                    incentiveAmount: selectedStaff.incentiveAmount,
                    bonusAmount: selectedStaff.bonusAmount
                }
            })
            dispatch(resetGetStaffSalaryDetail())
        } else if (getStaffSalaryDetailFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaffSalaryDetail())
        }
    }, [getStaffSalaryDetailSuccess, getStaffSalaryDetailFailure]);

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

            let count = 0;
            const staffSalaryList = (getStaffSalaryList || []).map((item, i) => {
                const { deductionAmount, totalSalaryAmount } = onHandleDeductionAmount(item?.incentiveAmount, item?.bonusAmount, item);

                if (item?.staffSalaryHistoryId) {
                    count++;
                }

                return {
                    staffSalaryHistoryId: item?.staffSalaryHistoryId,
                    staffId: item?.staffId,
                    incentiveAmount: item?.incentiveAmount || 0,
                    bonusAmount: item?.bonusAmount || 0,
                    branchId: item?.branchId || '',
                    departmentId: item?.departmentId || '',
                    esiAmount: item?.esiAmount || '',
                    pfAmount: item?.pfAmount || '',
                    salaryDate: `${state.filterSalaryMonth}-01` || '',
                    monthlyAmount: item?.monthlyAmount || 0,
                    deductionAmount: item?.deductionAmount || deductionAmount || 0,
                    totalSalaryAmount: item?.totalSalaryAmount || totalSalaryAmount || 0,
                }
            });
            if (count == staffSalaryList.length) {
                setisAlreadyCreated(false);
            }
            setState({
                ...state,
                staffSalary: staffSalaryList || []
            })
            dispatch(resetGetStaffSalary())
        } else if (getStaffSalaryFailure) {
            setIsLoading(false)
            dispatch(resetGetStaffSalary())
        }
    }, [getStaffSalarySuccess, getStaffSalaryFailure]);

    useEffect(() => {
        if (createStaffSalarySuccess) {
            const searchReq = {
                salaryDate: `${state.filterSalaryMonth}-01`
            }
            dispatch(getStaffSalaryRequest(searchReq));
            showMessage('success', 'Created Successfully');
            setIsLoading(true)
            closeModel()
            dispatch(resetCreateStaffSalary())
        } else if (createStaffSalaryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffSalary())
        }
    }, [createStaffSalarySuccess, createStaffSalaryFailure]);


    useEffect(() => {
        if (updateStaffSalarySuccess) {
            const searchReq = {
                salaryDate: `${state.filterSalaryMonth}-01`
            }
            dispatch(getStaffSalaryRequest(searchReq));
            isEditStaffSalaryDetail && showMessage('success', 'Updated Successfully');
            setIsLoading(false)
            closeModel()
            dispatch(resetUpdateStaffSalary())
        } else if (updateStaffSalaryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffSalary())
        }
    }, [updateStaffSalarySuccess, updateStaffSalaryFailure]);

    useEffect(() => {
        const date = new Date(state.filterSalaryMonth);
        const result = !isNaN(date.getTime());
        if (state.branchId > 0 && result) {
            const staffReq = {
                branchId: state.branchId,
                departmentId: state.departmentId
            }
            state.departmentId <= 0 && delete staffReq.departmentId
            dispatch(getStaffSalaryRequest(staffReq))
        }
    }, [state.departmentId, state.branchId, state.filterSalaryMonth]);

    const closeModel = () => {
        isEditStaffSalaryDetail = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState((prevState) => ({
            ...prevState,
            staffSalaryDetails: {},
            deductionAmount: 0,
            totalSalaryAmount: 0,
            incentiveAmount: 0,
            bonusAmount: 0,
        }));
    };

    const createModel = () => {
        onFormClear()
        isEditStaffSalaryDetail = false;
        setModal(true)
    };

    const onFormSubmit = async () => {
        const submitRequest = {
            staffSalary: state?.staffSalary || ""
        }
        dispatch(createStaffSalaryRequest(submitRequest))
    };

    const onStaffSubmit = async () => {
        const submitRequest = {
            staffSalary: [{
                staffId: state?.staffSalaryDetails?.staffId || "",
                branchId: state?.staffSalaryDetails?.branchId || "",
                departmentId: state?.staffSalaryDetails?.departmentId || "",
                salaryDate: `${state.filterSalaryMonth}-01`,
                monthlyAmount: state?.staffSalaryDetails?.monthlyAmount || 0,

                esiAmount: state?.staffSalaryDetails?.esiAmount || 0,
                pfAmount: state?.staffSalaryDetails?.pfAmount || 0,

                incentiveAmount: state?.staffSalaryDetails?.incentiveAmount || 0,
                bonusAmount: state?.staffSalaryDetails?.bonusAmount || 0,

                deductionAmount: state?.staffSalaryDetails?.deductionAmount || 0,
                totalSalaryAmount: state?.staffSalaryDetails?.totalSalaryAmount || 0,
            }]
        }
        if (isEditStaffSalaryDetail) {
            dispatch(updateStaffSalaryRequest(submitRequest, selectedItem.staffSalaryHistoryId))
        } else {
            dispatch(createStaffSalaryRequest(submitRequest))
        }
    };

    const handleChange = (staffDetail, incentiveAmount, index) => {
        setState((prev) => {
            const updatedStaffSalary = [...prev.staffSalary];

            updatedStaffSalary[index] = {
                ...updatedStaffSalary[index],
                incentiveAmount: incentiveAmount,
            };

            return {
                ...prev,
                staffSalary: updatedStaffSalary,
            };
        });

        requestAnimationFrame(() => {
            incentiveAmountRefs.current[index]?.focus();
        });
    };


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

    const onModalForm = (data, index) => {
        createModel();
        setSelectedIndex(index);
        setSelectedItem(data);

        const salaryDetailsReq = {
            staffId: data.staffId,
            salaryDate: `${state?.filterSalaryMonth}-01`
        }
        dispatch(getStaffSalaryDetailRequest(salaryDetailsReq));
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

    const onIncentiveorBonusAmount = (event, name) => {
        const { value } = event.target
        setState((prevState) => {
            const updatedStaffSalary = [...prevState.staffSalary];
            const updatedStaffSalaryDetails = prevState.staffSalaryDetails;
            const selectedStaff = updatedStaffSalary[selectedIndex];

            const incentiveAmountORbonusAmount = Number(value)

            let bonus = selectedStaff.bonusAmount;
            let incentive = selectedStaff.incentiveAmount;
            if (name == "bonusAmount") {
                bonus = incentiveAmountORbonusAmount;
            } else {
                incentive = incentiveAmountORbonusAmount;
            }

            const { deductionAmount, totalSalaryAmount } = onHandleDeductionAmount(incentive, bonus, state?.staffSalaryDetails);

            updatedStaffSalaryDetails[name] = incentiveAmountORbonusAmount;
            updatedStaffSalaryDetails.deductionAmount = deductionAmount;
            updatedStaffSalaryDetails.totalSalaryAmount = totalSalaryAmount;

            updatedStaffSalary[selectedIndex] = {
                ...selectedStaff,
                [name]: incentiveAmountORbonusAmount,
                deductionAmount,
                totalSalaryAmount,
            }
            return (
                {
                    ...prevState,
                    staffSalary: updatedStaffSalary,
                    [name]: Number(value),
                    deductionAmount: deductionAmount,
                    totalSalaryAmount: totalSalaryAmount,
                    updatedStaffSalaryDetails
                }
            )
        })
    }

    // console.log("state");
    // console.log(state);
    // console.log("state?.staffSalaryDetails")
    // console.log(state?.staffSalaryDetails)



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
                        Title={'Salary List'}
                        data={parentList || []}
                        pageSize={5}
                        toggle={false}
                        pagination={false}
                        filterTbl={true}
                        footerTbl={true}
                        filterFormContainer={staffFilterFormContainer}
                        onChangeCallBack={{ "handleDate": handleDate, "handleDepartment": handleDepartment, "handleBranch": handleBranch }}
                        optionListState={optionListState}
                        setState={setState}
                        state={state}
                        noOfColumns={1}
                    />
                </div>}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={`Salary Details - (${state?.staffSalaryDetails?.staffName || ""} - ${state?.staffSalaryDetails?.staffCode || ""})`}
                modelSize={'lg'}
                isEdit={isEditStaffSalaryDetail}
                modelHead={true}
                handleSubmit={onStaffSubmit}
            >
                <Row className='mb-4 mt-2'>
                    <Col md={6}>
                        <h3 className="header-title">Staff Leave Information</h3>
                        <Row>
                            <Col md={5} className='mt-3'>Casual Leave</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`${state?.staffSalaryDetails?.casualLeaveCount || 0} Days`}</Col>
                            <Col md={5} className='mt-3'>Sick Leave</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`${state?.staffSalaryDetails?.sickLeaveCount || 0} Days`}</Col>
                            <Col md={5} className='mt-3'>Loss of Pay</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`${(state?.staffSalaryDetails?.casualLeaveCount + state?.staffSalaryDetails?.sickLeaveCount) > 0 ? (state?.staffSalaryDetails?.casualLeaveCount - 1) + (state?.staffSalaryDetails?.sickLeaveCount - 1) > 0 ? (state?.staffSalaryDetails?.casualLeaveCount - 1) + (state?.staffSalaryDetails?.sickLeaveCount - 1) : 0 : 0} Days`}</Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <h3 className="header-title">Staff Benifit Information</h3>
                        <Row>
                            <Col md={5} className='mt-3'>ESI</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`Rs. ${state?.staffSalaryDetails?.esiAmount || 0}.00`}</Col>
                            <Col md={5} className='mt-3'>PF</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`Rs. ${state?.staffSalaryDetails?.pfAmount || 0}.00`}</Col>
                            <Col md={5} className='mt-3'>Monthly Salary</Col>
                            <Col md={1} className='mt-3'>:</Col>
                            <Col md={6} className='mt-3'>{`Rs. ${state?.staffSalaryDetails?.monthlyAmount || 0}.00`}</Col>
                        </Row>
                    </Col>
                </Row>
                <FormLayout
                    dynamicForm={staffSalaryDetailsFormContainer}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "onIncentiveorBonusAmount": onIncentiveorBonusAmount }}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
