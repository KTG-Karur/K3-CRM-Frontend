import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createTrainingTypeRequest, getTrainingTypeRequest, resetCreateTrainingType, resetGetTrainingType, resetUpdateTrainingType, updateTrainingTypeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() { 

    const { dispatch, appSelector } = useRedux();

    const { getTrainingTypeSuccess, getTrainingTypeList, getTrainingTypeFailure,
        createTrainingTypeSuccess, createTrainingTypeData, createTrainingTypeFailure,
        updateTrainingTypeSuccess, updateTrainingTypeData, updateTrainingTypeFailure,errorMessage

    } = appSelector((state) => ({
        getTrainingTypeSuccess: state.trainingTypeReducer.getTrainingTypeSuccess,
        getTrainingTypeList: state.trainingTypeReducer.getTrainingTypeList,
        getTrainingTypeFailure: state.trainingTypeReducer.getTrainingTypeFailure,

        createTrainingTypeSuccess: state.trainingTypeReducer.createTrainingTypeSuccess,
        createTrainingTypeData: state.trainingTypeReducer.createTrainingTypeData,
        createTrainingTypeFailure: state.trainingTypeReducer.createTrainingTypeFailure,

        updateTrainingTypeSuccess: state.trainingTypeReducer.updateTrainingTypeSuccess,
        updateTrainingTypeData: state.trainingTypeReducer.updateTrainingTypeData,
        updateTrainingTypeFailure: state.trainingTypeReducer.updateTrainingTypeFailure,

        errorMessage: state.trainingTypeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Training Type Name',
            accessor: 'trainingTypeName',
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
        dispatch(getTrainingTypeRequest());
    }, []);

    useEffect(() => {
        if (getTrainingTypeSuccess) {
            setIsLoading(false)
            setParentList(getTrainingTypeList)
            dispatch(resetGetTrainingType())
        } else if (getTrainingTypeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetTrainingType())
        }
    }, [getTrainingTypeSuccess, getTrainingTypeFailure]);

    useEffect(() => {
        if (createTrainingTypeSuccess) {
            const temp_state = [createTrainingTypeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateTrainingType())
        } else if (createTrainingTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateTrainingType())
        }
    }, [createTrainingTypeSuccess, createTrainingTypeFailure]);

    useEffect(() => {
        if (updateTrainingTypeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateTrainingTypeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateTrainingType())
        } else if (updateTrainingTypeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateTrainingType())
        }
    }, [updateTrainingTypeSuccess, updateTrainingTypeFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            trainingTypeName: '',
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
            trainingTypeName: data?.trainingTypeName || "",
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
            trainingTypeName: state?.trainingTypeName || ""
        }
        if (isEdit) {
            dispatch(updateTrainingTypeRequest(submitRequest, selectedItem.trainingTypeId))
        } else {
            dispatch(createTrainingTypeRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateTrainingTypeRequest(submitRequest, data.trainingTypeId))
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
                Title={'Training Type List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Training Type'}
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
