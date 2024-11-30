import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { filterFormContainer, petrolAllowanceContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, removeNullKeyFromObj, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createPetrolAllowanceRequest, getPetrolAllowanceRequest, getStaffRequest, resetCreatePetrolAllowance, resetGetPetrolAllowance, resetUpdatePetrolAllowance, resetGetStaff, updatePetrolAllowanceRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import moment from 'moment';
import { createUploadImagesRequest } from '../../redux/uploads/actions';
import { useNavigate } from 'react-router-dom';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const { getPetrolAllowanceSuccess, getPetrolAllowanceList, getPetrolAllowanceFailure,
        createPetrolAllowanceSuccess, createPetrolAllowanceData, createPetrolAllowanceFailure,
        updatePetrolAllowanceSuccess, updatePetrolAllowanceData, updatePetrolAllowanceFailure,
        errorMessage, getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getPetrolAllowanceSuccess: state.petrolAllowanceReducer.getPetrolAllowanceSuccess,
        getPetrolAllowanceList: state.petrolAllowanceReducer.getPetrolAllowanceList,
        getPetrolAllowanceFailure: state.petrolAllowanceReducer.getPetrolAllowanceFailure,

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
                        {dateConversion(row.original.allowanceDate, "DD-MM-YYYY")}
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
        {
            Header: 'Total Km',
            accessor: 'totalKm',
            sort: true,
        },
        {
            Header: 'Amount',
            accessor: 'totalAmount',
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
                        <span className="text-success  me-2 cursor-pointer" onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-check-circle'}></i>
                        </span>
                        <span className="text-success  me-2 cursor-pointer"
                            onClick={() => navigate('/petrol-allowance-report', { state: row.original })}>
                            <i className={'fe-printer'} style={{ fontSize: '16px' }}></i>
                        </span>
                        {/* <span
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
                        </span> */}
                    </div>
                )
            },
        },
    ];
    const [state, setState] = useState({
        dateOfPurchase: moment().format("YYYY-MM-DD"),
        dateFilter: moment().startOf('month').format("YYYY-MM-DD"),
        staffId: "",
    });
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
        dispatch(getPetrolAllowanceRequest());
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
        if (createPetrolAllowanceSuccess) {
            const temp_state = [createPetrolAllowanceData[0], ...parentList];
            try {
                if (state.billImageName.length > 0) {
                    const formData = new FormData();
                    const originalFile = state.billImageName[0];
                    const renamedFile = new File(
                        [originalFile],
                        `petrol-allowance-${createPetrolAllowanceData[0]?.petrolAllowanceId}-${createPetrolAllowanceData[0]?.staffCode}-${originalFile.name}`,
                        {
                            type: originalFile.type,
                            lastModified: originalFile.lastModified,
                        }
                    );
                    formData.append('petrolAllowanceProof', renamedFile);
                    dispatch(createUploadImagesRequest(formData, createPetrolAllowanceData[0]?.petrolAllowanceId))
                }
            } catch (error) {
                console.log(error)
            }
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
            try {
                if (state.billImageName.length > 0) {
                    const formData = new FormData();
                    const originalFile = state.billImageName[0];
                    const renamedFile = new File(
                        [originalFile],
                        `petrol-allowance-${updatePetrolAllowanceData[0]?.petrolAllowanceId}-${updatePetrolAllowanceData[0]?.staffCode}-${originalFile.name}`,
                        {
                            type: originalFile.type,
                            lastModified: originalFile.lastModified,
                        }
                    );
                    formData.append('petrolAllowanceProof', renamedFile);
                    dispatch(createUploadImagesRequest(formData, updatePetrolAllowanceData[0]?.petrolAllowanceId))
                }
            } catch (error) {
                console.log(error)
            }
            setParentList(temp_state)
            isEdit && showMessage('success', 'Allowance Successfully Updated');
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
            dateOfPurchase: moment().format("YYYY-MM-DD"),
            dateFilter: state?.dateFilter ? state?.dateFilter : moment().startOf('month').format("YYYY-MM-DD"),
            staffId: "",
            totalKm: "",
            totalAmount: "",
            billNo: "",
            nameOfDealer: "",
            qtyPerLitre: "",
            pricePerLitre: "",
            dateOfPurchase: "",
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
            totalKm: data?.totalKm || "",
            totalAmount: data?.totalAmount || "",
            billNo: data?.billNo || "",
            nameOfDealer: data?.nameOfDealer || "",
            qtyPerLitre: data?.qtyPerLitre || "",
            pricePerLitre: data?.pricePerLitre || "",
            dateOfPurchase: data?.dateOfPurchase || moment().format("YYYY-MM-DD"),
        });
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        const submitRequest = {
            billNo: state?.billNo || "",
            dateOfPurchase: state?.dateOfPurchase || "",
            nameOfDealer: state?.nameOfDealer || "",
            pricePerLitre: state?.pricePerLitre || "",
            qtyPerLitre: state?.qtyPerLitre || "",
            // totalKm: state?.totalKm || "",
            totalAmount: state?.totalAmount || "",
        }
        dispatch(updatePetrolAllowanceRequest(submitRequest, selectedItem.petrolAllowanceId))
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updatePetrolAllowanceRequest(submitRequest, data.petrolAllowanceId))
    };

    const searchFilter = () => {
        const filteredDate = !isNaN(Date.parse(state.dateFilter)) ? dateConversion(state.dateFilter, "YYYY-MM-DD") : null
        if (isNaN(Date.parse(filteredDate)) && state.staffId === "") {
            showMessage('warning', 'Please Select Given Option...!')
        } else {
            const searchReq = {
                isActive: 1,
                dateFilter: filteredDate,
                staffId: state?.staffId || null,
            }
            const filterGetObj = removeNullKeyFromObj(searchReq)
            dispatch(getPetrolAllowanceRequest(filterGetObj));
        }
    }

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
                    Title={'Petrol Allowance List'}
                    data={parentList || []}
                    pageSize={25}
                    filterTbl={true}
                    filterFormContainer={filterFormContainer}
                    filterSubmitFunction={searchFilter}
                    filterColNo={4}
                    setState={setState}
                    state={state}
                    onClickCallBack={{ searchFilter: searchFilter }}
                    optionListState={optionListState}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Allowance'}
                modelSize={'md'}
                isEdit={isEdit}
                modelHead={'true'}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={petrolAllowanceContainer}
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
