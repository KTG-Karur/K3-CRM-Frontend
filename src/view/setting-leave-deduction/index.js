import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { settingLeaveDeductionContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, removeExistsList, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createSettingLeaveDeductionRequest, getActivityRequest, getSettingLeaveDeductionRequest, resetCreateSettingLeaveDeduction, resetGetActivity, resetGetSettingLeaveDeduction, resetUpdateSettingLeaveDeduction, updateSettingLeaveDeductionRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;
const leaveList = [
    { leaveTypeId: 26, leaveTypeName: 'CL' },
    { leaveTypeId: 27, leaveTypeName: 'SL' },
]
function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getSettingLeaveDeductionSuccess, getSettingLeaveDeductionList, getSettingLeaveDeductionFailure,
        getActivitySuccess, getActivityList, getActivityFailure,
        createSettingLeaveDeductionSuccess, createSettingLeaveDeductionData, createSettingLeaveDeductionFailure,
        updateSettingLeaveDeductionSuccess, updateSettingLeaveDeductionData, updateSettingLeaveDeductionFailure,
        errorMessage,

    } = appSelector((state) => ({
        getSettingLeaveDeductionSuccess: state.settingLeaveDeductionReducer.getSettingLeaveDeductionSuccess,
        getSettingLeaveDeductionList: state.settingLeaveDeductionReducer.getSettingLeaveDeductionList,
        getSettingLeaveDeductionFailure: state.settingLeaveDeductionReducer.getSettingLeaveDeductionFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createSettingLeaveDeductionSuccess: state.settingLeaveDeductionReducer.createSettingLeaveDeductionSuccess,
        createSettingLeaveDeductionData: state.settingLeaveDeductionReducer.createSettingLeaveDeductionData,
        createSettingLeaveDeductionFailure: state.settingLeaveDeductionReducer.createSettingLeaveDeductionFailure,

        updateSettingLeaveDeductionSuccess: state.settingLeaveDeductionReducer.updateSettingLeaveDeductionSuccess,
        updateSettingLeaveDeductionData: state.settingLeaveDeductionReducer.updateSettingLeaveDeductionData,
        updateSettingLeaveDeductionFailure: state.settingLeaveDeductionReducer.updateSettingLeaveDeductionFailure,

        errorMessage: state.settingLeaveDeductionReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Leave Type',
            accessor: 'leaveTypeName',
            sort: true,
        },
        {
            Header: 'Percentage',
            accessor: 'leaveDeductionPercentage',
            sort: true,
        },
        {
            Header: 'Count Day',
            accessor: 'leaveCountDay',
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
        leaveTypeList: leaveList,
    })
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getSettingLeaveDeductionRequest());
    }, []);

    useEffect(() => {
        if (getSettingLeaveDeductionSuccess) {
            setIsLoading(false)
            setParentList(getSettingLeaveDeductionList);
            dispatch(resetGetSettingLeaveDeduction())
        } else if (getSettingLeaveDeductionFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSettingLeaveDeduction())
        }
    }, [getSettingLeaveDeductionSuccess, getSettingLeaveDeductionFailure]);

    useEffect(() => {
        if (createSettingLeaveDeductionSuccess) {
            const temp_state = [createSettingLeaveDeductionData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateSettingLeaveDeduction())
        } else if (createSettingLeaveDeductionFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateSettingLeaveDeduction())
        }
    }, [createSettingLeaveDeductionSuccess, createSettingLeaveDeductionFailure]);

    useEffect(() => {
        if (updateSettingLeaveDeductionSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateSettingLeaveDeductionData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateSettingLeaveDeduction())
        } else if (updateSettingLeaveDeductionFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateSettingLeaveDeduction())
        }
    }, [updateSettingLeaveDeductionSuccess, updateSettingLeaveDeductionFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            leaveCountDay: '',
            leaveTypeId: '',
            leaveDeductionPercentage: '',
        });
    };

    const createModel = async () => {
        onFormClear()
        isEdit = false;
        setModal(true)
        const remainingLeaveDeductionList = await removeExistsList(optionListState.leaveTypeList, parentList, 'leaveTypeId');
        setOptionListState({
            ...optionListState,
            leaveTypeList: remainingLeaveDeductionList
        })
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            leaveTypeId: data?.leaveTypeId || "",
            leaveCountDay: data?.leaveCountDay || "",
            leaveDeductionPercentage: data?.leaveDeductionPercentage || ""
        });
        setOptionListState({
            ...optionListState,
            leaveTypeList: leaveList
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
            leaveTypeId: state?.leaveTypeId || "",
            leaveCountDay: state?.leaveCountDay || "",
            leaveDeductionPercentage: state?.leaveDeductionPercentage || ""
        }
        if (isEdit) {
            dispatch(updateSettingLeaveDeductionRequest(submitRequest, selectedItem.settingLeaveDeductionId))
        } else {
            dispatch(createSettingLeaveDeductionRequest(submitRequest))
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
                    Title={'Leave Deduction List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={createModel}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Leave Deduction'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={settingLeaveDeductionContainer}
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
