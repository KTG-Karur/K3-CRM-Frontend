import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createActivityRequest, getActivityRequest, resetCreateActivity, resetGetActivity, resetUpdateActivity, updateActivityRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index({ userRole, userRights }) {

    const { dispatch, appSelector } = useRedux();

    const { getActivitySuccess, getActivityList, getActivityFailure,
        createActivitySuccess, createActivityData, createActivityFailure,
        updateActivitySuccess, updateActivityData, updateActivityFailure, errorMessage

    } = appSelector((state) => ({
        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createActivitySuccess: state.activityReducer.createActivitySuccess,
        createActivityData: state.activityReducer.createActivityData,
        createActivityFailure: state.activityReducer.createActivityFailure,

        updateActivitySuccess: state.activityReducer.updateActivitySuccess,
        updateActivityData: state.activityReducer.updateActivityData,
        updateActivityFailure: state.activityReducer.updateActivityFailure,

        errorMessage: state.activityReducer.errorMessage,
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
            Header: 'Activity Name',
            accessor: 'activityName',
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
        dispatch(getActivityRequest());
    }, []);

    useEffect(() => {
        if (getActivitySuccess) {
            setIsLoading(false)
            setParentList(getActivityList)
            dispatch(resetGetActivity())
        } else if (getActivityFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetActivity())
        }
    }, [getActivitySuccess, getActivityFailure]);

    useEffect(() => {
        if (createActivitySuccess) {
            const temp_state = [createActivityData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateActivity())
        } else if (createActivityFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateActivity())
        }
    }, [createActivitySuccess, createActivityFailure]);

    useEffect(() => {
        if (updateActivitySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateActivityData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateActivity())
        } else if (updateActivityFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateActivity())
        }
    }, [updateActivitySuccess, updateActivityFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            activityName: '',
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
            activityName: data?.activityName || "",
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
            activityName: state?.activityName || ""
        }
        if (isEdit) {
            dispatch(updateActivityRequest(submitRequest, selectedItem.activityId))
        } else {
            dispatch(createActivityRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateActivityRequest(submitRequest, data.activityId))
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
                    Title={'Activity List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={isUserCanCreate || userRole === 'Admin' ? createModel : null}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Activity'}
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
