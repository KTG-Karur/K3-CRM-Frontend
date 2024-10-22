import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffTabs } from './formFieldData';
import Table from '../../components/Table';
import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { getBranchRequest, getDepartmentRequest, getDesignationRequest, getProofTypeRequest, getStaffRequest, resetCreateStaff, resetGetBranch, resetGetDepartment, resetGetDesignation, resetGetProofType, resetGetStaff, resetUpdateStaff } from '../../redux/actions';
import moment from 'moment';

let uploadImages = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess, getStaffList, getStaffFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDesignationSuccess, getDesignationList, getDesignationFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getProofTypeSuccess, getProofTypeList, getProofTypeFailure,
        createStaffSuccess, createStaffData, createStaffFailure,
        updateStaffSuccess, updateStaffData, updateStaffFailure, errorMessage

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getDesignationSuccess: state.designationReducer.getDesignationSuccess,
        getDesignationList: state.designationReducer.getDesignationList,
        getDesignationFailure: state.designationReducer.getDesignationFailure,

        getProofTypeSuccess: state.proofTypeReducer.getProofTypeSuccess,
        getProofTypeList: state.proofTypeReducer.getProofTypeList,
        getProofTypeFailure: state.proofTypeReducer.getProofTypeFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

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
        staffDetails: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Relation',
                accessor: 'relationTypeName',
                sort: true,
            },
            {
                Header: 'Person Name',
                accessor: 'relationName',
                sort: true,
            },
            {
                Header: 'Contact Number',
                accessor: 'contactNo',
                sort: true,
            },
            {
                Header: 'Qualification',
                accessor: 'qualificationName',
                sort: true,
            },
            {
                Header: 'Occupation',
                accessor: 'occupation',
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

        staffQualification: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Qualification Type',
                accessor: 'qualificationName',
                sort: true,
            },
            {
                Header: 'Stream',
                accessor: 'stream',
                sort: true,
            },
            {
                Header: 'University Name',
                accessor: 'universityName',
                sort: true,
            },
            {
                Header: 'Percentage',
                accessor: 'percentage',
                sort: true,
            },
            {
                Header: 'Passing Year',
                accessor: 'passingYear',
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

        language: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Language',
                accessor: 'languageName',
                sort: true,
            },
            {
                Header: 'Speak',
                accessor: 'speak',
                sort: true,
            },
            {
                Header: 'Read',
                accessor: 'read',
                sort: true,
            },
            {
                Header: 'Write',
                accessor: 'write',
                sort: true,
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => {
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
                Header: 'Proof Number',
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
        workExperience: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Organization',
                accessor: 'organizationName',
                sort: true,
            },
            {
                Header: 'Position',
                accessor: 'position',
                sort: true,
            },
            {
                Header: 'Years Of Experience',
                accessor: 'yearsOfExperience',
                sort: true,
            },
            {
                Header: 'Work Location',
                accessor: 'workLocation',
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

    const [state, setState] = useState({
        maximumDOB: moment().format("YYYY-MM-DD")
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [optionListState, setOptionListState] = useState({
        genderList: [
            { genderId: 1, genderName: 'Male' },
            { genderId: 2, genderName: 'Female' },
            { genderId: 3, genderName: 'Others' },
        ],
        surNameList: [
            {
                surNameId: 40,
                surName: "Mr."
            },
            {
                surNameId: 41,
                surName: "Ms."
            },
            {
                surNameId: 42,
                surName: "Mrs."
            },
        ],
        relationTypeList: [
            {
                relationTypeId: 31,
                relationTypeName: "Father"
            },
            {
                relationTypeId: 32,
                relationTypeName: "Mother"
            },
            {
                relationTypeId: 33,
                relationTypeName: "Husband"
            },
            {
                relationTypeId: 34,
                relationTypeName: "Wife"
            },
            {
                relationTypeId: 35,
                relationTypeName: "Son"
            },
            {
                relationTypeId: 36,
                relationTypeName: "Daughter"
            },
        ],
        qualificationList: [
            {
                qualificationId: 12,
                qualificationName: "Bsc"
            },
            {
                qualificationId: 13,
                qualificationName: "Msc"
            },
            {
                qualificationId: 14,
                qualificationName: "BE"
            },
            {
                qualificationId: 15,
                qualificationName: "ME"
            },
            {
                qualificationId: 16,
                qualificationName: "BA"
            },
            {
                qualificationId: 17,
                qualificationName: "MA"
            },
            {
                qualificationId: 3,
                qualificationName: "Others"
            },
        ],
        martialStatusList: [
            { martialStatusId: 7, martialStatusName: 'Single' },
            { martialStatusId: 8, martialStatusName: 'Married' },
        ],
        languageList: [
            { languageId: 9, languageName: 'Tamil' },
            { languageId: 10, languageName: 'English' },
            { languageId: 11, languageName: 'Hindi' },
        ],
        casteTypeList: [
            { casteTypeId: 21, casteTypeName: 'OC' },
            { casteTypeId: 22, casteTypeName: 'BC' },
            { casteTypeId: 23, casteTypeName: 'MBC' },
            { casteTypeId: 24, casteTypeName: 'SC' },
            { casteTypeId: 25, casteTypeName: 'ST' },
        ],
    })

    const [wizardModel, setWizardModel] = useState(false);
    const [arrVal, setArrVal] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [tab, setTab] = useState('personalInfo');
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const showSelectmodel = ['branchId', 'departmentId', 'designationId', 'bankAccountId'];
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const showMultiAdd = ['staffDetails', 'qualification', 'language', 'workExperience', 'idProof', 'workExperience', 'staffQualification'];
    const [getModelForm, setModelForm] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [tabList, setTabList] = useState(staffTabs);

    const [modal, setModal] = useState(false);
    const [handleState, setHandleState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStaffRequest());
        const req = {
            isActive: 1
        }
        dispatch(getBranchRequest(req));
        dispatch(getDesignationRequest(req));
        dispatch(getDepartmentRequest(req));
        dispatch(getProofTypeRequest(req));
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
        if (getDesignationSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                designationList: getDesignationList
            })
            dispatch(resetGetDesignation())
        } else if (getDesignationFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                designationList: []
            })
            dispatch(resetGetDesignation())
        }
    }, [getDesignationSuccess, getDesignationFailure]);

    useEffect(() => {
        if (getDepartmentSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: getDepartmentList
            })
            dispatch(resetGetDepartment())
        } else if (getDepartmentFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                departmentList: []
            })
            dispatch(resetGetDepartment())
        }
    }, [getDepartmentSuccess, getDepartmentFailure]);

    useEffect(() => {
        if (getProofTypeSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                proofTypeList: getProofTypeList
            })
            dispatch(resetGetProofType())
        } else if (getProofTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                proofTypeList: []
            })
            dispatch(resetGetProofType())
        }
    }, [getProofTypeSuccess, getProofTypeFailure]);

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
        setState({
            ...state,
            maximumDOB: moment().format("YYYY-MM-DD")
        });
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
        // dispatch(getStaffInfoRequest(editReq))
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

        const submitRequest = {
            personalInfoData: multiStateValue[0]?.personalInfo || {},
            jobRoleDetails: multiStateValue[0]?.jobRoleDetails || {},
            idProof: multiStateValue[0]?.idProof || [],
            staffDetails: multiStateValue[0]?.staffDetails || [],
            staffQualification: multiStateValue[0]?.staffQualification || [],
            language: multiStateValue[0]?.language || [],
            workExperience: multiStateValue[0]?.workExperience || [],
        }
        console.log(JSON.stringify(submitRequest))
        if (isEdit) {
            // dispatch(updateStaffRequest(submitRequest, selectedItem.staffId))
        } else {
            // dispatch(createStaffRequest(submitRequest))
        }
    };

    const onHandleProofType = (data, name, uniqueKey, displayKey, selectedObj) => {
        const nameData = data[displayKey]
        setState({
            ...state,
            [name]: data[uniqueKey],
            [displayKey]: nameData
        })
    }

    const handleDateChange = (e, name) => {
        const formate = moment(e?.target?.value).format("YYYY-MM-DD")
        const age = moment().diff(formate, 'years');
        setState((prev) => ({
            ...prev,
            [name]: formate,
            age :age
        }));
    }

    const handleEditTabTable = async (data, index) => {
        setIsEditArrVal(true);
        const updatedState = { ...data, selectedIdx: index };
        setState(updatedState);
    };
    //handleDelete
    const handleDeleteTabTable = async (data, idx, selectedName) => {
        if (isEdit) {
            if (selectedName === "addressInfo") {
                // dispatch(deleteStaffAddressRequest(data.staffAddressInfoId))
            } else if (selectedName === "idProof") {
                // console.log(data)
                // dispatch(deleteStaffProofRequest(data.staffProofId))
            }
        }
        let remainingData = _.remove(arrVal, function (item, index) {
            return idx != index;
        });
        setArrVal(remainingData);
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            personalInfo: [{
                isActive: activeChecker == 0 ? 1 : 0
            }]
        }
        setSelectedIndex(index)
        // dispatch(updateStaffRequest(submitRequest, data.staffId))
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
                            onChangeCallBack={{ "onHandleProofType": onHandleProofType, "handleDateChange" : handleDateChange }}
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
                    </React.Fragment>
                ) :
                    <Table
                        columns={columns}
                        Title={'Staff List'}
                        data={parentList || []}
                        pageSize={25}
                        toggle={createModel}
                    />}
        </React.Fragment>
    );
}

export default Index;
