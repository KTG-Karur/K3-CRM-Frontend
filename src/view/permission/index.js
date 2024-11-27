import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { permissionContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createPermissionRequest, getStaffRequest, getPermissionRequest, resetCreatePermission, resetGetPermission, resetUpdatePermission, resetGetStaff, updatePermissionRequest, resetGetBranch, getBranchRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import moment from 'moment';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getBranchSuccess, getBranchList, getBranchFailure,
        getPermissionSuccess, getPermissionList, getPermissionFailure,
        createPermissionSuccess, createPermissionData, createPermissionFailure,
        updatePermissionSuccess, updatePermissionData, updatePermissionFailure,
        errorMessage, getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

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
            Header: 'Status',
            accessor: 'statusId',
            Cell: ({ row }) => (
                <Badge
                    bg={
                        row.original.statusId === 30
                            ? 'danger'
                            : row.original.statusId === 28
                                ? 'primary'
                                : 'success'
                    }>
                    {row.original.statusId === 30
                        ? 'Cancelled'
                        : row.original.statusId === 28
                            ? 'Request'
                            : 'Approved'}
                </Badge>
            ),
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                return (
                    <div>
                        {row.original.statusId === 28 && (
                            <span>
                                <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                                    <i className={'fe-edit-1'}></i>
                                </span>


                                <span
                                    className={`text-success me-2 cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Approved?',
                                            () => onStatusForm(row.original, row.index, 29),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-up'}></i>
                                </span>
                                <span
                                    className={`text-danger cursor-pointer`}
                                    onClick={() =>
                                        showConfirmationDialog(
                                            'You want to Cancelled?',
                                            () => onStatusForm(row.original, row.index, 30),
                                            'Yes'
                                        )
                                    }>
                                    <i className={'fe-thumbs-down'}></i>
                                </span>
                            </span>
                        )}
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({
        permissionDate: moment().format("YYYY-MM-DD"),
    });
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        staffList: [],
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
        // dispatch(getStaffRequest());
        dispatch(getBranchRequest());
    }, []);


    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: getBranchList
            })
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                branchList: [],
            })
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);

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
            permissionDate: moment().format("YYYY-MM-DD"),
            staffId: '',
            branchId: '',
            permissionTypeId: '',
            reason: '',
        });
        setOptionListState({
            ...optionListState,
            staffList: [],
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
            branchId: data?.staffBranchId || "",
            permissionTypeId: data?.permissionTypeId || "",
            permissionDate: data.permissionDate ? dateConversion(data.permissionDate, "YYYY-MM-DD") : ""
        });
        const branchFilter = {
            branchId: data?.staffBranchId
        }
        dispatch(getStaffRequest(branchFilter));
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
            dispatch(createPermissionRequest(submitRequest))
        }
    };

    const onBranchChange = async (option, formName, formUniqueKey, formDisplayKey) => {
        const branchFilter = {
            branchId: option[formUniqueKey]
        }
        setState({
            ...state,
            [formName]: option[formUniqueKey]
        })

        dispatch(getStaffRequest(branchFilter));
    }

    const onStatusForm = (data, index, activeChecker) => {
        const submitRequest = {
            statusId: activeChecker,
            isActive: activeChecker == 30 ? 0 : 1,
        };
        setSelectedIndex(index);
        dispatch(updatePermissionRequest(submitRequest, data.permissionId));
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
                    toggle={createModel}
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
                    onChangeCallBack={{ "onBranchChange": onBranchChange }}
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
