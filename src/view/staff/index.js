import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffTabs } from './formFieldData';
import Table from '../../components/Table';
import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
// import { createAddressTypeRequest, createApplicantRequest, createDistrictRequest, createProofTypeRequest, createStateRequest, createUploadImagesRequest, deleteAddressTypeRequest, deleteApplicantAddressRequest, deleteApplicantProofRequest, getAddressTypeRequest, getApplicantInfoRequest, getApplicantRequest, getApplicantTypeRequest, getDistrictRequest, getProofTypeRequest, getStateRequest, resetCreateAddressType, resetCreateApplicant, resetCreateProofType, resetCreateState, resetCreateUploadImages, resetGetAddressType, resetGetApplicant, resetGetApplicantInfo, resetGetApplicantType, resetGetDistrict, resetGetProofType, resetGetState, resetUpdateApplicant, updateApplicantRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

let uploadImages = false;

function Index() {

   // const { dispatch, appSelector } = useRedux();

    // const {
    //     getApplicantSuccess, getApplicantList, getApplicantFailure,
    //     getApplicantInfoSuccess, getApplicantInfoList, getApplicantInfoFailure,
    //     getDistrictSuccess, getDistrictList, getDistrictFailure,
    //     getAddressTypeSuccess, getAddressTypeList, getAddressTypeFailure,
    //     getApplicantTypeSuccess, getApplicantTypeList, getApplicantTypeFailure,
    //     getStateSuccess, getStateList, getStateFailure,
    //     getProofTypeSuccess, getProofTypeList, getProofTypeFailure,
    //     createApplicantSuccess, createApplicantData, createApplicantFailure,
    //     createUploadImagesSuccess, createUploadImagesData, createUploadImagesFailure,
    //     createProofTypeSuccess, createProofTypeData, createProofTypeFailure,
    //     createAddressTypeSuccess, createAddressTypeData, createAddressTypeFailure,
    //     createStateSuccess, createStateData, createStateFailure,
    //     createDistrictSuccess, createDistrictData, createDistrictFailure,
    //     updateApplicantSuccess, updateApplicantData, updateApplicantFailure, errorMessage

    // } = appSelector((state) => ({
    //     getApplicantSuccess: state.staffReducer.getApplicantSuccess,
    //     getApplicantList: state.staffReducer.getApplicantList,
    //     getApplicantFailure: state.staffReducer.getApplicantFailure,

    //     getApplicantInfoSuccess: state.staffReducer.getApplicantInfoSuccess,
    //     getApplicantInfoList: state.staffReducer.getApplicantInfoList,
    //     getApplicantInfoFailure: state.staffReducer.getApplicantInfoFailure,

    //     createUploadImagesSuccess: state.uploadImagesReducer.createUploadImagesSuccess,
    //     createUploadImagesData: state.uploadImagesReducer.createUploadImagesData,
    //     createUploadImagesFailure: state.uploadImagesReducer.createUploadImagesFailure,

    //     getStateSuccess: state.stateReducer.getStateSuccess,
    //     getStateList: state.stateReducer.getStateList,
    //     getStateFailure: state.stateReducer.getStateFailure,

    //     getApplicantTypeSuccess: state.staffTypeReducer.getApplicantTypeSuccess,
    //     getApplicantTypeList: state.staffTypeReducer.getApplicantTypeList,
    //     getApplicantTypeFailure: state.staffTypeReducer.getApplicantTypeFailure,

    //     getDistrictSuccess: state.districtReducer.getDistrictSuccess,
    //     getDistrictList: state.districtReducer.getDistrictList,
    //     getDistrictFailure: state.districtReducer.getDistrictFailure,

    //     getProofTypeSuccess: state.proofTypeReducer.getProofTypeSuccess,
    //     getProofTypeList: state.proofTypeReducer.getProofTypeList,
    //     getProofTypeFailure: state.proofTypeReducer.getProofTypeFailure,

    //     getAddressTypeSuccess: state.addressTypeReducer.getAddressTypeSuccess,
    //     getAddressTypeList: state.addressTypeReducer.getAddressTypeList,
    //     getAddressTypeFailure: state.addressTypeReducer.getAddressTypeFailure,

    //     createApplicantSuccess: state.staffReducer.createApplicantSuccess,
    //     createApplicantData: state.staffReducer.createApplicantData,
    //     createApplicantFailure: state.staffReducer.createApplicantFailure,

    //     createProofTypeSuccess: state.proofTypeReducer.createProofTypeSuccess,
    //     createProofTypeData: state.proofTypeReducer.createProofTypeData,
    //     createProofTypeFailure: state.proofTypeReducer.createProofTypeFailure,

    //     createAddressTypeSuccess: state.addressTypeReducer.createAddressTypeSuccess,
    //     createAddressTypeData: state.addressTypeReducer.createAddressTypeData,
    //     createAddressTypeFailure: state.addressTypeReducer.createAddressTypeFailure,

    //     createStateSuccess: state.stateReducer.createStateSuccess,
    //     createStateData: state.stateReducer.createStateData,
    //     createStateFailure: state.stateReducer.createStateFailure,

    //     createDistrictSuccess: state.districtReducer.createDistrictSuccess,
    //     createDistrictData: state.districtReducer.createDistrictData,
    //     createDistrictFailure: state.districtReducer.createDistrictFailure,

    //     updateApplicantSuccess: state.staffReducer.updateApplicantSuccess,
    //     updateApplicantData: state.staffReducer.updateApplicantData,
    //     updateApplicantFailure: state.staffReducer.updateApplicantFailure,

    //     errorMessage: state.staffReducer.errorMessage,
    // }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Staff Code',
            accessor: 'staffCode',
            sort: true,
        },
        {
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: false,
        },
        {
            Header: 'Contact No',
            accessor: 'contactNo',
            sort: false,
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
        }
    ];

    const columnsWizard = {
        addressInfo: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Address Type',
                accessor: 'addressTypeName',
                sort: true,
            },
            {
                Header: 'Address',
                accessor: 'address',
                sort: true,
            },
            {
                Header: 'State',
                accessor: 'stateName',
                sort: true,
            },
            {
                Header: 'District',
                accessor: 'districtName',
                sort: true,
            },
            {
                Header: 'Pincode',
                accessor: 'pincode',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => {
                                handleEditTabTable(row?.original, row?.index);
                            }}>
                            <i className={'fe-edit-1'}></i> Edit
                        </span>
                        <span
                            className="text-danger cursor-pointer"
                            onClick={() => {
                                showConfirmationDialog(
                                    "You won't be able to revert this!",
                                    () => handleDeleteTabTable(row?.original, row?.index, "addressInfo"),
                                    'Yes, Delete it!'
                                );
                            }}>
                            <i className={'fe-trash-2'}></i> Delete
                        </span>
                    </div>
                ),
            },
        ],

        idProof: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Proof Type',
                accessor: 'proofTypeName',
                sort: true,
            },
            {
                Header: 'Proof No.',
                accessor: 'proofNo',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => {
                    console.log(row.original)
                    return (
                        <div>
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => handleEditTabTable(row?.original, row?.index)}>
                                <i className={'fe-edit-1'}></i> Edit
                            </span>
                            <span
                                className="text-danger cursor-pointer"
                                onClick={() => {
                                    showConfirmationDialog(
                                        "You won't be able to revert this!",
                                        () => handleDeleteTabTable(row?.original, row?.index, "idProof"),
                                        'Yes, Delete it!'
                                    );
                                }}>
                                <i className={'fe-trash-2'}></i> Delete
                            </span>
                        </div>
                    )
                },
            },
        ],
    };

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [optionListState, setOptionListState] = useState({
        genderList: [
            { genderId: 1, genderName: 'Male' },
            { genderId: 2, genderName: 'Female' },
            { genderId: 3, genderName: 'Others' },
        ],
        // maritalStatusList: [
        //     { martialStatusId: 1, maritalStatusName: 'Married' },
        //     { martialStatusId: 2, maritalStatusName: 'Single' },
        // ],
    })

    const [wizardModel, setWizardModel] = useState(false);
    const [arrVal, setArrVal] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [tab, setTab] = useState('personalInfo');
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const showSelectmodel = ['branchId', 'departmentId', 'designationId', 'bankAccountId'];
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const showMultiAdd = ['idProof', 'addressInfo'];
    const [getModelForm, setModelForm] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [tabList, setTabList] = useState(staffTabs);

    const [modal, setModal] = useState(false);
    const [handleState, setHandleState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    // useEffect(() => {
    //     setIsLoading(true)
    //     const req={
    //         staffCategory : 20
    //     }
    //     dispatch(getApplicantRequest(req));
    //     dispatch(getProofTypeRequest());
    //     dispatch(getAddressTypeRequest());
    //     dispatch(getStateRequest());
    //     dispatch(getApplicantTypeRequest());
    //     dispatch(getDistrictRequest());
    // }, []);

    // useEffect(() => {
    //     if (getApplicantSuccess) {
    //         setIsLoading(false)
    //         setParentList(getApplicantList)
    //         dispatch(resetGetApplicant())
    //     } else if (getApplicantFailure) {
    //         setIsLoading(false)
    //         setParentList([])
    //         dispatch(resetGetApplicant())
    //     }
    // }, [getApplicantSuccess, getApplicantFailure]);

    // useEffect(() => {
    //     if (getApplicantInfoSuccess) {
    //         setIsLoading(false)
    //         const parsedData = _.map(getApplicantInfoList, item => ({
    //             staffId: item.staffId,
    //             addressInfo: item.addressInfo,
    //             idProof: item.idProof,
    //             ..._.mapValues(_.pick(item, ['personalInfo', 'incomeInfo', 'additionalInfo']), JSON.parse)
    //         }));
    //         setMultiStateValue(parsedData)
    //         setWizardModel(true)
    //         dispatch(resetGetApplicantInfo())
    //     } else if (getApplicantInfoFailure) {
    //         setIsLoading(false)
    //         setParentList([])
    //         dispatch(resetGetApplicantInfo())
    //     }
    // }, [getApplicantInfoSuccess, getApplicantInfoFailure]);

    // useEffect(() => {
    //     if (getProofTypeSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             proofTypeList: getProofTypeList
    //         })
    //         dispatch(resetGetProofType())
    //     } else if (getProofTypeFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             proofTypeList: []
    //         })
    //         dispatch(resetGetProofType())
    //     }
    // }, [getProofTypeSuccess, getProofTypeFailure]);

    // useEffect(() => {
    //     if (getDistrictSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             districtList: getDistrictList
    //         })
    //         dispatch(resetGetDistrict())
    //     } else if (getDistrictFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             districtList: []
    //         })
    //         dispatch(resetGetDistrict())
    //     }
    // }, [getDistrictSuccess, getDistrictFailure]);

    // useEffect(() => {
    //     if (getApplicantTypeSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             staffTypeList: getApplicantTypeList
    //         })
    //         dispatch(resetGetApplicantType())
    //     } else if (getApplicantTypeFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             staffTypeList: []
    //         })
    //         dispatch(resetGetApplicantType())
    //     }
    // }, [getApplicantTypeSuccess, getApplicantTypeFailure]);

    // useEffect(() => {
    //     if (getAddressTypeSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             addressTypeList: getAddressTypeList
    //         })
    //         dispatch(resetGetAddressType())
    //     } else if (getAddressTypeFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             addressTypeList: []
    //         })
    //         dispatch(resetGetAddressType())
    //     }
    // }, [getAddressTypeSuccess, getAddressTypeFailure]);

    // useEffect(() => {
    //     if (getStateSuccess) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             stateList: getStateList,
    //         })
    //         dispatch(resetGetState())
    //     } else if (getStateFailure) {
    //         setIsLoading(false)
    //         setOptionListState({
    //             ...optionListState,
    //             stateList: []
    //         })
    //         dispatch(resetGetState())
    //     }
    // }, [getStateSuccess, getStateFailure]);

    // useEffect(() => {
    //     if (createApplicantSuccess) {
    //         const temp_state = [createApplicantData[0], ...parentList];
    //         setParentList(temp_state)
    //         showMessage('success', 'Created Successfully');
    //         closeModel()
    //         dispatch(resetCreateApplicant())

            
    //         const formData = new FormData();
    //         state.proofImage.map((ele) => {
    //             const originalFile = ele[0];
    //             const renamedFile = new File([originalFile], `${createApplicantData[0].staffCode}-${originalFile.name}`, {
    //                 type: originalFile.type,
    //                 lastModified: originalFile.lastModified,
    //             });
    //             formData.append("proofImages", renamedFile);
    //             // filterImageName.push([renamedFile]);
    //         })
    //         dispatch(createUploadImagesRequest(formData))
    //     } else if (createApplicantFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateApplicant())
    //     }
    // }, [createApplicantSuccess, createApplicantFailure]);

    // useEffect(() => {
    //     if (createUploadImagesSuccess) {
    //         dispatch(resetCreateUploadImages())
    //     } else if (createUploadImagesFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateUploadImages())
    //     }
    // }, [createUploadImagesSuccess, createUploadImagesFailure]);

    // useEffect(() => {
    //     if (createProofTypeSuccess) {
    //         const temp_state = [createProofTypeData[0], ...optionListState.proofTypeList];
    //         setOptionListState({
    //             ...optionListState,
    //             proofTypeList: temp_state
    //         })
    //         showMessage('success', 'Created Successfully');
    //         dispatch(resetCreateProofType())
    //     } else if (createProofTypeFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateProofType())
    //     }
    // }, [createProofTypeSuccess, createProofTypeFailure]);

    // useEffect(() => {
    //     if (createStateSuccess) {
    //         const temp_state = [createStateData[0], ...optionListState.stateList];
    //         setOptionListState({
    //             ...optionListState,
    //             stateList: temp_state
    //         })
    //         showMessage('success', 'Created Successfully');
    //         dispatch(resetCreateState())
    //     } else if (createStateFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateState())
    //     }
    // }, [createStateSuccess, createStateFailure]);

    // useEffect(() => {
    //     if (createDistrictSuccess) {
    //         const temp_state = [createDistrictData[0], ...optionListState.districtList];
    //         setOptionListState({
    //             ...optionListState,
    //             districtList: temp_state
    //         })
    //         showMessage('success', 'Created Successfully');
    //         dispatch(resetCreateState())
    //     } else if (createDistrictFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateState())
    //     }
    // }, [createDistrictSuccess, createDistrictFailure]);

    // useEffect(() => {
    //     if (createAddressTypeSuccess) {
    //         const temp_state = [createAddressTypeData[0], ...optionListState.addressTypeList];
    //         setOptionListState({
    //             ...optionListState,
    //             addressTypeList: temp_state
    //         })
    //         showMessage('success', 'Created Successfully');
    //         dispatch(resetCreateAddressType())
    //     } else if (createAddressTypeFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetCreateAddressType())
    //     }
    // }, [createAddressTypeSuccess, createAddressTypeFailure]);

    // useEffect(() => {
    //     if (updateApplicantSuccess) {
    //         const temp_state = [...parentList];
    //         temp_state[selectedIndex] = updateApplicantData[0];
    //         setParentList(temp_state)
    //         isEdit && showMessage('success', 'Updated Successfully');
    //         closeModel()
    //         dispatch(resetUpdateApplicant())
    //         if(uploadImages){
    //             uploadImages = false;
    //             const formData = new FormData();
    //             state.proofImage.map((ele) => {
    //                 const originalFile = ele[0];
    //                 const renamedFile = new File([originalFile], `${updateApplicantData[0].staffCode}-${originalFile.name}`, {
    //                     type: originalFile.type,
    //                     lastModified: originalFile.lastModified,
    //                 });
    //                 formData.append("proofImages", renamedFile);
    //             })
    //             dispatch(createUploadImagesRequest(formData))
    //         }
    //     } else if (updateApplicantFailure) {
    //         showMessage('warning', errorMessage);
    //         dispatch(resetUpdateApplicant())
    //     }
    // }, [updateApplicantSuccess, updateApplicantFailure]);

    const closeModel = () => {
        onFormClear()
        setWizardModel(false)
        setTab('personalInfo')
        setArrVal([])
        setMultiStateValue([{}])
        setTabIndex(0)
        setIsEdit(false);
        setTabList(staffTabs)
    }

    const onFormClear = () => {
        setState({});
    };

    const createModel = () => {
        onFormClear()
        setIsEdit(false);
        setWizardModel(true)
    };

    const onEditForm = (data, index) => {
        setIsEdit(true);
        const editReq = {
            staffId: data.staffId
        }
        // dispatch(getApplicantInfoRequest(editReq))
        setSelectedItem(data)
        setSelectedIndex(index)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        let proofImage = []
        multiStateValue[0].idProof.map((item, index) => {
            if (item.imageProof) {
                uploadImages = true;
                const file = item.imageProof
                multiStateValue[0].idProof[index].imageName = file[0].name
                proofImage.push(item.imageProof)
            }
        })
        setState({
            ...state,
            proofImage: proofImage
        })

        const personalInfoData = multiStateValue[0]?.personalInfo
        personalInfoData.staffCategory = 20
        const personalInfo = [personalInfoData] || []
        const idProofInfo = multiStateValue[0]?.idProof || []
        const addressInfo = multiStateValue[0]?.addressInfo || []
        const submitRequest = {
            personalInfo: personalInfo,
            proofInfo: idProofInfo,
            addressInfo: addressInfo,
        }
        if (isEdit) {
            // dispatch(updateApplicantRequest(submitRequest, selectedItem.staffId))
        } else {
            // dispatch(createApplicantRequest(submitRequest))
        }
    };

    const handleEditTabTable = async (data, index) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, selectedIdx: index };
        setState(updatedState);
    };
    //handleDelete
    const handleDeleteTabTable = async (data, idx, selectedName) => {
        if (isEdit) {
            if (selectedName === "addressInfo") {
                // dispatch(deleteApplicantAddressRequest(data.staffAddressInfoId))
            } else if (selectedName === "idProof") {
                // console.log(data)
                // dispatch(deleteApplicantProofRequest(data.staffProofId))
            }
        }
        let remainingData = _.remove(arrVal, function (item, index) {
            return idx != index;
        });
        setArrVal(remainingData);
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            personalInfo:[{
                isActive: activeChecker == 0 ? 1 : 0
            }]
        }
        setSelectedIndex(index)
        // dispatch(updateApplicantRequest(submitRequest, data.staffId))
    };

    const toggleModal = (form) => {
        setModal(true);
        setModelForm(form);
    };

    const toggle = () => {
        setTab('personalInfo');
        setTabIndex(0);
        if (isEdit) {
            setIsEdit(false);
        }
        setWizardModel(!wizardModel);
    };

    //------->
    const onHandleProofType = (data, name, uniqueKey, displayKey, selectedObj) => {
        const nameData = data[displayKey]
        // console.log("data", data);
        setState({
            ...state,
            [name]: data[uniqueKey],
            [displayKey]: nameData
        })
    }

    const onHandleState = (data, name, uniqueKey, displayKey, selectedObj) => {
        const stateName = data.stateName
        setState({
            ...state,
            [name]: data[uniqueKey],
            stateName: stateName,
            districtId: ""
        })
        const districtReq = {
            stateId: data[uniqueKey]
        }
        // dispatch(getDistrictRequest(districtReq));
    }

    const handleChangeSelectOption = (value, name = '', selectData) => {
        const selectedName = name === "proofTypeId" ? "proofTypeName" : name === "addressTypeId" ? "addressTypeName" : name === "stateId" ? "stateName" : name === "districtId" && selectData === "select" ? "stateId" : name === "districtId" ? "districtName" : ""
        setHandleState({
            ...handleState,
            [selectedName]: value
        })
    };

    const handleSubmitSelectOption = (name) => {
        let req = {}
        // switch (name) {
        //     case 'proofTypeId':
        //         req = {
        //             proofTypeName: handleState.proofTypeName
        //         }
        //         dispatch(createProofTypeRequest(req))
        //         break;
        //     case 'addressTypeId':
        //         req = {
        //             addressTypeName: handleState.addressTypeName
        //         }
        //         dispatch(createAddressTypeRequest(req))
        //         break;
        //     case 'stateId':
        //         req = {
        //             countryId: 1,
        //             stateName: handleState.stateName
        //         }
        //         dispatch(createStateRequest(req))
        //         break;
        //     case 'districtId':
        //         req = {
        //             stateId: 1,
        //             districtName: handleState.districtName
        //         }
        //         dispatch(createDistrictRequest(req))
        //         break;
        //     default:
        //         break;
        // }
        setModal(false)
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :
                wizardModel ? (
                    <React.Fragment>
                        <WizardWithProgressbar
                            arrVal={arrVal}
                            setArrVal={setArrVal}
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                            isEdit={isEdit}
                            setTab={setTab}
                            tab={tab}
                            onChangeCallBack={{ "onHandleProofType": onHandleProofType, "onHandleState": onHandleState }}
                            state={state}
                            setState={setState}
                            multiStateValue={multiStateValue}
                            setMultiStateValue={setMultiStateValue}
                            errors={errors}
                            setErrors={setErrors}
                            setStored={setStored}
                            IsEditArrVal={IsEditArrVal}
                            setIsEditArrVal={setIsEditArrVal}
                            tblList={parentList}
                            Title={'Staff Details'}
                            showSelectmodel={showSelectmodel}
                            showMultiAdd={showMultiAdd}
                            optionListState={optionListState}
                            columnsWizard={columnsWizard}
                            toggleModal={toggleModal}
                            toggle={toggle}
                            handleSubmit={onFormSubmit}
                            tabList={tabList}
                        />
                        <ModelViewBox
                            modal={modal}
                            setModel={setModal}
                            modelHeader={getModelForm?.label || ''}
                            modelSize={'md'}
                            handleSubmit={() => handleSubmitSelectOption(getModelForm.name)}>
                            {getModelForm?.name === 'districtId' ? (
                                <React.Fragment>
                                    <Form.Label>{'State'}</Form.Label>
                                    <Select
                                        onChange={(selectedOption) => {
                                            handleChangeSelectOption(selectedOption, getModelForm?.name, "select");
                                        }}
                                        getOptionLabel={(option) => `${option?.stateName || ""}`}
                                        getOptionValue={(option) => `${option?.value || ""}`}
                                        className="react-select react-select-container mb-2"
                                        classNamePrefix="react-select"
                                        isSearchable
                                        options={
                                            getModelForm?.name === 'states'
                                                ? optionListState.country
                                                : optionListState.stateList
                                        }
                                    />
                                </React.Fragment>
                            ) : null}

                            <Form.Label>{getModelForm?.label}</Form.Label>
                            <Form.Control
                                type="text"
                                name={getModelForm?.name}
                                className="mb-1"
                                placeholder={`Enter ${getModelForm?.label || ''}`}
                                onChange={(e) => {
                                    handleChangeSelectOption(e.target.value, getModelForm?.name);
                                }}
                            />
                        </ModelViewBox>
                    </React.Fragment>
                ) :
                    <Table
                        columns={columns}
                        Title={'Staff List'}
                        data={parentList || []}
                        pageSize={25}
                        toggle={createModel}
                    />}

            {/* <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Customer'}
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
            </ModelViewBox> */}
        </React.Fragment>
    );
}

export default Index;
