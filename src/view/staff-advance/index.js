import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffAdvanceContainer, staffAdvancePayContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createAdvancePaymentHistoryRequest, createStaffAdvanceRequest, getActivityRequest, getAdvancePaymentHistoryRequest, getStaffAdvanceRequest, getStaffRequest, resetCreateStaffAdvance, resetGetActivity, resetGetAdvancePaymentHistory, resetGetStaffAdvance, resetGetStaff, resetUpdateStaffAdvance, updateAdvancePaymentHistoryRequest, updateStaffAdvanceRequest, getBranchRequest, resetGetBranch, resetCreateAdvancePaymentHistory, resetUpdateAdvancePaymentHistory, getStaffAdvanceLedgerRequest, resetGetStaffAdvanceLedger } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

let isEdit = false;
let isEditorpayment = 'forEdit';
function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { getStaffAdvanceSuccess, getStaffAdvanceList, getStaffAdvanceFailure,
        createStaffAdvanceSuccess, createStaffAdvanceData, createStaffAdvanceFailure,
        updateStaffAdvanceSuccess, updateStaffAdvanceData, updateStaffAdvanceFailure,
        errorMessage, getAdvancePaymentHistorySuccess, getAdvancePaymentHistoryFailure, getAdvancePaymentHistoryList, getStaffSuccess,
        getStaffList,
        getStaffFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        updateAdvancePaymentHistorySuccess, updateAdvancePaymentHistoryData, updateAdvancePaymentHistoryFailure,
        createAdvancePaymentHistoryFailure, createAdvancePaymentHistoryData, createAdvancePaymentHistorySuccess,
        getStaffAdvanceLedgerSuccess,
        getStaffAdvanceLedgerData,
        getStaffAdvanceLedgerFailure,
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

        getStaffAdvanceLedgerSuccess: state.staffAdvanceReducer.getStaffAdvanceLedgerSuccess,
        getStaffAdvanceLedgerData: state.staffAdvanceReducer.getStaffAdvanceLedgerData,
        getStaffAdvanceLedgerFailure: state.staffAdvanceReducer.getStaffAdvanceLedgerFailure,

        getAdvancePaymentHistorySuccess: state.advancePaymentHistoryReducer.getAdvancePaymentHistorySuccess,
        getAdvancePaymentHistoryList: state.advancePaymentHistoryReducer.getAdvancePaymentHistoryList,
        getAdvancePaymentHistoryFailure: state.advancePaymentHistoryReducer.getAdvancePaymentHistoryFailure,

        createAdvancePaymentHistoryFailure: state.advancePaymentHistoryReducer.createAdvancePaymentHistoryFailure,
        createAdvancePaymentHistoryData: state.advancePaymentHistoryReducer.createAdvancePaymentHistoryData,
        createAdvancePaymentHistorySuccess: state.advancePaymentHistoryReducer.createAdvancePaymentHistorySuccess,

        updateAdvancePaymentHistorySuccess: state.advancePaymentHistoryReducer.updateAdvancePaymentHistorySuccess,
        updateAdvancePaymentHistoryData: state.advancePaymentHistoryReducer.updateAdvancePaymentHistoryData,
        updateAdvancePaymentHistoryFailure: state.advancePaymentHistoryReducer.updateAdvancePaymentHistoryFailure,

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
            Header: 'isActive',
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
                        {row.original.statusId === 28 && (
                            <span>
                                <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index, "forEdit")}>
                                    <i className={'fe-edit-1'}></i>
                                </span>

                                {/* <span
                                    className={`${iconColor} cursor-pointer me-2`}
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
                                </span> */}

                                <span
                                    className={`text-success me-2 cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Approved?',
                                            () => onStatusForm(row.original, row.index, 29),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-up'}></i>
                                </span>
                                <span
                                    className={`text-danger me-2 cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Cancelled?',
                                            () => onStatusForm(row.original, row.index, 30),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-down'}></i>
                                </span>
                            </span>
                        )}



                        {
                            row.original.statusId === 29 &&
                            <span>
                                <span className="text-danger  me-2 cursor-pointer" onClick={() => onPaymentModal(row.original, row.index, "forPayment")}>
                                    <i className={'fe-file-text'}></i>
                                    {/* fe-dollar-sign */}
                                </span>
                                <span className="text-success  me-2 cursor-pointer"
                                    onClick={() => onPrintDesign(row.original)}>
                                    <i className={'fe-printer'} style={{ fontSize: '16px' }}></i>
                                </span>
                            </span>
                        }

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
            Header: 'isActive',
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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index, "forPayment")}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span
                            className={`${iconColor} cursor-pointer me-2`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteFormPayment(row.original, row.index, activeChecker),
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
        applyDate: moment().format("YYYY-MM-DD"),
        paidDate: moment().format("YYYY-MM-DD"),
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

    useEffect(() => {
        if (createAdvancePaymentHistorySuccess) {
            const temp_state = [createAdvancePaymentHistoryData[0], ...parentPaymentList];
            setParentPaymentList(temp_state);
            showMessage('success', 'Created Successfully');
            onFormClear()
            dispatch(resetCreateAdvancePaymentHistory())
        } else if (createAdvancePaymentHistoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateAdvancePaymentHistory())
        }
    }, [createAdvancePaymentHistorySuccess, createAdvancePaymentHistoryFailure]);

    useEffect(() => {
        if (updateAdvancePaymentHistorySuccess) {
            const temp_state = [...parentPaymentList];
            temp_state[selectedIndex] = updateAdvancePaymentHistoryData[0];
            setParentPaymentList(temp_state);
            isEdit && showMessage('success', 'Updated Successfully');
            onFormClear()
            dispatch(resetUpdateAdvancePaymentHistory())
        } else if (updateAdvancePaymentHistoryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAdvancePaymentHistory())
        }
    }, [updateAdvancePaymentHistorySuccess, updateAdvancePaymentHistoryFailure]);

    useEffect(() => {
        if (getStaffAdvanceLedgerSuccess) {
            setIsLoading(false)
            navigate('/ledger-report', { state: getStaffAdvanceLedgerData });
            dispatch(resetGetStaffAdvanceLedger())
        } else if (getStaffAdvanceLedgerFailure) {
            setIsLoading(false)
            dispatch(resetGetStaffAdvanceLedger())
        }
    }, [getStaffAdvanceLedgerSuccess, getStaffAdvanceLedgerFailure]);


    const onPrintDesign = (data) => {
        const staffId = {
            staffId: data?.staffId
        }
        dispatch(getStaffAdvanceLedgerRequest(staffId))
    }

    const closeModel = () => {
        isEdit = false;
        onFormClear();
        setModal(false);
    }

    const onFormClear = () => {
        setState({
            ...state,
            applyDate: moment().format("YYYY-MM-DD"),
            staffId: '',
            amount: '',
            reason: '',

            paidDate: moment().format("YYYY-MM-DD"),
            paidAmount: '',
            reason: '',
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true);
        isEditorpayment = 'forEdit'
    };

    const onPaymentModal = (data, index, name) => {
        isEdit = false;
        setState({
            ...state,
            staffAdvanceId: data?.staffAdvanceId || "",
        });
        const reqData = {
            staffAdvanceId: data?.staffAdvanceId
        }
        dispatch(getAdvancePaymentHistoryRequest(reqData));
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
        isEditorpayment = name;
    };

    const onEditForm = (data, index, name) => {
        if (name == "forEdit") {
            setState({
                ...state,
                staffId: data?.staffId || "",
                amount: data?.amount || "",
                reason: data?.reason || "",
                branchId: data?.branchId || "",
                applyDate: data.applyDate ? dateConversion(data.applyDate, "YYYY-MM-DD") : ""
            });
        } else if (name == "forPayment") {
            setState({
                ...state,
                staffAdvanceId: data?.staffAdvanceId || "",
                paidAmount: data?.paidAmount || "",
                paidDate: data?.paidDate || "",
            });
        }
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
        isEditorpayment = name;
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            staffId: state?.staffId || "",
            branchId: state?.branchId || "",
            amount: state?.amount || "",
            reason: state?.reason || "",
            applyDate: state?.applyDate ? dateConversion(state.applyDate, "YYYY-MM-DD") : "",
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
            paidDate: state.paidDate ? dateConversion(state.paidDate, "YYYY-MM-DD") : ""
        }
        if (isEdit) {
            dispatch(updateAdvancePaymentHistoryRequest(submitRequest, selectedItem.advancePaymentHistoryId))
        } else {
            dispatch(createAdvancePaymentHistoryRequest(submitRequest))
        }
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

    // const onDeleteForm = (data, index, activeChecker) => {
    //     const submitRequest = {
    //         isActive: activeChecker == 0 ? 1 : 0
    //     }
    //     setSelectedIndex(index)
    //     dispatch(updateStaffAdvanceRequest(submitRequest, data.staffAdvanceId))
    // };

    const onDeleteFormPayment = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateAdvancePaymentHistoryRequest(submitRequest, data.advancePaymentHistoryId))
    };

    const onStatusForm = (data, index, statusId) => {
        const submitRequest = {
            statusId: statusId,
            isActive: statusId == 30 ? 0 : 1
        };
        if (statusId == 29) {
            submitRequest.approvedDate = moment().format('YYYY-MM-DD')
        }
        setSelectedIndex(index);
        dispatch(updateStaffAdvanceRequest(submitRequest, data.staffAdvanceId))
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
