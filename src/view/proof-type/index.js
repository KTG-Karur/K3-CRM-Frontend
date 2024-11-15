import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createProofTypeRequest, getProofTypeRequest, resetCreateProofType, resetGetProofType, resetUpdateProofType, updateProofTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index({ userRole, userRights }) { 

    const { dispatch, appSelector } = useRedux();

    const { getProofTypeSuccess, getProofTypeList, getProofTypeFailure,
        createProofTypeSuccess, createProofTypeData, createProofTypeFailure,
        updateProofTypeSuccess, updateProofTypeData, updateProofTypeFailure,errorMessage

    } = appSelector((state) => ({
        getProofTypeSuccess: state.proofTypeReducer.getProofTypeSuccess,
        getProofTypeList: state.proofTypeReducer.getProofTypeList,
        getProofTypeFailure: state.proofTypeReducer.getProofTypeFailure,

        createProofTypeSuccess: state.proofTypeReducer.createProofTypeSuccess,
        createProofTypeData: state.proofTypeReducer.createProofTypeData,
        createProofTypeFailure: state.proofTypeReducer.createProofTypeFailure,

        updateProofTypeSuccess: state.proofTypeReducer.updateProofTypeSuccess,
        updateProofTypeData: state.proofTypeReducer.updateProofTypeData,
        updateProofTypeFailure: state.proofTypeReducer.updateProofTypeFailure,

        errorMessage: state.proofTypeReducer.errorMessage,
    }));
    const isUserCanCreate = userRole === 'Staff' && userRights.master_ins;
    const isUserCanUpdate = userRole === 'Staff' && userRights.master_upd;
    const isUserCanDelete = userRole === 'Staff' && userRights.master_del;
    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'ProofType Name',
            accessor: 'proofTypeName',
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
                        {(isUserCanUpdate || userRole === 'Admin') && (
                            <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                                <i className={'fe-edit-1'}></i>
                            </span>
                        )}
                        {(isUserCanDelete || userRole === 'Admin') && (
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
                        )}
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getProofTypeRequest());
    }, []);

    useEffect(() => {
        if (getProofTypeSuccess) {
            setIsLoading(false)
            setParentList(getProofTypeList)
            dispatch(resetGetProofType())
        } else if (getProofTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetProofType())
        }
    }, [getProofTypeSuccess, getProofTypeFailure]);

    useEffect(() => {
        if (createProofTypeSuccess) {
            const temp_state = [createProofTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateProofType())
        } else if (createProofTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateProofType())
        }
    }, [createProofTypeSuccess, createProofTypeFailure]);

    useEffect(() => {
        if (updateProofTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateProofTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateProofType())
        } else if (updateProofTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateProofType())
        }
    }, [updateProofTypeSuccess, updateProofTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            proofTypeName: '',
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
            proofTypeName: data?.proofTypeName || "",
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
            proofTypeName: state?.proofTypeName || ""
        }
        if (isEdit) {
            dispatch(updateProofTypeRequest(submitRequest, selectedItem.proofTypeId))
        } else {
            dispatch(createProofTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateProofTypeRequest(submitRequest, data.proofTypeId))
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
                Title={'Proof Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={isUserCanCreate || userRole === 'Admin' ? createModel : null}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Proof Type'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    handleSubmit={onFormSubmit}
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
