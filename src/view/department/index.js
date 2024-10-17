import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createDepartmentRequest, getDepartmentRequest, resetCreateDepartment, resetGetDepartment, resetUpdateDepartment, updateDepartmentRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() { 

    const { dispatch, appSelector } = useRedux();

    const { getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        createDepartmentSuccess, createDepartmentData, createDepartmentFailure,
        updateDepartmentSuccess, updateDepartmentData, updateDepartmentFailure,errorMessage

    } = appSelector((state) => ({
        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        createDepartmentSuccess: state.departmentReducer.createDepartmentSuccess,
        createDepartmentData: state.departmentReducer.createDepartmentData,
        createDepartmentFailure: state.departmentReducer.createDepartmentFailure,

        updateDepartmentSuccess: state.departmentReducer.updateDepartmentSuccess,
        updateDepartmentData: state.departmentReducer.updateDepartmentData,
        updateDepartmentFailure: state.departmentReducer.updateDepartmentFailure,

        errorMessage: state.departmentReducer.errorMessage,
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
        dispatch(getDepartmentRequest());
    }, []);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false)
            setParentList(getDepartmentList)
            dispatch(resetGetDepartment())
        } else if (getDepartmentFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetDepartment())
        }
    }, [getDepartmentSuccess, getDepartmentFailure]);

    useEffect(() => {
        if (createDepartmentSuccess) {
            const temp_state = [createDepartmentData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateDepartment())
        } else if (createDepartmentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDepartment())
        }
    }, [createDepartmentSuccess, createDepartmentFailure]);

    useEffect(() => {
        if (updateDepartmentSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateDepartmentData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateDepartment())
        } else if (updateDepartmentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateDepartment())
        }
    }, [updateDepartmentSuccess, updateDepartmentFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            departmentName: '',
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
            departmentName: data?.departmentName || "",
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
            departmentName: state?.departmentName || ""
        }
        if (isEdit) {
            dispatch(updateDepartmentRequest(submitRequest, selectedItem.departmentId))
        } else {
            dispatch(createDepartmentRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateDepartmentRequest(submitRequest, data.departmentId))
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
                Title={'Department List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Department'}
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
