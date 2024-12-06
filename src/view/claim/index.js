import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { approvedFormContainer, employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createClaimRequest, getBranchRequest, getStaffRequest, getClaimRequest, getClaimTypeRequest, resetCreateClaim, resetGetBranch, resetGetClaim, resetGetStaff, resetGetClaimType, resetUpdateClaim, updateClaimRequest, getBankAccountRequest, resetGetBankAccount } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { createUploadImagesRequest } from '../../redux/uploads/actions';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { getBankAccountSuccess, getBankAccountList, getBankAccountFailure,
        getClaimSuccess, getClaimList, getClaimFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getClaimTypeSuccess, getClaimTypeList, getClaimTypeFailure,
        createClaimSuccess, createClaimData, createClaimFailure,
        updateClaimSuccess, updateClaimData, updateClaimFailure, errorMessage, getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getBankAccountSuccess: state.bankAccountReducer.getBankAccountSuccess,
        getBankAccountList: state.bankAccountReducer.getBankAccountList,
        getBankAccountFailure: state.bankAccountReducer.getBankAccountFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getClaimSuccess: state.claimReducer.getClaimSuccess,
        getClaimList: state.claimReducer.getClaimList,
        getClaimFailure: state.claimReducer.getClaimFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getClaimTypeSuccess: state.claimTypeReducer.getClaimTypeSuccess,
        getClaimTypeList: state.claimTypeReducer.getClaimTypeList,
        getClaimTypeFailure: state.claimTypeReducer.getClaimTypeFailure,

        createClaimSuccess: state.claimReducer.createClaimSuccess,
        createClaimData: state.claimReducer.createClaimData,
        createClaimFailure: state.claimReducer.createClaimFailure,

        updateClaimSuccess: state.claimReducer.updateClaimSuccess,
        updateClaimData: state.claimReducer.updateClaimData,
        updateClaimFailure: state.claimReducer.updateClaimFailure,

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
                        {row.original.statusId === 28 && (
                            <span>
                                <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                                    <i className={'fe-edit-1'}></i>
                                </span>

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
                                    className={`text-danger cursor-pointer me-2`}
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
                            <span className="text-danger  me-2 cursor-pointer" onClick={() => onApprovedClaim(row.original, row.index)}>
                                <i className={'fe-file-text'}></i>
                            </span>
                        }
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
        applyDate: moment().format("YYYY-MM-DD"),
        modeOfPaymentId: 5,
        uploadImage: []
    });
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        paymentModeList: [
            {
                paymentModeId: 5,
                paymentModeName: 'Cash'
            },
            {
                paymentModeId: 6,
                paymentModeName: 'Neft'
            },
        ],
        bankAccountList: [],
        claimTypeList: []
    })
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [approvedModal, setApprovedModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [claimContainer, setClaimContainer] = useState(employeeFormContainer);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getClaimRequest());
        // dispatch(getStaffRequest());
        dispatch(getBranchRequest());
        dispatch(getClaimTypeRequest());
        dispatch(getBankAccountRequest());
    }, []);

    useEffect(() => {
        if (getBankAccountSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                bankAccountList: getBankAccountList,
            });
            dispatch(resetGetBankAccount())
        } else if (getBankAccountFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                bankAccountList: [],
            });
            dispatch(resetGetBankAccount())
        }
    }, [getBankAccountSuccess, getBankAccountFailure]);

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

    useEffect(() => {
        if (getClaimTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                claimTypeList: getClaimTypeList
            })
            dispatch(resetGetClaimType())
        } else if (getClaimTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                claimTypeList: []
            })
            dispatch(resetGetClaimType())
        }
    }, [getClaimTypeSuccess, getClaimTypeFailure]);

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
        if (createClaimSuccess) {
            const temp_state = [createClaimData[0], ...parentList];
            setParentList(temp_state)
            if (state.uploadImage.length > 0) {
                const formData = new FormData();
                const originalFile = state.uploadImage[0];
                const renamedFile = new File(
                    [originalFile],
                    `Claim-${createClaimData[0].requestedBy}-${createClaimData[0].claimId}-${originalFile.name}`,
                    {
                        type: originalFile.type,
                        lastModified: originalFile.lastModified,
                    }
                );
                formData.append('claimProof', renamedFile);
                dispatch(createUploadImagesRequest(formData, createClaimData[0].claimId))
            }
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateClaim())
        } else if (createClaimFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateClaim())
        }
    }, [createClaimSuccess, createClaimFailure]);

    useEffect(() => {
        if (updateClaimSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateClaimData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateClaim())
        } else if (updateClaimFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateClaim())
        }
    }, [updateClaimSuccess, updateClaimFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
        setApprovedModal(false)
    }

    const onPrintDesign = (data) => {
        navigate('/birthday-claim-report', { state: data });
    }

    const onApprovedClaim = (data, index) => {
        console.log("onApprovedClaim")
        console.log(data)
        setState({
            ...state,
            approvedDate: moment().format("YYYY-MM-DD"),
            claimAmount: data?.claimAmount || data?.requestedAmount,
            claimTypeName: data?.claimTypeName,
            eligibleAmount: data?.eligibleAmount,
        })
        setSelectedItem(data)
        setSelectedIndex(index)
        setApprovedModal(true)
    }

    const onFormClear = () => {
        setState({
            ...state,
            modeOfPaymentId: 5,
            applyDate: moment().format("YYYY-MM-DD"),
            branchId: "",
            requestedBy: "",
            claimTypeId: "",
            requestedAmount: "",
            reason: "",
            claimAmount: "",
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)

        const updatedTabList = _.cloneDeep(employeeFormContainer);
        const changedArr = [
            {
                label: 'Bank Account',
                name: 'bankAccountId',
                inputType: 'select',
                optionList: 'bankAccountList',
                displayKey: 'bankAndBranch',
                uniqueKey: 'bankAccountId',
                'classStyle': 'col-6'
            },
        ]
        updatedTabList[0].formFields = _.reject(
            updatedTabList[0].formFields,
            (field) => _.some(changedArr, { name: field.name })
        );
        setClaimContainer(updatedTabList);
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            modeOfPaymentId: data?.modeOfPaymentId || "",
            applyDate: data?.applyDate || "",
            branchId: data?.branchId || "",
            requestedBy: data?.requestedById || "",
            claimTypeId: data?.claimTypeId || "",
            requestedAmount: data?.requestedAmount || "",
            reason: data?.reason || "",
            bankAccountId: data?.bankAccountId || "",
            modeOfPaymentId: data?.modeOfPaymentId || ""
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
        // const paymentModeId = {
        //     paymentModeId: data?.modeOfPaymentId
        // }
        // onPaymentMode(paymentModeId, "modeOfPaymentId");

        const updatedTabList = _.cloneDeep(employeeFormContainer);
        const changedArr = [
            {
                label: 'Bank Account',
                name: 'bankAccountId',
                inputType: 'select',
                optionList: 'bankAccountList',
                displayKey: 'bankAndBranch',
                uniqueKey: 'bankAccountId',
                'classStyle': 'col-6'
            },
        ]
        if (data?.modeOfPaymentId == 6) {
            updatedTabList[0].formFields = _.concat(
                _.slice(updatedTabList[0].formFields, 0, 2),
                changedArr,
                _.slice(updatedTabList[0].formFields, 2),
            );
        } else {
            updatedTabList[0].formFields = _.reject(
                updatedTabList[0].formFields,
                (field) => _.some(changedArr, { name: field.name })
            );
        }
        setClaimContainer(updatedTabList);
        const branchFilter = {
            branchId: data?.branchId
        }
        dispatch(getStaffRequest(branchFilter));
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            applyDate: state.applyDate ? dateConversion(state.applyDate, "YYYY-MM-DD") : "",
            branchId: state?.branchId || "",
            requestedBy: state?.requestedBy || "",
            claimTypeId: state?.claimTypeId || "",
            requestedAmount: state?.requestedAmount || "",
            reason: state?.reason || "",
            modeOfPaymentId: state?.modeOfPaymentId || "",
            bankAccountId: state?.modeOfPaymentId == 5 ? '' : state.bankAccountId
        }
        // console.log("submitRequest");
        // console.log(submitRequest);
        // return;
        if (isEdit) {
            dispatch(updateClaimRequest(submitRequest, selectedItem.claimId))
        } else {
            dispatch(createClaimRequest(submitRequest))
        }
    };

    const onApprovedFormSubmit = () => {
        const submitRequest = {
            approvedDate: state.approvedDate ? dateConversion(state.approvedDate, "YYYY-MM-DD") : "",
            claimAmount: state?.claimAmount || "",
            claimStatus: 29,
            approvedBy: 1
        }
        dispatch(updateClaimRequest(submitRequest, selectedItem.claimId))
    }

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateClaimRequest(submitRequest, data.claimId))
    };

    const onPaymentMode = (event, formName) => {
        setState({
            ...state,
            [formName]: event.paymentModeId,
            bankAccountId: event.paymentModeId == 5 ? '' : state.bankAccountId
        })
        const updatedTabList = _.cloneDeep(employeeFormContainer);
        const changedArr = [
            {
                label: 'Bank Account',
                name: 'bankAccountId',
                inputType: 'select',
                optionList: 'bankAccountList',
                displayKey: 'bankAndBranch',
                uniqueKey: 'bankAccountId',
                'classStyle': 'col-6'
            },
        ]
        if (event.paymentModeId == 6) {
            updatedTabList[0].formFields = _.concat(
                _.slice(updatedTabList[0].formFields, 0, 2),
                changedArr,
                _.slice(updatedTabList[0].formFields, 2),
            );
        } else {
            updatedTabList[0].formFields = _.reject(
                updatedTabList[0].formFields,
                (field) => _.some(changedArr, { name: field.name })
            );
        }
        setClaimContainer(updatedTabList);
    }

    const onStatusForm = (data, index, statusId) => {
        const submitRequest = {
            statusId: statusId,
        };
        setSelectedIndex(index);
        dispatch(updateClaimRequest(submitRequest, data.claimId))
    };

    const onBranchChange = async (option, formName, formUniqueKey, formDisplayKey) => {
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
                    Title={'Claim List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Claim'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={claimContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "onPaymentMode": onPaymentMode, "onBranchChange": onBranchChange }}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>

            <ModelViewBox
                modal={approvedModal}
                setModel={setApprovedModal}
                modelHeader={'Approved Claim'}
                modelHead={'true'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={approvedFormContainer}
                    handleSubmit={onApprovedFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
