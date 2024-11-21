import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { attendanceInchargeContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createAttendanceInchargeRequest, getBranchRequest,  getStaffRequest,getDepartmentRequest, getAttendanceInchargeRequest, resetCreateAttendanceIncharge, resetGetBranch,  resetGetStaff, resetGetDepartment, resetGetAttendanceIncharge, resetUpdateAttendanceIncharge, updateAttendanceInchargeRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getAttendanceInchargeSuccess, getAttendanceInchargeList, getAttendanceInchargeFailure,
        getBranchSuccess, getBranchList, getBranchFailure,
        getDepartmentSuccess, getDepartmentList, getDepartmentFailure,
        createAttendanceInchargeSuccess, createAttendanceInchargeData, createAttendanceInchargeFailure,
        updateAttendanceInchargeSuccess, updateAttendanceInchargeData, updateAttendanceInchargeFailure,
        errorMessage,getStaffSuccess,
        getStaffList,
        getStaffFailure,

    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getAttendanceInchargeSuccess: state.attendanceInchargeReducer.getAttendanceInchargeSuccess,
        getAttendanceInchargeList: state.attendanceInchargeReducer.getAttendanceInchargeList,
        getAttendanceInchargeFailure: state.attendanceInchargeReducer.getAttendanceInchargeFailure,

        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        getDepartmentSuccess: state.departmentReducer.getDepartmentSuccess,
        getDepartmentList: state.departmentReducer.getDepartmentList,
        getDepartmentFailure: state.departmentReducer.getDepartmentFailure,

        createAttendanceInchargeSuccess: state.attendanceInchargeReducer.createAttendanceInchargeSuccess,
        createAttendanceInchargeData: state.attendanceInchargeReducer.createAttendanceInchargeData,
        createAttendanceInchargeFailure: state.attendanceInchargeReducer.createAttendanceInchargeFailure,

        updateAttendanceInchargeSuccess: state.attendanceInchargeReducer.updateAttendanceInchargeSuccess,
        updateAttendanceInchargeData: state.attendanceInchargeReducer.updateAttendanceInchargeData,
        updateAttendanceInchargeFailure: state.attendanceInchargeReducer.updateAttendanceInchargeFailure,

        errorMessage: state.attendanceInchargeReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Staff Name',
            accessor: 'staffName',
            sort: true,
        }, 
        {
            Header: 'Branch Name',
            accessor: 'branchName',
            sort: true,
        }, 
        {
            Header: 'Department Name',
            accessor: 'departmentName',
            sort: true,
        }, 
        {
            Header: 'Status',
            accessor: 'statusId',
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
                            <i className={'fe-edit-1'}></i>
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
        branchList: [],
        departmentList: [],
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)        
        dispatch(getAttendanceInchargeRequest());
        dispatch(getStaffRequest());
        const req = {
            isActive: 1
        }
        dispatch(getBranchRequest());  
        dispatch(getDepartmentRequest());        
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
        if (getAttendanceInchargeSuccess) {
            setIsLoading(false)
            setParentList(getAttendanceInchargeList)
            dispatch(resetGetAttendanceIncharge())
        } else if (getAttendanceInchargeFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetAttendanceIncharge())
        }
    }, [getAttendanceInchargeSuccess, getAttendanceInchargeFailure]);

    useEffect(() => {
        if (createAttendanceInchargeSuccess) {
            const temp_state = [createAttendanceInchargeData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateAttendanceIncharge())
        } else if (createAttendanceInchargeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateAttendanceIncharge())
        }
    }, [createAttendanceInchargeSuccess, createAttendanceInchargeFailure]);

    useEffect(() => {
        if (updateAttendanceInchargeSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateAttendanceInchargeData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateAttendanceIncharge())
        } else if (updateAttendanceInchargeFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateAttendanceIncharge())
        }
    }, [updateAttendanceInchargeSuccess, updateAttendanceInchargeFailure]);


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



    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            staffId: '',
            departmentId: '',
            branchId: '',
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
            departmentId: data?.departmentId || "",
            branchId: data?.branchId || ""
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
            departmentId: state?.departmentId || "",
            branchId: state?.branchId || "",
        }
        if (isEdit) {
            dispatch(updateAttendanceInchargeRequest(submitRequest, selectedItem.attendanceInchargeId))
        } else {
            console.log(submitRequest)
            dispatch(createAttendanceInchargeRequest(submitRequest))
        }
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
                Title={'Attendance Incharge List'}
                data={parentList || []}
                pageSize={25}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Attendance Incharge'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={attendanceInchargeContainer}
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
