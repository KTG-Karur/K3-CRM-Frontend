import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { permissionContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createPermissionRequest, getPermissionRequest, resetCreatePermission, resetGetPermission, resetUpdatePermission, updatePermissionRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;

function Index({ userRole, userRights }) {

    const { dispatch, appSelector } = useRedux();

    const { getPermissionSuccess, getPermissionList, getPermissionFailure,
        createPermissionSuccess, createPermissionData, createPermissionFailure,
        updatePermissionSuccess, updatePermissionData, updatePermissionFailure,
        errorMessage,

    } = appSelector((state) => ({
        getPermissionSuccess: state.permissionReducer.getPermissionSuccess,
        getPermissionList: state.permissionReducer.getPermissionList,
        getPermissionFailure: state.permissionReducer.getPermissionFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createPermissionSuccess: state.permissionReducer.createPermissionSuccess,
        createPermissionData: state.permissionReducer.createPermissionData,
        createPermissionFailure: state.permissionReducer.createPermissionFailure,

        updatePermissionSuccess: state.permissionReducer.updatePermissionSuccess,
        updatePermissionData: state.permissionReducer.updatePermissionData,
        updatePermissionFailure: state.permissionReducer.updatePermissionFailure,

        errorMessage: state.permissionReducer.errorMessage,
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
            Header: 'Date',
            accessor: 'permissionDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.permissionDate, "DD-MM-YYYY")}
                    </div>
                )
            },
        },
        {
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Permission Type',
            accessor: 'permissionTypeName',
            sort: true,
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
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        staffList: [
            { staffId: 1, staffName: 'Suki' },
            { staffId: 2, staffName: 'Ragul' },
            { staffId: 3, staffName: 'Mohan' },
        ],
        permissionTypeList: [
            { permissionTypeId: 37, permissionTypeName: '1hr' },
            { permissionTypeId: 38, permissionTypeName: '2hr' },
            { permissionTypeId: 39, permissionTypeName: 'Half-Day' },
        ],
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getPermissionRequest());
    }, []);

    useEffect(() => {
        if (getPermissionSuccess) {
            setIsLoading(false)
            setParentList(getPermissionList)
            dispatch(resetGetPermission())
        } else if (getPermissionFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetPermission())
        }
    }, [getPermissionSuccess, getPermissionFailure]);

    useEffect(() => {
        if (createPermissionSuccess) {
            const temp_state = [createPermissionData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreatePermission())
        } else if (createPermissionFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreatePermission())
        }
    }, [createPermissionSuccess, createPermissionFailure]);

    useEffect(() => {
        if (updatePermissionSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updatePermissionData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdatePermission())
        } else if (updatePermissionFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdatePermission())
        }
    }, [updatePermissionSuccess, updatePermissionFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            permissionDate: '',
            staffId: '',
            permissionTypeId: '',
            reason: '',
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
            staffId: data?.staffId || "",
            reason: data?.reason || "",
            permissionTypeId: data?.permissionTypeId || "",
            permissionDate: data.permissionDate ? dateConversion(data.permissionDate, "YYYY-MM-DD") : ""
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
            staffId: state?.staffId || "",
            reason: state?.reason || "",
            permissionTypeId: state?.permissionTypeId || "",
            permissionStatusId: 28,
            permissionDate: state.permissionDate ? dateConversion(state.permissionDate, "YYYY-MM-DD") : "",
        }
        if (isEdit) {
            dispatch(updatePermissionRequest(submitRequest, selectedItem.permissionId))
        } else {
            console.log(submitRequest)
            dispatch(createPermissionRequest(submitRequest))
        }
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
                    Title={'Permission List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={isUserCanCreate || userRole === 'Admin' ? createModel : null}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Permission'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={permissionContainer}
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
