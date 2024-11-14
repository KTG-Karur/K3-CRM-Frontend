import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { petrolAllowanceContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createPetrolAllowanceRequest, getActivityRequest, getStaffRequest, getPetrolAllowanceRequest, resetCreatePetrolAllowance, resetGetActivity, resetGetStaff, resetGetPetrolAllowance, resetUpdatePetrolAllowance, updatePetrolAllowanceRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getPetrolAllowanceSuccess, getPetrolAllowanceList, getPetrolAllowanceFailure,
        getActivitySuccess, getActivityList, getActivityFailure,
        createPetrolAllowanceSuccess, createPetrolAllowanceData, createPetrolAllowanceFailure,
        updatePetrolAllowanceSuccess, updatePetrolAllowanceData, updatePetrolAllowanceFailure,
        errorMessage,getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getPetrolAllowanceSuccess: state.petrolAllowanceReducer.getPetrolAllowanceSuccess,
        getPetrolAllowanceList: state.petrolAllowanceReducer.getPetrolAllowanceList,
        getPetrolAllowanceFailure: state.petrolAllowanceReducer.getPetrolAllowanceFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createPetrolAllowanceSuccess: state.petrolAllowanceReducer.createPetrolAllowanceSuccess,
        createPetrolAllowanceData: state.petrolAllowanceReducer.createPetrolAllowanceData,
        createPetrolAllowanceFailure: state.petrolAllowanceReducer.createPetrolAllowanceFailure,

        updatePetrolAllowanceSuccess: state.petrolAllowanceReducer.updatePetrolAllowanceSuccess,
        updatePetrolAllowanceData: state.petrolAllowanceReducer.updatePetrolAllowanceData,
        updatePetrolAllowanceFailure: state.petrolAllowanceReducer.updatePetrolAllowanceFailure,

        errorMessage: state.petrolAllowanceReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'allowanceDate',
            Cell: ({ row }) => {
                return (
                    <div>
                       {dateConversion(row.original.allowanceDate, "DD-MM-YYYY") }
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
            Header: 'From',
            accessor: 'fromPlace',
            sort: true,
        },
        {
            Header: 'To',
            accessor: 'toPlace',
            sort: true,
        },
        {
            Header: 'Activity',
            accessor: 'activityName',
            sort: true,
        },
        // {
        //     Header: 'Total Km',
        //     accessor: 'totalKm',
        //     sort: true,
        // },
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
    const [optionListState, setOptionListState] = useState({
        staffList: [],
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStaffRequest());
        const getReq={
            isActive : 1
        }
        dispatch(getPetrolAllowanceRequest(getReq));
        dispatch(getActivityRequest(getReq));
    }, []);

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
        if (getPetrolAllowanceSuccess) {
            setIsLoading(false)
            setParentList(getPetrolAllowanceList)
            dispatch(resetGetPetrolAllowance())
        } else if (getPetrolAllowanceFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetPetrolAllowance())
        }
    }, [getPetrolAllowanceSuccess, getPetrolAllowanceFailure]);

    useEffect(() => {
        if (getActivitySuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                activityList : getActivityList
            })
            dispatch(resetGetActivity())
        } else if (getActivityFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                activityList : []
            })
            dispatch(resetGetActivity())
        }
    }, [getActivitySuccess, getActivityFailure]);

    useEffect(() => {
        if (createPetrolAllowanceSuccess) {
            const temp_state = [createPetrolAllowanceData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreatePetrolAllowance())
        } else if (createPetrolAllowanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreatePetrolAllowance())
        }
    }, [createPetrolAllowanceSuccess, createPetrolAllowanceFailure]);

    useEffect(() => {
        if (updatePetrolAllowanceSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updatePetrolAllowanceData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdatePetrolAllowance())
        } else if (updatePetrolAllowanceFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdatePetrolAllowance())
        }
    }, [updatePetrolAllowanceSuccess, updatePetrolAllowanceFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            allowanceDate: '',
            staffId: '',
            activityIds: '',
            fromPlace: '',
            toPlace: '',
            totalKm: '',
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
            activityIds: data.activityId ? _.map(_.split(data.activityId, ','), _.toNumber) : "",
            fromPlace: data?.fromPlace || "",
            toPlace: data?.toPlace || "",
            totalKm: data?.totalKm || "",
            allowanceDate: data.allowanceDate ? dateConversion(data.allowanceDate, "YYYY-MM-DD") : ""
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
            activityId: state.activityIds ? state.activityIds.toString() : "",
            fromPlace: state?.fromPlace || "",
            toPlace: state?.toPlace || "",
            totalKm: state?.totalKm || "",
            allowanceDate: state.allowanceDate ? dateConversion(state.allowanceDate, "YYYY-MM-DD") : "",
        }
        if (isEdit) {
            dispatch(updatePetrolAllowanceRequest(submitRequest, selectedItem.petrolAllowanceId))
        } else {
            console.log(submitRequest)
            dispatch(createPetrolAllowanceRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updatePetrolAllowanceRequest(submitRequest, data.petrolAllowanceId))
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
                Title={'Visit Entry List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Visit Entry'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={petrolAllowanceContainer}
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
