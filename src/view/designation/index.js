import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { designationContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDesignationRequest, getDesignationRequest,resetGetDepartment, getDepartmentRequest, resetCreateDesignation, resetGetDesignation, resetUpdateDesignation, updateDesignationRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getDepartmentSuccess, getDepartmentList, getDepartmentFailure,getDesignationSuccess, getDesignationList, getDesignationFailure, createDesignationSuccess, createDesignationData, createDesignationFailure, updateDesignationSuccess, updateDesignationData, updateDesignationFailure,
        errorMessage,

    } = appSelector((state) => ({
        getDesignationSuccess: state.designationReducer.getDesignationSuccess,
        getDesignationList: state.designationReducer.getDesignationList,
        getDesignationFailure: state.designationReducer.getDesignationFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,        

        createDesignationSuccess: state.designationReducer.createDesignationSuccess,
        createDesignationData: state.designationReducer.createDesignationData,
        createDesignationFailure: state.designationReducer.createDesignationFailure,

        updateDesignationSuccess: state.designationReducer.updateDesignationSuccess,
        updateDesignationData: state.designationReducer.updateDesignationData,
        updateDesignationFailure: state.designationReducer.updateDesignationFailure,

        errorMessage: state.designationReducer.errorMessage,
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
            Header: 'Designation Name',
            accessor: 'designationName',
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
    const [optionListState, setOptionListState] = useState({
        
        departmentList: [],
    })

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getDesignationRequest());
        dispatch(getDepartmentRequest());
    }, []);

    useEffect(() => {
        if (getDesignationSuccess) {
            setIsLoading(false)
            setParentList(getDesignationList)
            dispatch(resetGetDesignation())
        } else if (getDesignationFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDesignation())
        }
    }, [getDesignationSuccess, getDesignationFailure]);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false)
            // console.log(getDepartmentList)
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
        if (createDesignationSuccess) {
            const temp_state = [createDesignationData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDesignation())
        } else if (createDesignationFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDesignation())
        }
    }, [createDesignationSuccess, createDesignationFailure]);

    useEffect(() => {
        if (updateDesignationSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDesignationData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDesignation())
        } else if (updateDesignationFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDesignation())
        }
    }, [updateDesignationSuccess, updateDesignationFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            designationName: '',
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
            designationName: data?.designationName || "",
            departmentId: data?.departmentId || "",
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
            designationName: state?.designationName || "",
            departmentId: state?.departmentId || ""
        }
        if (isEdit) {
            dispatch(updateDesignationRequest(submitRequest, selectedItem.designationId))
        } else {
            dispatch(createDesignationRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDesignationRequest(submitRequest, data.designationId))
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
                Title={'Designation List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Designation'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={designationContainer}
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
        </React.Fragment>
    );
}

export default Index;
