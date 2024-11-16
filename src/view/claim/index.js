import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { approvedFormContainer, employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createClaimRequest, getBranchRequest,getStaffRequest, getClaimRequest, getClaimTypeRequest, resetCreateClaim, resetGetBranch, resetGetClaim,resetGetStaff, resetGetClaimType, resetUpdateClaim, updateClaimRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() { 

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { getClaimSuccess, getClaimList, getClaimFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getClaimTypeSuccess, getClaimTypeList, getClaimTypeFailure,
        createClaimSuccess, createClaimData, createClaimFailure,
        updateClaimSuccess, updateClaimData, updateClaimFailure,errorMessage,getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
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
            Header: 'Branch Name',
            accessor: 'branchName',
            sort: true,
        },
        {
            Header: 'Requested By',
            accessor: 'requestedBy',
            sort: true,
        },
        {
            Header: 'Claim Type',
            accessor: 'claimTypeName',
            sort: true,
        },
        {
            Header: 'Requested Amount',
            accessor: 'requestedAmount',
            sort: true,
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onApprovedClaim(row.original, row.index)}>
                            <i className={'fe-check-circle'}></i>
                        </span>
                    </div>
                    
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        paymentModeList:[
          {  
            paymentModeId : 5,
            paymentModeName : 'Cash'
          },
          {  
            paymentModeId : 6,
            paymentModeName : 'Neft'
          },
        ]
    })
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [approvedModal, setApprovedModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getClaimRequest());
        dispatch(getStaffRequest());
        const req={
            isActive : 1
        }
        dispatch(getBranchRequest(req));
        dispatch(getClaimTypeRequest(req));
    }, []);

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
                claimTypeList : getClaimTypeList
            })
            dispatch(resetGetClaimType())
        } else if (getClaimTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                claimTypeList : []
            })
            dispatch(resetGetClaimType())
        }
    }, [getClaimTypeSuccess, getClaimTypeFailure]);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList : getBranchList
            })
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList : []
            })
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);

    useEffect(() => {
        if (createClaimSuccess) {
            const temp_state = [createClaimData[0], ...parentList];
            setParentList(temp_state)
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
            approvedModal && navigate('/claim-approved', { state: { data: updateClaimData[0] } });
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

    const onApprovedClaim = (data, index)=>{
        setState({
            ...state,
            approvedDate : moment().format("YYYY-MM-DD"),
            claimAmount : ""
        })
        setSelectedItem(data)
        setSelectedIndex(index)
        setApprovedModal(true)
        // navigate('/claim-approved', { state: { data: data } });

    }

    const onFormClear = () => {
        setState({
            ...state,
            applyDate: "",
            branchId:  "",
            requestedBy: "",
            claimTypeId: "",
            requestedAmount: "",
            reason: "",
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
            modeOfPaymentId: data?.modeOfPaymentId || "",
            applyDate: data?.applyDate || "",
            branchId: data?.branchId || "",
            requestedBy: data?.requestedById || "",
            claimTypeId: data?.claimTypeId || "",
            requestedAmount: data?.requestedAmount || "",
            reason: data?.reason || "",
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
            applyDate: state.applyDate ? dateConversion(state.applyDate, "YYYY-MM-DD") : "",
            branchId: state?.branchId || "",
            requestedBy: state?.requestedBy || "",
            claimTypeId: state?.claimTypeId || "",
            requestedAmount: state?.requestedAmount || "",
            reason: state?.reason || "",
            modeOfPaymentId: state?.modeOfPaymentId || "",
            claimStatus: 28
        }
        if (isEdit) {
            dispatch(updateClaimRequest(submitRequest, selectedItem.claimId))
        } else {
            dispatch(createClaimRequest(submitRequest))
        }
    };

    const onApprovedFormSubmit = ()=>{
        const submitRequest = {
            approvedDate: state.approvedDate ? dateConversion(state.approvedDate, "YYYY-MM-DD") : "",
            claimAmount: state?.claimAmount || "",
            claimStatus: 29,
            approvedBy : 1
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

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
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
                    dynamicForm={employeeFormContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
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
