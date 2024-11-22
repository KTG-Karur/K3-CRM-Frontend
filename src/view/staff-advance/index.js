import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffAdvanceContainer, staffAdvancePayContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createAdvancePaymentHistoryRequest, createStaffAdvanceRequest, getActivityRequest, getAdvancePaymentHistoryRequest, getStaffAdvanceRequest, getStaffRequest, resetCreateStaffAdvance, resetGetActivity, resetGetAdvancePaymentHistory, resetGetStaffAdvance, resetGetStaff, resetUpdateStaffAdvance, updateAdvancePaymentHistoryRequest, updateStaffAdvanceRequest, getBranchRequest, resetGetBranch } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import moment from 'moment';

let isEdit = false;
let isEditorpayment = 'forEdit';
function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getStaffAdvanceSuccess, getStaffAdvanceList, getStaffAdvanceFailure,
        getActivitySuccess, getActivityList, getActivityFailure,
        createStaffAdvanceSuccess, createStaffAdvanceData, createStaffAdvanceFailure,
        updateStaffAdvanceSuccess, updateStaffAdvanceData, updateStaffAdvanceFailure,
        errorMessage, getAdvancePaymentHistorySuccess, getAdvancePaymentHistoryFailure, getAdvancePaymentHistoryList, getStaffSuccess,
        getStaffList,
        getStaffFailure,
        getBranchSuccess, getBranchList, getBranchFailure,

    } = appSelector((state) => ({

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getStaffAdvanceSuccess: state.staffAdvanceReducer.getStaffAdvanceSuccess,
        getStaffAdvanceList: state.staffAdvanceReducer.getStaffAdvanceList,
        getStaffAdvanceFailure: state.staffAdvanceReducer.getStaffAdvanceFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        getAdvancePaymentHistorySuccess: state.advancePaymentHistoryReducer.getAdvancePaymentHistorySuccess,
        getAdvancePaymentHistoryList: state.advancePaymentHistoryReducer.getAdvancePaymentHistoryList,
        getAdvancePaymentHistoryFailure: state.advancePaymentHistoryReducer.getAdvancePaymentHistoryFailure,

        createStaffAdvanceSuccess: state.staffAdvanceReducer.createStaffAdvanceSuccess,
        createStaffAdvanceData: state.staffAdvanceReducer.createStaffAdvanceData,
        createStaffAdvanceFailure: state.staffAdvanceReducer.createStaffAdvanceFailure,

        updateStaffAdvanceSuccess: state.staffAdvanceReducer.updateStaffAdvanceSuccess,
        updateStaffAdvanceData: state.staffAdvanceReducer.updateStaffAdvanceData,
        updateStaffAdvanceFailure: state.staffAdvanceReducer.updateStaffAdvanceFailure,

        errorMessage: state.staffAdvanceReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
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
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: true,
        },
        {
            Header: 'Balance Amount',
            Cell: ({ row }) => <div> {(row.original.amount) - (row.original.paidAmount)} </div>,
            sort: true,
        },
        {
            Header: 'Status',
            accessor: 'statusId',
            sort: true,
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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index, "forEdit")}>
                            <i className={'fe-edit-1'}></i>
                        </span>

                        <span className="text-primary  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index, "forPayment")}>
                            <i className={'fe-info'}></i>
                        </span>

                    </div>
                )
            },
        },
    ];

    const columnsPayment = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'paidDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.paidDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Amount',
            accessor: 'paidAmount',
            Cell: ({ row }) => <div> {(row.original.paidAmount)} </div>,

            Footer: ({ rows }) => {
                const total = rows.reduce((sum, row) => parseInt(sum) + (parseInt(row.original.paidAmount) || 0), 0);
                return (<span>data
                </span>);
            },

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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index, "forEdit")}>
                            <i className={'fe-edit-1'}></i>
                        </span>



                    </div>
                )
            },
        },
    ];




    const [state, setState] = useState({
        applyDate: moment().format("YYYY-MM-DD"),
    });
    const [parentList, setParentList] = useState([]);
    const [parentPaymentList, setParentPaymentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        branchList: [],
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStaffAdvanceRequest());
        dispatch(getBranchRequest());
        dispatch(getStaffRequest());
    }, []);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: getBranchList,
            });
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: [],
            });
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);


    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false);
            setOptionListState({
                ...optionListState,
                staffList: getStaffList,
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
        if (getStaffAdvanceSuccess) {
            setIsLoading(false)
            setParentList(getStaffAdvanceList)
            dispatch(resetGetStaffAdvance())
        } else if (getStaffAdvanceFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaffAdvance())
        }
    }, [getStaffAdvanceSuccess, getStaffAdvanceFailure]);

    useEffect(() => {
        if (createStaffAdvanceSuccess) {
            const temp_state = [createStaffAdvanceData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaffAdvance())
        } else if (createStaffAdvanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffAdvance())
        }
    }, [createStaffAdvanceSuccess, createStaffAdvanceFailure]);

    useEffect(() => {
        if (updateStaffAdvanceSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffAdvanceData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaffAdvance())
        } else if (updateStaffAdvanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffAdvance())
        }
    }, [updateStaffAdvanceSuccess, updateStaffAdvanceFailure]);


    useEffect(() => {

        if (getAdvancePaymentHistorySuccess) {
            setIsLoading(false)
            setParentPaymentList(getAdvancePaymentHistoryList);
            dispatch(resetGetAdvancePaymentHistory())
        } else if (getAdvancePaymentHistoryFailure) {
            setIsLoading(false)
            dispatch(resetGetAdvancePaymentHistory())
        }
    }, [getAdvancePaymentHistorySuccess, getAdvancePaymentHistoryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        onPaymentFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            applyDate: moment().format("YYYY-MM-DD"),
            staffId: '',
            amount: '',
            reason: '',
        });
    };

    const onPaymentFormClear = () => {
        setState({
            ...state,
            paidDate: '',
            paidAmount: '',
            reason: '',
        });
    };

    const createModel = () => {
        onFormClear()
        onPaymentFormClear()
        isEdit = false;
        setModal(true);
        isEditorpayment = 'forEdit'
    };



    const onEditForm = (data, index, name) => {
        if (name == "forEdit") {
            setState({
                ...state,
                staffId: data?.staffId || "",
                amount: data?.amount || "",
                reason: data?.reason || "",
                applyDate: data.applyDate ? dateConversion(data.applyDate, "YYYY-MM-DD") : ""
            });
        } else if (name == "forPayment") {
            setState({
                ...state,
                staffAdvanceId: data?.staffAdvanceId || "",
            });
        }
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
        isEditorpayment = name;
        const reqData = {
            staffAdvanceId: data?.staffAdvanceId
        }
        dispatch(getAdvancePaymentHistoryRequest(reqData));

    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            staffId: state?.staffId || "",
            amount: state?.amount || "",
            reason: state?.reason || "",
            advanceStatus: 28,
            applyDate: state.applyDate ? dateConversion(state.applyDate, "YYYY-MM-DD") : "",
        }
        if (isEdit) {
            dispatch(updateStaffAdvanceRequest(submitRequest, selectedItem.staffAdvanceId))
        } else {
            dispatch(createStaffAdvanceRequest(submitRequest))
        }
    };


    const onPaymentFormSubmit = () => {
        const submitRequest = {
            staffAdvanceId: state?.staffAdvanceId || "",
            paidAmount: state?.paidAmount || "",
            paidDate: state.paidDate ? dateConversion(state.paidDate, "YYYY-MM-DD") : "",
        }
        dispatch(createAdvancePaymentHistoryRequest(submitRequest))

    }

    const onBranchChange = (option, formName, formUniqueKey, formDisplayKey) => {
        const branchFilter = {
            branchId: option[formUniqueKey]
        }
        setState({
            ...state,
            [formName]: option[formUniqueKey]
        })
        dispatch(getStaffRequest(branchFilter));
    }


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
                    Title={'Staff Advance List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={isEditorpayment === "forEdit" ? 'Staff Advance' : "Payment"}
                modelSize={isEditorpayment === "forEdit" ? 'md' : 'lg'}
                isEdit={isEditorpayment === "forEdit" ? isEdit : false}
                handleSubmit={handleValidation}
            >

                <FormLayout
                    dynamicForm={isEditorpayment === "forEdit" ? staffAdvanceContainer : staffAdvancePayContainer}
                    handleSubmit={isEditorpayment === "forEdit" ? onFormSubmit : onPaymentFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "onBranchChange": onBranchChange }}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />

                {
                    isEditorpayment === "forPayment" &&
                    <Table
                        columns={columnsPayment}
                        Title={'Payment List'}
                        data={parentPaymentList || []}
                        footerTable={false}

                    />
                }
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
