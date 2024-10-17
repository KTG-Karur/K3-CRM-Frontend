import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createStaffRequest, getStaffRequest, resetCreateStaff, resetGetStaff, resetUpdateStaff, updateStaffRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getStaffSuccess, getStaffList, getStaffFailure,
        createStaffSuccess, createStaffData, createStaffFailure,
        updateStaffSuccess, updateStaffData, updateStaffFailure,
        errorMessage,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        createStaffSuccess: state.staffReducer.createStaffSuccess,
        createStaffData: state.staffReducer.createStaffData,
        createStaffFailure: state.staffReducer.createStaffFailure,

        updateStaffSuccess: state.staffReducer.updateStaffSuccess,
        updateStaffData: state.staffReducer.updateStaffData,
        updateStaffFailure: state.staffReducer.updateStaffFailure,

        errorMessage: state.staffReducer.errorMessage,
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
            Header: 'Staff Name',
            accessor: 'staffName',
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
        dispatch(getStaffRequest());
    }, []);

    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false)
            setParentList(getStaffList)
            dispatch(resetGetStaff())
        } else if (getStaffFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaff())
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (createStaffSuccess) {
            const temp_state = [createStaffData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaff())
        } else if (createStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaff())
        }
    }, [createStaffSuccess, createStaffFailure]);

    useEffect(() => {
        if (updateStaffSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaff())
        } else if (updateStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaff())
        }
    }, [updateStaffSuccess, updateStaffFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            staffName: '',
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
            staffName: data?.staffName || "",
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
            staffName: state?.staffName || ""
        }
        if (isEdit) {
            dispatch(updateStaffRequest(submitRequest, selectedItem.staffId))
        } else {
            dispatch(createStaffRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateStaffRequest(submitRequest, data.staffId))
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
                Title={'Staff List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Staff'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={staffContainer}
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
