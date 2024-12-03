import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createRoleRequest, getRolePermissionRequest, getRoleRequest, resetCreateRole, resetGetRole, resetGetRolePermission, resetUpdateRole, updateRoleRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import RoleTreeView from '../../components/Atom/RoleTreeView';
import { pagesList } from '../../utils/pagesList';
import _ from 'lodash';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { 
        getRoleSuccess, getRoleList, getRoleFailure,
        getRolePermissionSuccess, getRolePermissionList, getRolePermissionFailure,
        createRoleSuccess, createRoleData, createRoleFailure,
        updateRoleSuccess, updateRoleData, updateRoleFailure,errorMessage

    } = appSelector((state) => ({
        getRoleSuccess: state.roleReducer.getRoleSuccess,
        getRoleList: state.roleReducer.getRoleList,
        getRoleFailure: state.roleReducer.getRoleFailure,

        getRolePermissionSuccess: state.rolePermissionReducer.getRolePermissionSuccess,
        getRolePermissionList: state.rolePermissionReducer.getRolePermissionList,
        getRolePermissionFailure: state.rolePermissionReducer.getRolePermissionFailure,

        createRoleSuccess: state.roleReducer.createRoleSuccess,
        createRoleData: state.roleReducer.createRoleData,
        createRoleFailure: state.roleReducer.createRoleFailure,

        updateRoleSuccess: state.roleReducer.updateRoleSuccess,
        updateRoleData: state.roleReducer.updateRoleData,
        updateRoleFailure: state.roleReducer.updateRoleFailure,

        errorMessage: state.roleReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Role Name',
            accessor: 'roleName',
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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => rolePermissionCall(row.original, row.index)}>
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
    const [checkboxListData, setCheckboxListData] = useState(pagesList);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getRoleRequest());
    }, []);

    useEffect(() => {
        if (getRoleSuccess) {
            setIsLoading(false)
            setParentList(getRoleList)
            dispatch(resetGetRole())
        } else if (getRoleFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetRole())
        }
    }, [getRoleSuccess, getRoleFailure]);

    useEffect(() => {
        if (getRolePermissionSuccess) {
            onEditForm(getRolePermissionList)
            dispatch(resetGetRolePermission())
        } else if (getRolePermissionFailure) {
            dispatch(resetGetRolePermission())
            showMessage('warning', 'Something went Wrong...!')
        }
    }, [getRolePermissionSuccess, getRolePermissionFailure]);

    useEffect(() => {
        if (createRoleSuccess) {
            const temp_state = [createRoleData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateRole())
        } else if (createRoleFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateRole())
        }
    }, [createRoleSuccess, createRoleFailure]);

    useEffect(() => {
        if (updateRoleSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateRoleData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateRole())
        } else if (updateRoleFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateRole())
        }
    }, [updateRoleSuccess, updateRoleFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            roleName: '',
        });
    };

    const createModel = () => {
        onFormClear()
        setCheckboxListData(JSON.parse(JSON.stringify(pagesList)))
        isEdit = false;
        setModal(true)
    };

    const rolePermissionCall = (data, index)=>{
        const req={
            roleId : data.roleId
        }
        dispatch(getRolePermissionRequest(req));
        setSelectedItem(data)
        setSelectedIndex(index)
    }
    const onEditForm = (data) => {
        const pagesListData = JSON.parse(JSON.stringify(pagesList))
        const selectedIds = JSON.parse(data[0].accessIds)
        pagesListData.map((item)=>{
            const selectedId = item.id
            console.log(selectedId)
            const page = _.find(selectedIds.access, { selectedId });
            console.log(page)
        })
        setState({
            ...state,
            roleName: data[0]?.roleName || "",
        });
        isEdit = true;
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        let selectedData = []
        checkboxListData.map((item,index)=>{
            const childrenData = item.children
            let tempArr = []
            const accessPermission = childrenData.map((data) => {
                if(data.state === 1){
                    tempArr.push(data.extraKey)
                }
            });
            if(tempArr.length > 0){
                const filterData = [
                    {
                        pageId : item.id,
                        accessPermission : tempArr
                    }
                ]
                selectedData = [...selectedData, ...filterData];
            }
        })

        if(selectedData.length > 0){
            const submitRequest = {
                roleName: state?.roleName || "",
                accessIds : JSON.stringify({"access" : selectedData})
            }
            if (isEdit) {
                dispatch(updateRoleRequest(submitRequest, selectedItem.roleId))
            } else {
                dispatch(createRoleRequest(submitRequest))
            }
        }else{
            showMessage('warning', 'Please Select Pages or Permission');
            return false;
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateRoleRequest(submitRequest, data.roleId))
    };

    return (
        <React.Fragment>
        <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <div>
                <Table
                columns={columns}
                Title={'Role List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />
            </div>
            }

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Role'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={formContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
                <RoleTreeView data={checkboxListData} />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
