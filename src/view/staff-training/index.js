import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffTrainingContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, deleteData, noOfDayCount, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createStaffTrainingRequest, getStaffTrainingRequest, getStaffRequest, resetCreateStaffTraining, resetGetStaffTraining, resetUpdateStaffTraining, resetGetBranch, resetGetStaff, updateStaffTrainingRequest, getBranchRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const { getStaffTrainingSuccess, getStaffTrainingList, getStaffTrainingFailure,
        createStaffTrainingSuccess, createStaffTrainingData, createStaffTrainingFailure,
        updateStaffTrainingSuccess, updateStaffTrainingData, updateStaffTrainingFailure,
        errorMessage, getBranchFailure, getBranchList, getBranchSuccess, getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getStaffTrainingSuccess: state.staffTrainingReducer.getStaffTrainingSuccess,
        getStaffTrainingList: state.staffTrainingReducer.getStaffTrainingList,
        getStaffTrainingFailure: state.staffTrainingReducer.getStaffTrainingFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        createStaffTrainingSuccess: state.staffTrainingReducer.createStaffTrainingSuccess,
        createStaffTrainingData: state.staffTrainingReducer.createStaffTrainingData,
        createStaffTrainingFailure: state.staffTrainingReducer.createStaffTrainingFailure,

        updateStaffTrainingSuccess: state.staffTrainingReducer.updateStaffTrainingSuccess,
        updateStaffTrainingData: state.staffTrainingReducer.updateStaffTrainingData,
        updateStaffTrainingFailure: state.staffTrainingReducer.updateStaffTrainingFailure,

        errorMessage: state.staffTrainingReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Date',
            accessor: 'staffTrainingDate',
            Cell: ({ row }) => {
                return (
                    <div>
                        {dateConversion(row.original.staffTrainingDate, "DD-MM-YYYY")}
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
            accessor: 'fromPlaceName',
            sort: true,
        },
        {
            Header: 'To',
            accessor: 'toPlaceName',
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

                        {
                            row.original.statusId == 29 && (
                                <div>
                                    <span className="text-success  me-2 cursor-pointer"
                                        onClick={() => navigate('/staffTraining-report', { state: row.original })}>
                                        <i className={'fe-printer'} style={{ fontSize: '19px' }}></i>
                                    </span>
                                </div>
                            )
                        }
                    </div >
                );
            },
        },
    ];

    const [state, setState] = useState({
        staffTrainingDate: moment().format("YYYY-MM-DD"),
        minmumFrom: moment().format("YYYY-MM-DD"),
        minmumTo: moment().format("YYYY-MM-DD"),
    });

    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        staffList: [],
        branchList: [],
        branchListTo: [],
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        // dispatch(getStaffRequest());
        dispatch(getStaffTrainingRequest());
        dispatch(getBranchRequest());
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
        if (getStaffTrainingSuccess) {
            setIsLoading(false)
            setParentList(getStaffTrainingList)
            dispatch(resetGetStaffTraining())
        } else if (getStaffTrainingFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaffTraining())
        }
    }, [getStaffTrainingSuccess, getStaffTrainingFailure]);

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
                branchList: []
            })
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);

    useEffect(() => {
        if (createStaffTrainingSuccess) {
            const temp_state = [createStaffTrainingData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaffTraining())
        } else if (createStaffTrainingFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffTraining())
        }
    }, [createStaffTrainingSuccess, createStaffTrainingFailure]);

    useEffect(() => {
        if (updateStaffTrainingSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffTrainingData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaffTraining())
        } else if (updateStaffTrainingFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffTraining())
        }
    }, [updateStaffTrainingSuccess, updateStaffTrainingFailure]);

    useEffect(() => {
        setState({
            ...state,
            minmumTo: state?.fromDate,
            dayCount: noOfDayCount(state?.fromDate, state?.toDate)
        })
    }, [state?.fromDate, state?.toDate])


    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            staffTrainingDate: moment().format("YYYY-MM-DD"),
            staffId: '',
            fromPlace: '',
            toPlace: '',
            fromDate: '',
            toDate: '',
            reason: '',
        });
        setOptionListState({
            ...optionListState,
            staffList: [],
            branchListTo: []
        });
    };

    const createModel = () => {
        onFormClear()
        isEdit = false;
        setModal(true)
    };

    const onEditForm = async (data, index) => {
        setState({
            ...state,
            staffId: data?.staffId || "",
            fromPlace: data?.fromPlace || "",
            toPlace: data?.toPlace || "",
            staffTrainingDate: data.staffTrainingDate ? dateConversion(data.staffTrainingDate, "YYYY-MM-DD") : "",
            fromDate: data.fromDate ? dateConversion(data.fromDate, "YYYY-MM-DD") : "",
            toDate: data.toDate ? dateConversion(data.toDate, "YYYY-MM-DD") : "",
            reason: data?.reason || ""
        });
        const branchFilter = {
            branchId: data?.fromPlace
        }
        dispatch(getStaffRequest(branchFilter));
        const remainingBranchListTo = await deleteData(optionListState.branchList, data?.fromPlace, 'branchId');
        setOptionListState({
            ...optionListState,
            branchListTo: remainingBranchListTo
        })
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
            fromPlace: state?.fromPlace || "",
            toPlace: state?.toPlace || "",
            staffTrainingDate: state.staffTrainingDate ? dateConversion(state.staffTrainingDate, "YYYY-MM-DD") : "",
            fromDate: state.fromDate ? dateConversion(state.fromDate, "YYYY-MM-DD") : "",
            toDate: state.toDate ? dateConversion(state.toDate, "YYYY-MM-DD") : "",
            reason: state?.reason || ""
        }
        if (isEdit) {
            dispatch(updateStaffTrainingRequest(submitRequest, selectedItem.staffTrainingId))
        } else {
            dispatch(createStaffTrainingRequest(submitRequest))
        }
    };

    const onBranchChange = async (option, formName, formUniqueKey, formDisplayKey) => {
        const branchFilter = {
            branchId: option[formUniqueKey]
        }
        const remainingBranchListTo = await deleteData(optionListState.branchList, option[formUniqueKey], formUniqueKey);
        setOptionListState({
            ...optionListState,
            branchListTo: remainingBranchListTo
        })
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
        dispatch(updateStaffTrainingRequest(submitRequest, data.staffTrainingId))
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
                    Title={'Staff Training List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Staff Training Order'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={staffTrainingContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    state={state}
                    onChangeCallBack={{ "onBranchChange": onBranchChange }}
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
