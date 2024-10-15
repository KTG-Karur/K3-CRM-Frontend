import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createBankAccountRequest, getBankAccountRequest, resetCreateBankAccount, resetGetBankAccount, resetUpdateBankAccount, updateBankAccountRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getBankAccountSuccess, getBankAccountList, getBankAccountFailure,
        createBankAccountSuccess, createBankAccountData, createBankAccountFailure,
        updateBankAccountSuccess, updateBankAccountData, updateBankAccountFailure,errorMessage

    } = appSelector((state) => ({
        getBankAccountSuccess: state.bankAccountReducer.getBankAccountSuccess,
        getBankAccountList: state.bankAccountReducer.getBankAccountList,
        getBankAccountFailure: state.bankAccountReducer.getBankAccountFailure,

        createBankAccountSuccess: state.bankAccountReducer.createBankAccountSuccess,
        createBankAccountData: state.bankAccountReducer.createBankAccountData,
        createBankAccountFailure: state.bankAccountReducer.createBankAccountFailure,

        updateBankAccountSuccess: state.bankAccountReducer.updateBankAccountSuccess,
        updateBankAccountData: state.bankAccountReducer.updateBankAccountData,
        updateBankAccountFailure: state.bankAccountReducer.updateBankAccountFailure,

        errorMessage: state.bankAccountReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Holder Name',
            accessor: 'accountHolderName',
            sort: true,
        },
        {
            Header: 'Account No.',
            accessor: 'accountNo',
            sort: true,
        },
        {
            Header: 'Bank Name',
            accessor: 'bankName',
            sort: true,
        },
        {
            Header: 'Branch Name',
            accessor: 'branchName',
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

    const [state, setState] = useState({});
    const [optionListState, setOptionListState] = useState({
        // applicantList : [
        //     {
        //         "applicantId" : 1,
        //         "applicantName" : "HFC-2425-FL-0001/Aravinth",
        //     },
        //     {
        //         "applicantId" : 2,
        //         "applicantName" : "HFC-2425-FL-0001/Ragul",
        //     },
        //     {
        //         "applicantId" : 3,
        //         "applicantName" : "HFC-2425-FL-0001/Mohan",
        //     },
        //     {
        //         "applicantId" : 4,
        //         "applicantName" : "HFC-2425-FL-0001/Jeeva",
        //     },
        // ]
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getBankAccountRequest());
    }, []);

    useEffect(() => {
        if (getBankAccountSuccess) {
            setIsLoading(false)
            setParentList(getBankAccountList)
            dispatch(resetGetBankAccount())
        } else if (getBankAccountFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetBankAccount())
        }
    }, [getBankAccountSuccess, getBankAccountFailure]);

    useEffect(() => {
        if (createBankAccountSuccess) {
            const temp_state = [createBankAccountData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateBankAccount())
        } else if (createBankAccountFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateBankAccount())
        }
    }, [createBankAccountSuccess, createBankAccountFailure]);

    useEffect(() => {
        if (updateBankAccountSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateBankAccountData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateBankAccount())
        } else if (updateBankAccountFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateBankAccount())
        }
    }, [updateBankAccountSuccess, updateBankAccountFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            applicantId: '',
            accountHolderName: '',
            companyAccount: false,
            bankName: '',
            branchName: '',
            accountNo: '',
            ifscCode: ''
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
            applicantId: data?.applicantId || "",
            accountHolderName: data?.accountHolderName || "",
            companyAccount: data.companyAccount === 1 ? true : false,
            bankName: data?.bankName || "",
            branchName: data?.branchName || "",
            accountNo: data?.accountNo || "",
            ifscCode: data?.ifscCode || "",
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
             applicantId: state?.applicantId || "",
             accountHolderName: state?.accountHolderName || "",
             companyAccount: state.companyAccount ? 1 : 0,
             bankName: state?.bankName || "",
             branchName: state?.branchName || "",
             accountNo: state?.accountNo || "",
             ifscCode: state?.ifscCode || "",
        }
        if (isEdit) {
            dispatch(updateBankAccountRequest(submitRequest, selectedItem.bankAccountId))
        } else {
            dispatch(createBankAccountRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateBankAccountRequest(submitRequest, data.bankAccountId))
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
                Title={'Bank Account List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Bank Account'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    optionListState={optionListState}
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
