import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { filterFormContainer, salaryIncreamentHistoryContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createSalaryIncreamentHistoryRequest, getSalaryIncreamentHistoryRequest, resetGetDepartment, getDepartmentRequest, resetCreateSalaryIncreamentHistory, resetGetSalaryIncreamentHistory, resetUpdateSalaryIncreamentHistory, updateSalaryIncreamentHistoryRequest, resetGetStaff, getStaffRequest, getBranchRequest, resetGetBranch, resetGetStaffSalary, getStaffSalaryRequest, updateStaffSalaryRequest } from '../../redux/actions';
import { usePageTitle, useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';

let isEdit = false;

function Index() {

    usePageTitle({
        title: 'Salary Increment',
    });

    const { dispatch, appSelector } = useRedux();

    const { getSalaryIncreamentHistorySuccess, getSalaryIncreamentHistoryList, getSalaryIncreamentHistoryFailure,
        getStaffSalarySuccess, getStaffSalaryList, getStaffSalaryFailure,
        createSalaryIncreamentHistorySuccess, createSalaryIncreamentHistoryData, createSalaryIncreamentHistoryFailure,
        updateSalaryIncreamentHistorySuccess, updateSalaryIncreamentHistoryData, updateSalaryIncreamentHistoryFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getStaffSuccess, getStaffList, getStaffFailure, errorMessage,

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

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getSalaryIncreamentHistorySuccess: state.salaryIncreamentHistoryReducer.getSalaryIncreamentHistorySuccess,
        getSalaryIncreamentHistoryList: state.salaryIncreamentHistoryReducer.getSalaryIncreamentHistoryList,
        getSalaryIncreamentHistoryFailure: state.salaryIncreamentHistoryReducer.getSalaryIncreamentHistoryFailure,

        createSalaryIncreamentHistorySuccess: state.salaryIncreamentHistoryReducer.createSalaryIncreamentHistorySuccess,
        createSalaryIncreamentHistoryData: state.salaryIncreamentHistoryReducer.createSalaryIncreamentHistoryData,
        createSalaryIncreamentHistoryFailure: state.salaryIncreamentHistoryReducer.createSalaryIncreamentHistoryFailure,

        updateSalaryIncreamentHistorySuccess: state.salaryIncreamentHistoryReducer.updateSalaryIncreamentHistorySuccess,
        updateSalaryIncreamentHistoryData: state.salaryIncreamentHistoryReducer.updateSalaryIncreamentHistoryData,
        updateSalaryIncreamentHistoryFailure: state.salaryIncreamentHistoryReducer.updateSalaryIncreamentHistoryFailure,

        errorMessage: state.salaryIncreamentHistoryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Department Name',
            accessor: 'departmentName',
            sort: true,
        },
        {
            Header: 'SalaryIncreamentHistory Name',
            accessor: 'salaryIncreamentHistoryName',
            sort: true,
        },

        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isActive ? (
                        <Badge bg={'success'}>Active</Badge>
                    ) : (
                        <Badge bg={'danger'}>In active</Badge>
                    )}
                </div>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive
                const iconColor = activeChecker ? "text-danger" : "text-warning";
                const deleteMessage = activeChecker ? "You want to In-Active...?" : "You want to retrive this Data...?";
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({
        dateFilter: moment().startOf('month').format("YYYY-MM-DD"),
        annualAmount: 0.00,
        monthlyAmount: 0.00,
        esiAmount: 0.00,
        pfAmount: 0.00,
        increamentAmount: 0.00,
        increamentDate : moment().format("YYYY-MM-DD")
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [optionListState, setOptionListState] = useState({
        departmentList: [],
    })

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getSalaryIncreamentHistoryRequest());
        dispatch(getBranchRequest());
        dispatch(getDepartmentRequest());
    }, []);

    useEffect(() => {
        if (getSalaryIncreamentHistorySuccess) {
            setIsLoading(false)
            setParentList(getSalaryIncreamentHistoryList)
            dispatch(resetGetSalaryIncreamentHistory())
        } else if (getSalaryIncreamentHistoryFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSalaryIncreamentHistory())
        }
    }, [getSalaryIncreamentHistorySuccess, getSalaryIncreamentHistoryFailure]);

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
        if (getStaffSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                staffList: getStaffList
            })
            dispatch(resetGetStaff())
        } else if (getStaffFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                staffList: []
            })
            dispatch(resetGetStaff())
        }
    }, [getStaffSuccess, getStaffFailure]);

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
        if (getStaffSalarySuccess) {
            setIsLoading(false)
            const selectedData = getStaffSalaryList[0]
            setSelectedItem(selectedData)
            setState({
                ...state,
                staffSalaryList: getStaffSalaryList,
                staffName : selectedData?.staffName || "",
                staffCode : selectedData?.staffCode || "",
                contactNo : selectedData?.contactNo || "",
                perviousAnnualAmount : selectedData?.perviousAnnualAmount || "",
                perviousMonthlyAmount : selectedData?.perviousMonthlyAmount || "",
                perviousEsiAmount : selectedData?.perviousEsiAmount || "",
                perviousPfAmount : selectedData?.perviousPfAmount || ""
            })
            dispatch(resetGetStaffSalary())
        } else if (getStaffSalaryFailure) {
            setIsLoading(false)
            dispatch(resetGetStaffSalary())
        }
    }, [getStaffSalarySuccess, getStaffSalaryFailure]);

    useEffect(() => {
        if (createSalaryIncreamentHistorySuccess) {
            const temp_state = [createSalaryIncreamentHistoryData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateSalaryIncreamentHistory())
        } else if (createSalaryIncreamentHistoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateSalaryIncreamentHistory())
        }
    }, [createSalaryIncreamentHistorySuccess, createSalaryIncreamentHistoryFailure]);

    useEffect(() => {
        if (updateSalaryIncreamentHistorySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateSalaryIncreamentHistoryData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateSalaryIncreamentHistory())
        } else if (updateSalaryIncreamentHistoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateSalaryIncreamentHistory())
        }
    }, [updateSalaryIncreamentHistorySuccess, updateSalaryIncreamentHistoryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            salaryIncreamentHistoryName: '',
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
            salaryIncreamentHistoryName: data?.salaryIncreamentHistoryName || "",
            departmentId: data?.departmentId || "",
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const onSalaryIncreament = (e) => {
        const esi = 0.0175
        const pf = 0.12
        const increamentAmount = e.target.value
        const monthlyAmount = parseInt(state.perviousMonthlyAmount || 0) + parseInt(increamentAmount)
        const annualAmount = parseInt(monthlyAmount * 12)
        const esiAmount = parseInt(monthlyAmount * esi / 100)
        const pfAmount = parseInt(monthlyAmount * pf / 100)
        const monthlySalary = monthlyAmount - esiAmount - pfAmount
        setState({
            ...state,
            [e.target.name]: increamentAmount,
            annualAmount: annualAmount,
            monthlyAmount: monthlySalary,
            esiAmount: esiAmount,
            pfAmount: pfAmount,
        })
    }

    const handleDepartment = (option, formName, uniqueKey, displayKey) => {
        if(!state.branchId){
            showMessage('warning', 'Please Select the Branch...!')
        }else{
            setState({
                ...state,
                [formName]: option[uniqueKey],
            })
            const staffFilterReq={
                branchId : state?.branchId || "",
                departmentId : option[uniqueKey] || ""
            }
            dispatch(getStaffRequest(staffFilterReq));
        }        
    }

    const onSearchFilter = () => {
        if(state.staffId){
            const searchReq={
                staffId : state.staffId
            }
            dispatch(getStaffSalaryRequest(searchReq))
        }else{
            showMessage('warning', 'Please Select the Staff...!')
        }
    }

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            annualAmount: state?.annualAmount || "",
            monthlyAmount: state?.monthlyAmount || "",
            esiAmount: state?.esiAmount || "",
            pfAmount: state?.pfAmount || "",
            increamentDate : state.increamentDate || "",
            staffId : state.staffId || "",
            increamentBy : 1 || "",  // login Id
        }
        dispatch(updateStaffSalaryRequest(submitRequest, selectedItem.staffSalaryAllocatedId))
        
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateSalaryIncreamentHistoryRequest(submitRequest, data.salaryIncreamentHistoryId))
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
                    <div className='mt-3'>
                        <FormLayout
                            dynamicForm={filterFormContainer}
                            setState={setState}
                            state={state}
                            noOfColumns={4}
                            optionListState={optionListState}
                            onChangeCallBack={{ "handleDepartment" : handleDepartment }}
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Button
                            variant="primary"
                            className="waves-effect waves-light"
                            onClick={onSearchFilter}>
                            <i className={`mdi mdi-clipboard-text-search mx-1 `}></i>
                            {"Search"}
                        </Button>
                    </div>
                    <Row>
                        <Col md={6} >
                            <Card className='mt-3'>
                                <Card.Body>
                                    <h3 className="header-title">Current Salary Information</h3>
                                    <Row>
                                        <Col md={5} className='mt-3'>Staff Id</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.staffName || "-"}</Col>
                                        <Col md={5} className='mt-3'>Staff Name</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.staffCode || "-"}</Col>
                                        <Col md={5} className='mt-3'>Contact No</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.contactNo || "-"}</Col>
                                        <Col md={5} className='mt-3'>Annual Package</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.perviousAnnualAmount || "-"}</Col>
                                        <Col md={5} className='mt-3'>Current Salary (in hand)</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.perviousMonthlyAmount || "-"}</Col>
                                        <Col md={5} className='mt-3'>ESI</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.perviousEsiAmount || "-"}</Col>
                                        <Col md={5} className='mt-3'>PF</Col>
                                        <Col md={1} className='mt-3'>:</Col>
                                        <Col md={6} className='mt-3'>{state?.perviousPfAmount || "-"}</Col>
                                    </Row>
                                </Card.Body>
                            </Card></Col>
                        <Col md={6} >
                            <Card className='mt-3'>
                                <Card.Body>
                                    <h3 className="header-title">Salary Information</h3>
                                    <Row>
                                        <Col md={12} className='mt-2'>
                                            <FormLayout
                                                dynamicForm={salaryIncreamentHistoryContainer}
                                                // handleSubmit={onFormSubmit}
                                                setState={setState}
                                                state={state}
                                                ref={errorHandle}
                                                noOfColumns={1}
                                                errors={errors}
                                                setErrors={setErrors}
                                                onChangeCallBack={{ "onSalaryIncreament": onSalaryIncreament }}
                                            />
                                        </Col>
                                        <Col md={5} className='mt-2'>Increament Amount</Col>
                                        <Col md={1} className='mt-2'>:</Col>
                                        <Col md={6} className='mt-2 header-title'>{state?.increamentAmount || "0.00"}</Col>
                                        <Col md={5} className='mt-2'>Annual Package</Col>
                                        <Col md={1} className='mt-2'>:</Col>
                                        <Col md={6} className='mt-2 header-title'>{state?.annualAmount || "0.00"}</Col>
                                        <Col md={5} className='mt-2'>Monthly Salary (inhand)</Col>
                                        <Col md={1} className='mt-2'>:</Col>
                                        <Col md={6} className='mt-2 header-title'>{state?.monthlyAmount || "0.00"}</Col>
                                    </Row>
                                </Card.Body>
                            </Card></Col>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button
                            variant="primary"
                            className="waves-effect waves-light"
                            onClick={onFormSubmit}>
                            <i className={`mdi mdi-content-save mx-1 `}></i>
                            {"Submit"}
                        </Button>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default Index;
