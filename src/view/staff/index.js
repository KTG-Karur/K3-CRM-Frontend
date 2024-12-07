import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { staffTabs, modalFields } from './formFieldData';
import Table from '../../components/Table';
import { WizardWithProgressbar } from '../../components/Atom/WizardViewBox';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { createBranchRequest, createDepartmentRequest, createDesignationRequest, createStaffRequest, deleteStaffProofRequest, deleteStaffQualificationRequest, deleteStaffRequest, deleteUpdateStaff, getBranchRequest, getDepartmentRequest, getDesignationRequest, getProofTypeRequest, getRoleRequest, getStaffDetailsRequest, getStaffRequest, resetCreateBranch, resetCreateDepartment, resetCreateDesignation, resetCreateStaff, resetGetBranch, resetGetDepartment, resetGetDesignation, resetGetDetailsStaff, resetGetProofType, resetGetRole, resetGetStaff, resetUpdateStaff, updateStaffRequest } from '../../redux/actions';
import moment from 'moment';
import { deleteStaffWorkExperienceRequest } from '../../redux/staff-work-experience/actions';
import { deleteStaffLanguageRequest } from '../../redux/staff-language/actions';
import { deleteStaffRelationRequest } from '../../redux/staff-relation/actions';
import { createUploadImagesRequest } from '../../redux/uploads/actions';
import { useNavigate } from 'react-router-dom';

let uploadImages = false;

