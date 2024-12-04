import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createClaimTypeRequest, getClaimTypeRequest, resetCreateClaimType, resetGetClaimType, resetUpdateClaimType, updateClaimTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() { 

    const { dispatch, appSelector } = useRedux();

    const { getClaimTypeSuccess, getClaimTypeList, getClaimTypeFailure,
        createClaimTypeSuccess, createClaimTypeData, createClaimTypeFailure,
        updateClaimTypeSuccess, updateClaimTypeData, updateClaimTypeFailure,errorMessage

    } = appSelector((state) => ({
        getClaimTypeSuccess: state.claimTypeReducer.getClaimTypeSuccess,
        getClaimTypeList: state.claimTypeReducer.getClaimTypeList,
        getClaimTypeFailure: state.claimTypeReducer.getClaimTypeFailure,

        createClaimTypeSuccess: state.claimTypeReducer.createClaimTypeSuccess,
        createClaimTypeData: state.claimTypeReducer.createClaimTypeData,
        createClaimTypeFailure: state.claimTypeReducer.createClaimTypeFailure,

        updateClaimTypeSuccess: state.claimTypeReducer.updateClaimTypeSuccess,
        updateClaimTypeData: state.claimTypeReducer.updateClaimTypeData,
        updateClaimTypeFailure: state.claimTypeReducer.updateClaimTypeFailure,

        errorMessage: state.claimTypeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Claim Type Name',
            accessor: 'claimTypeName',
            sort: true,
        },
        {
            Header: 'Eligible Claim Amount',
            accessor: 'eligibleAmount',
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
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getClaimTypeRequest());
    }, []);

    useEffect(() => {
        if (getClaimTypeSuccess) {
            setIsLoading(false)
            setParentList(getClaimTypeList)
            dispatch(resetGetClaimType())
        } else if (getClaimTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetClaimType())
        }
    }, [getClaimTypeSuccess, getClaimTypeFailure]);

    useEffect(() => {
        if (createClaimTypeSuccess) {
            const temp_state = [createClaimTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateClaimType())
        } else if (createClaimTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateClaimType())
        }
    }, [createClaimTypeSuccess, createClaimTypeFailure]);

    useEffect(() => {
        if (updateClaimTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateClaimTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateClaimType())
        } else if (updateClaimTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateClaimType())
        }
    }, [updateClaimTypeSuccess, updateClaimTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            claimTypeName: '',
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
            claimTypeName: data?.claimTypeName || "",
            eligibleAmount: data?.eligibleAmount || "",
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
            claimTypeName: state?.claimTypeName || "",
            eligibleAmount: state?.eligibleAmount || ""
        }
        if (isEdit) {
            dispatch(updateClaimTypeRequest(submitRequest, selectedItem.claimTypeId))
        } else {
            dispatch(createClaimTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateClaimTypeRequest(submitRequest, data.claimTypeId))
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
                Title={'Claim Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Claim Type'}
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