let optionList = {
    proofTypeList: [],
    relationTypeList: [
        {
            relationId: 31,
            relationTypeName: "Father"
        },
        {
            relationId: 32,
            relationTypeName: "Mother"
        },
        {
            relationId: 33,
            relationTypeName: "Husband"
        },
        {
            relationId: 34,
            relationTypeName: "Wife"
        },
        {
            relationId: 35,
            relationTypeName: "Son"
        },
        {
            relationId: 36,
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
    languageList: [
        { languageId: 9, languageName: 'Tamil' },
        { languageId: 10, languageName: 'English' },
        { languageId: 11, languageName: 'Hindi' },
    ],
    timeToJoinList: [
        { timetoJoinId: 43, timeToJoinName: 'Immediately' },
        { timetoJoinId: 44, timeToJoinName: '< 15days' },
        { timetoJoinId: 45, timeToJoinName: '1 Month' },
        { timetoJoinId: 46, timeToJoinName: '2 Months' },
        { timetoJoinId: 47, timeToJoinName: '3 Months' },
    ],
    achievementTitleList: [
        {
            achievementTitleName: 'Award/Certificate/Scholarship Won',
            achievementTitleId: 52
        },
        {
            achievementTitleName: 'Proficiency in Games/Sports',
            achievementTitleId: 53
        },
        {
            achievementTitleName: 'Proficiency in literary work / art / culture',
            achievementTitleId: 54
        },
    ],
    achievementAtList: [
        {
            achievementAtName: 'School',
            achievementAtId: 48
        },
        {
            achievementAtName: 'College',
            achievementAtId: 49
        },
        {
            achievementAtName: 'University',
            achievementAtId: 50
        },
        {
            achievementAtName: 'Professional Course',
            achievementAtId: 51
        },
    ]
}

let isPrint = false;
function Index() {

    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();

    const {

        getRoleSuccess, getRoleList, getRoleFailure,
        getStaffSuccess, getStaffList, getStaffFailure,
        getStaffDetailsSuccess, getStaffDetailsList, getStaffDetailsFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDesignationSuccess, getDesignationList, getDesignationFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        getProofTypeSuccess, getProofTypeList, getProofTypeFailure,
        createStaffSuccess, createStaffData, createStaffFailure,
        updateStaffSuccess, updateStaffData, updateStaffFailure, errorMessage,
        createBranchSuccess, createBranchData, createBranchFailure, createDepartmentSuccess,
        createDepartmentData, createDepartmentFailure, createDesignationSuccess, createDesignationData, createDesignationFailure, deleteStaffSuccess,
        deleteStaffData, deleteStaffFailure,

    } = appSelector((state) => ({

        getRoleSuccess: state.roleReducer.getRoleSuccess,
        getRoleList: state.roleReducer.getRoleList,
        getRoleFailure: state.roleReducer.getRoleFailure,

        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getStaffDetailsSuccess: state.staffReducer.getStaffDetailsSuccess,
        getStaffDetailsList: state.staffReducer.getStaffDetailsList,
        getStaffDetailsFailure: state.staffReducer.getStaffDetailsFailure,

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

        createBranchSuccess: state.branchReducer.createBranchSuccess,
        createBranchData: state.branchReducer.createBranchData,
        createBranchFailure: state.branchReducer.createBranchFailure,

        createDepartmentSuccess: state.departmentReducer.createDepartmentSuccess,
        createDepartmentData: state.departmentReducer.createDepartmentData,
        createDepartmentFailure: state.departmentReducer.createDepartmentFailure,

        createDesignationSuccess: state.designationReducer.createDesignationSuccess,
        createDesignationData: state.designationReducer.createDesignationData,
        createDesignationFailure: state.designationReducer.createDesignationFailure,

        updateStaffSuccess: state.staffReducer.updateStaffSuccess,
        updateStaffData: state.staffReducer.updateStaffData,
        updateStaffFailure: state.staffReducer.updateStaffFailure,

        deleteStaffSuccess: state.staffReducer.deleteStaffSuccess,
        deleteStaffData: state.staffReducer.deleteStaffData,
        deleteStaffFailure: state.staffReducer.deleteStaffFailure,

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
            Header: 'Department',
            accessor: 'departmentName',
            sort: false,
        },
        {
            Header: 'Contact No',
            accessor: 'contactNo',
            sort: false,
        },
        {
            Header: 'Role',
            accessor: 'roleName',
            sort: false,
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
                            className={`${iconColor} me-2 cursor-pointer`}
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
                        <span className="text-success  me-2 cursor-pointer"
                            onClick={() => onPrintDesign(row.original)}>
                            <i className={'fe-printer'} style={{ fontSize: '16px' }}></i>
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
                                handleEditTabTable(row?.original, row?.index, "staffDetails");
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
                    return (
                        <div>
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => handleEditTabTable(row?.original, row?.index, "staffQualification")}>
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
                Cell: ({ row }) => <div>{row?.original?.speak ? "Yes" : "No"}</div>

            },
            {
                Header: 'Read',
                accessor: 'read',
                Cell: ({ row }) => <div>{row?.original?.read ? "Yes" : "No"}</div>
            },
            {
                Header: 'Write',
                accessor: 'write',
                Cell: ({ row }) => <div>{row?.original?.write ? "Yes" : "No"}</div>
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => handleEditTabTable(row?.original, row?.index, "language")}>
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
                accessor: 'proofNumber',
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
                                onClick={() => handleEditTabTable(row?.original, row?.index, "idProof")}>
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
                    return (
                        <div>
                            <span
                                className="text-success  me-2 cursor-pointer"
                                onClick={() => handleEditTabTable(row?.original, row?.index, "workExperience")}>
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
        achievements: [
            {
                Header: 'S.No',
                accessor: 'id',
                Cell: (row) => <div>{row?.row?.index + 1}</div>,
            },
            {
                Header: 'Achievement At',
                accessor: 'achievementAtName',
                sort: true,
            },
            {
                Header: 'Achievement Title',
                accessor: 'achievementTitleName',
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
                                onClick={() => handleEditTabTable(row?.original, row?.index, "workExperience")}>
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
        maximumDOB: moment().format("YYYY-MM-DD"),
        dateOfJoining: moment().format("YYYY-MM-DD"),
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
        surnameList: [
            {
                surnameId: 40,
                surname: "Mr."
            },
            {
                surnameId: 41,
                surname: "Ms."
            },
            {
                surnameId: 42,
                surname: "Mrs."
            },
        ],
        relationTypeList: optionList.relationTypeList,
        qualificationList: optionList.qualificationList,
        martialStatusList: [
            { martialStatusId: 7, martialStatusName: 'Single' },
            { martialStatusId: 8, martialStatusName: 'Married' },
        ],
        languageList: optionList.languageList,
        casteTypeList: [
            { casteTypeId: 21, casteTypeName: 'OC' },
            { casteTypeId: 22, casteTypeName: 'BC' },
            { casteTypeId: 23, casteTypeName: 'MBC' },
            { casteTypeId: 24, casteTypeName: 'SC' },
            { casteTypeId: 25, casteTypeName: 'ST' },
        ],
        timeToJoinList: optionList?.timeToJoinList || [],
        proofTypeList: [],
        branchList: [],
        departmentList: [],
        designationList: [],
        repatriateList: [
            {
                repatriateName: 'Yes',
                repatriateId: '1'
            },
            {
                repatriateName: 'No',
                repatriateId: '0'
            },
        ],
        workingAtRepcoInstitutionList: [
            {
                workingAtRepcoInstitutionName: 'Yes',
                workingAtRepcoInstitutionId: '1'
            },
            {
                workingAtRepcoInstitutionName: 'No',
                workingAtRepcoInstitutionId: '0'
            },
        ],
        achievementTitleList: optionList?.achievementTitleList || [],
        achievementAtList: optionList?.achievementAtList || [],
        staffList: [],
        roleList: [],
    })

    const [wizardModel, setWizardModel] = useState(false);
    const [arrVal, setArrVal] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [tab, setTab] = useState('personalInfo');
    const [multiStateValue, setMultiStateValue] = useState([{}]);
    const [IsEditArrVal, setIsEditArrVal] = useState(false);
    const showSelectmodel = ['branchId', 'departmentId', 'bankAccountId'];
    const [stored, setStored] = useState([{ id: 1 }, { id: 2 }]);
    const showMultiAdd = ['staffDetails', 'qualification', 'language', 'workExperience', 'idProof', 'workExperience', 'staffQualification', 'achievements'];
    const [isEdit, setIsEdit] = useState(false);
    const [tabList, setTabList] = useState(staffTabs);
    const [modal, setModal] = useState(false);
    const [modelForm, setModelForm] = useState({});
    const [modelState, setModelState] = useState({});
    const [modelErrors, setModelErrors] = useState([]);
    // const [handleState, setHandleState] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getStaffRequest());
        dispatch(getRoleRequest());
        const req = {
            isActive: 1
        }
        dispatch(getBranchRequest());
        dispatch(getDesignationRequest(req));
        dispatch(getDepartmentRequest(req));
        dispatch(getProofTypeRequest(req));
    }, []);

    useEffect(() => {
        if (getStaffSuccess) {
            setIsLoading(false)
            setParentList(getStaffList)
            setOptionListState({
                ...optionListState,
                staffList: getStaffList,
            });
            dispatch(resetGetStaff())
        } else if (getStaffFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetStaff())
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (getStaffDetailsSuccess) {
            if (isPrint) {
                navigate('/staff-biodata-report', { state: getStaffDetailsList });
                closeModel();
                isPrint = false;
            } else {
                setMultiStateValue([getStaffDetailsList])
                setWizardModel(true)
            }
            setIsLoading(false)
            dispatch(resetGetDetailsStaff())
        } else if (getStaffDetailsFailure) {
            setIsLoading(false)
            setMultiStateValue([])
            dispatch(resetGetDetailsStaff())
        }
    }, [getStaffDetailsSuccess, getStaffDetailsFailure]);

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
        if (getRoleSuccess) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                roleList: getRoleList
            })
            dispatch(resetGetRole())
        } else if (getRoleFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                roleList: []
            })
            dispatch(resetGetRole())
        }
    }, [getRoleSuccess, getRoleFailure]);

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
            optionList.proofTypeList = getProofTypeList
            dispatch(resetGetProofType())
        } else if (getProofTypeFailure) {
            setIsLoading(false)
            setOptionListState({
                ...optionListState,
                proofTypeList: []
            })
            optionList.proofTypeList = [];
            dispatch(resetGetProofType())
        }
    }, [getProofTypeSuccess, getProofTypeFailure]);

    useEffect(() => {
        if (createStaffSuccess) {
            const temp_state = [createStaffData[0], ...parentList];
            setParentList(temp_state)
            const formData = new FormData();
            if (state?.staffProfileImageName.length > 0) {
                const originalFile = state?.staffProfileImageName[0];
                const renamedFile = new File([originalFile], `staff-profile-${createStaffData[0].staffCode}-${originalFile.name}`, {
                    type: originalFile.type,
                    lastModified: originalFile.lastModified,
                });
                formData.append('staffProfileImageName', renamedFile);
            }
            (state?.proofImage || []).map((ele) => {
                const originalFile = ele[0];
                const renamedFile = new File([originalFile], `staff-proof-${createStaffData[0].staffCode}-${originalFile.name}`, {
                    type: originalFile.type,
                    lastModified: originalFile.lastModified,
                });
                formData.append("proofImages", renamedFile);
            })
            dispatch(createUploadImagesRequest(formData, createStaffData[0].staffId))
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

            const formData = new FormData();

            if (state?.staffProfileImageName.length > 0) {
                const originalFile = state?.staffProfileImageName[0];
                const renamedFile = new File([originalFile], `staff-profile-${updateStaffData[0].staffCode}-${originalFile.name}`, {
                    type: originalFile.type,
                    lastModified: originalFile.lastModified,
                });
                formData.append('staffProfileImageName', renamedFile);
            }

            (state?.proofImage || []).map((ele) => {
                const originalFile = ele[0];
                const renamedFile = new File([originalFile], `staff-proof-${updateStaffData[0].staffCode}-${originalFile.name}`, {
                    type: originalFile.type,
                    lastModified: originalFile.lastModified,
                });
                formData.append("proofImages", renamedFile);
            })
            dispatch(createUploadImagesRequest(formData, updateStaffData[0].staffId))

            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaff())
        } else if (updateStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaff())
        }
    }, [updateStaffSuccess, updateStaffFailure]);

    useEffect(() => {
        if (deleteStaffSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = deleteStaffData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(deleteUpdateStaff())
        } else if (deleteStaffFailure) {
            showMessage('warning', errorMessage);
            dispatch(deleteUpdateStaff())
        }
    }, [deleteStaffSuccess, deleteStaffFailure]);

    // Branch Model Data
    useEffect(() => {
        if (createBranchSuccess) {
            const temp_state = [createBranchData[0], ...optionListState.branchList];
            setOptionListState({
                ...optionListState,
                branchList: temp_state
            })
            showMessage('success', 'Created Successfully');
            setModal(false)
            dispatch(resetCreateBranch())
        } else if (createBranchFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateBranch())
        }
    }, [createBranchSuccess, createBranchFailure]);

    // Department Model Data
    useEffect(() => {
        if (createDepartmentSuccess) {
            const temp_state = [createDepartmentData[0], ...optionListState.departmentList];
            setOptionListState({
                ...optionListState,
                departmentList: temp_state
            })
            showMessage('success', 'Created Successfully');
            setModal(false)
            dispatch(resetCreateDepartment())
        } else if (createDepartmentFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDepartment())
        }
    }, [createDepartmentSuccess, createDepartmentFailure]);

    // Designation Model Data
    useEffect(() => {
        if (createDesignationSuccess) {
            const temp_state = [createDesignationData[0], ...optionListState.designationList];
            setOptionListState({
                ...optionListState,
                designationList: temp_state
            })
            showMessage('success', 'Created Successfully');
            setModal(false)
            dispatch(resetCreateDesignation())
        } else if (createDesignationFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateDesignation())
        }
    }, [createDesignationSuccess, createDesignationFailure]);

    useEffect(() => {
        const updatedTabList = _.cloneDeep(tabList);
        if (tab === "jobRoleDetails" || tab === "personalInfo") {
            if (tab === "personalInfo" && Number.isInteger(state?.workingAtRepcoInstitution) || state?.workingAtRepcoInstitution) {
                const workingRepcoField = [
                    {
                        label: 'Working At Repco Institution',
                        name: 'workingAtRepcoInstitutionDescription',
                        inputType: 'textarea',
                        placeholder: "Enter working at repco institution detail",
                        classStyle: 'col-4',
                    },
                ];
                updatedTabList[0].children[6].formFields = _.concat(
                    updatedTabList[0].children[6].formFields,
                    workingRepcoField
                );
            }
            if (tab === "jobRoleDetails" && Number.isInteger(state?.userId) || state?.userId) {
                const userFields = [
                    {
                        label: 'User Name',
                        name: 'userName',
                        inputType: 'text',
                        placeholder: "Enter User Name",
                        classStyle: 'col-3',
                    },
                    {
                        label: 'Password',
                        name: 'password',
                        inputType: 'text',
                        placeholder: "Enter Password",
                        classStyle: 'col-3',
                    },
                ];
                updatedTabList[1].children[1].formFields = _.concat(
                    updatedTabList[1].children[1].formFields,
                    userFields
                );
            }
        }
        if (!state?.workingAtRepcoInstitution && !state?.userId) {
            setTabList(staffTabs);
        } else {
            setTabList(updatedTabList);
        }
    }, [tab, state?.workingAtRepcoInstitution, state?.userId]);

    useEffect(() => {
        if (IsEditArrVal != true) {
            if (tab == "idProof") {
                const remainingProofTypeList = optionList.proofTypeList.filter(proofData => {
                    return !arrVal.some(arrData => arrData.proofTypeId === proofData.proofTypeId);
                });
                setOptionListState({
                    ...optionListState,
                    proofTypeList: remainingProofTypeList
                })
            } else if (tab === "staffDetails") {
                const remainingRelationTypeList = optionList.relationTypeList.filter(relationData => {
                    return !arrVal.some(arrData => arrData.relationId === relationData.relationId);
                });
                setOptionListState({
                    ...optionListState,
                    relationTypeList: remainingRelationTypeList
                })
            } else if (tab === "staffQualification") {
                const remainingQualificationList = optionList.qualificationList.filter(qualificationData => {
                    return !arrVal.some(arrData => arrData.qualificationId === qualificationData.qualificationId);
                });
                setOptionListState({
                    ...optionListState,
                    qualificationList: remainingQualificationList
                })
            }
            else if (tab === "language") {
                const remainingLanguageList = optionList.languageList.filter(languageData => {
                    return !arrVal.some(arrData => arrData.languageId === languageData.languageId);
                });
                setOptionListState({
                    ...optionListState,
                    languageList: remainingLanguageList
                })
            }
        }
    }, [arrVal, IsEditArrVal])

    const onPrintDesign = (data) => {
        const printReq = {
            staffId: data?.staffId
        }
        isPrint = true;
        dispatch(getStaffDetailsRequest(printReq))
    }

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
            maximumDOB: moment().format("YYYY-MM-DD"),
            dateOfJoining: moment().format("YYYY-MM-DD"),
        });
        setErrors([]);
    };

    const onModelFormClear = () => {
        setModelState({});
        setModelErrors([]);
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
        isPrint = false;
        dispatch(getStaffDetailsRequest(editReq))
        setSelectedItem(data)
        setSelectedIndex(index)
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        let proofImage = []

        const keysToMove = ['departmentId', 'designationId', 'branchId', 'dateOfJoining', 'roleId'];

        const extracted = _.pick(multiStateValue[0]?.jobRoleDetails, keysToMove);
        const newSourceObj = _.omit(multiStateValue[0]?.jobRoleDetails, keysToMove);
        const targetObj = { ...multiStateValue[0]?.personalInfo, ...extracted };

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
            proofImage: proofImage,
            staffProfileImageName: targetObj.staffProfileImageName
        })
        targetObj.staffProfileImageName = '';
        targetObj.referencesBy = targetObj?.referencesBy.toString()
        targetObj.preferredLocationId = targetObj?.preferredLocationId.toString()
        const submitRequest = {
            personalInfoData: targetObj || {},
            jobRoleDetails: newSourceObj || {},
            idProof: multiStateValue[0]?.idProof || [],
            staffDetails: multiStateValue[0]?.staffDetails || [],
            staffQualification: multiStateValue[0]?.staffQualification || [],
            language: multiStateValue[0]?.language || [],
            workExperience: multiStateValue[0]?.workExperience || [],
            staffAchievements: multiStateValue[0]?.achievements || [],
        }
        // return;
        if (isEdit) {
            dispatch(updateStaffRequest(submitRequest, selectedItem.staffId))
        } else {
            dispatch(createStaffRequest(submitRequest))
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
            age: age
        }));
    }

    // const onHandleUserCreditial = (e, formName) => {
    //     setState((prev) => ({
    //         ...prev,
    //         [formName]: e.target.checked,
    //     }));


    //     const updatedTabList = _.cloneDeep(tabList);
    //     const changedArr = [
    //         {
    //             'label': 'User Name',
    //             'name': 'userName',
    //             'inputType': 'text',
    //             'placeholder': "Enter User Name",
    //             'classStyle': 'col-3',
    //             // require: true,
    //         },
    //         {
    //             'label': 'Password',
    //             'name': 'password',
    //             'inputType': 'text',
    //             'placeholder': "Enter Password",
    //             'classStyle': 'col-3',
    //             // require: true,
    //         },
    //     ]
    //     if (e.target.checked) {
    //         updatedTabList[1].children[1].formFields = _.concat(
    //             updatedTabList[1].children[1].formFields,
    //             changedArr
    //         );
    //     } else {
    //         updatedTabList[1].children[1].formFields = _.reject(
    //             updatedTabList[1].children[1].formFields,
    //             (field) => _.some(changedArr, { name: field.name })
    //         );
    //     }
    //     setTabList(updatedTabList);
    // }


    // const onHandleRepcoInstitution = (e, formName) => {
    //     setState((prev) => ({
    //         ...prev,
    //         [formName]: e.target.checked,
    //     }));

    //     const updatedTabList = _.cloneDeep(tabList);
    //     const changedArr = [
    //         {
    //             'label': 'Working At Repco Institution',
    //             'name': 'workingAtRepcoInstitutionDescription',
    //             'inputType': 'textarea',
    //             'placeholder': "Enter working at repco institution detail",
    //             'classStyle': 'col-4',
    //             // require: true,
    //         },
    //     ]
    //     if (e.target.checked) {
    //         updatedTabList[1].children[3].formFields = _.concat(
    //             updatedTabList[1].children[3].formFields,
    //             changedArr
    //         );
    //     } else {
    //         updatedTabList[1].children[3].formFields = _.reject(
    //             updatedTabList[1].children[3].formFields,
    //             (field) => _.some(changedArr, { name: field.name })
    //         );
    //     }
    //     setTabList(updatedTabList);
    // }

    const onHandleSalary = (e) => {
        const esi = 0.0175
        const pf = 0.12
        const annualAmount = e.target.value
        const monthlyAmount = parseInt(annualAmount / 12)
        const esiAmount = parseInt(monthlyAmount * esi / 100)
        const pfAmount = parseInt(monthlyAmount * pf / 100)
        const monthlySalary = monthlyAmount - esiAmount - pfAmount
        setState({
            ...state,
            [e.target.name]: annualAmount,
            monthlyAmount: monthlySalary,
            esiAmount: esiAmount,
            pfAmount: pfAmount,
        })
    }

    const handleEditTabTable = async (data, index, tabName) => {
        switch (tabName) {
            case "idProof":
                setOptionListState(prevState => {
                    const updatedProofList = [...prevState.proofTypeList, data];
                    return { ...prevState, proofTypeList: updatedProofList };
                });
                break;
            case "staffDetails":
                setOptionListState(prevState => {
                    const updatedRelationList = [...prevState.relationTypeList, data];
                    return { ...prevState, relationTypeList: updatedRelationList };
                });
                break;
            case "staffQualification":
                setOptionListState(prevState => {
                    const updatedQualificationList = [...prevState.qualificationList, data];
                    return { ...prevState, qualificationList: updatedQualificationList };
                });
                break;
            case "language":
                data.read = JSON.parse(data?.read || false)
                data.write = JSON.parse(data?.write || false)
                data.speak = JSON.parse(data?.speak || false)
                setOptionListState(prevState => {
                    const updatedLanguageList = [...prevState.languageList, data];
                    return { ...prevState, languageList: updatedLanguageList };
                });
                break;
            default:
                break;
        }

        setIsEditArrVal(true);
        const updatedState = { ...data, selectedIdx: index };
        setState(updatedState);
    };

    //handleDelete
    const handleDeleteTabTable = async (data, idx, selectedName) => {
        if (isEdit) {
            if (selectedName === "idProof") {
                dispatch(deleteStaffProofRequest(data.staffProofId))
            } else if (selectedName === "workExperience") {
                dispatch(deleteStaffWorkExperienceRequest(data.workExperienceId))
            } else if (selectedName === "language") {
                dispatch(deleteStaffLanguageRequest(data.staffKnownLanguageId))
            } else if (selectedName === "staffQualification") {
                dispatch(deleteStaffQualificationRequest(data.staffQualificationId))
            } else if (selectedName === "staffDetails") {
                dispatch(deleteStaffRelationRequest(data.staffRelationDetailsId))
            }
        }
        let remainingData = _.remove(arrVal, function (item, index) {
            return idx != index;
        });
        setArrVal(remainingData);
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0,
        }
        setSelectedIndex(index)
        dispatch(deleteStaffRequest(submitRequest, data.staffId))
    };

    const toggleModal = (form) => {
        onModelFormClear();
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

    const onFormModelSubmit = async () => {
        let submitRequest = {};
        switch (modelForm?.name) {
            case "designationId":
                submitRequest = {
                    designationName: modelState?.designationName || ""
                }
                dispatch(createDesignationRequest(submitRequest))
                break;
            case "departmentId":
                submitRequest = {
                    departmentName: modelState?.departmentName || ""
                }
                dispatch(createDepartmentRequest(submitRequest))
                break;
            case "branchId":
                submitRequest = {
                    branchName: modelState?.branchName || "",
                    address: modelState?.address || "",
                    city: modelState?.city || "",
                    pincode: modelState?.pincode || "",
                    email: modelState?.email || "",
                    contactNo: modelState?.contactNo || "",
                }
                dispatch(createBranchRequest(submitRequest))
                break;
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
                wizardModel ? (
                    <React.Fragment>
                        <ModelViewBox
                            modal={modal}
                            setModel={setModal}
                            modelHeader={'Branch'}
                            modelSize={'md'}
                            isEdit={isEdit}
                            handleSubmit={handleValidation}
                        >
                            <FormLayout
                                dynamicForm={modalFields[modelForm?.name]}
                                handleSubmit={onFormModelSubmit}
                                setState={setModelState}
                                state={modelState}
                                ref={errorHandle}
                                noOfColumns={1}
                                errors={modelErrors}
                                setErrors={setModelErrors}
                            />
                        </ModelViewBox>
                        <WizardWithProgressbar
                            arrVal={arrVal}
                            setArrVal={setArrVal}
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                            isEdit={isEdit}
                            setTab={setTab}
                            tab={tab}
                            onChangeCallBack={{ "onHandleSalary": onHandleSalary, "onHandleProofType": onHandleProofType, "handleDateChange": handleDateChange, }}
                            // "onHandleUserCreditial": onHandleUserCreditial, "onHandleRepcoInstitution": onHandleRepcoInstitution 
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
