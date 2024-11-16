import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Col, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { settingContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createSettingRequest, getSettingRequest, resetCreateSetting, resetGetSetting, resetUpdateSetting, updateSettingRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import CardViewBox from '../../components/Atom/CardViewBox';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getSettingSuccess, getSettingList, getSettingFailure,
        createSettingSuccess, createSettingData, createSettingFailure,
        updateSettingSuccess, updateSettingData, updateSettingFailure,
        errorMessage,

    } = appSelector((state) => ({
        getSettingSuccess: state.settingReducer.getSettingSuccess,
        getSettingList: state.settingReducer.getSettingList,
        getSettingFailure: state.settingReducer.getSettingFailure,

        createSettingSuccess: state.settingReducer.createSettingSuccess,
        createSettingData: state.settingReducer.createSettingData,
        createSettingFailure: state.settingReducer.createSettingFailure,

        updateSettingSuccess: state.settingReducer.updateSettingSuccess,
        updateSettingData: state.settingReducer.updateSettingData,
        updateSettingFailure: state.settingReducer.updateSettingFailure,

        errorMessage: state.settingReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'From Day',
            accessor: 'fromDay',
            sort: true,
        },
        {
            Header: 'To Day',
            accessor: 'toDay',
            sort: true,
        },
        {
            Header: 'ESI',
            accessor: 'esiPercentage',
            sort: true,
        },
        {
            Header: 'PF',
            accessor: 'pfPercentage',
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

    const [state, setState] = useState({
        workDayId: []
    });
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        workDayList: [
            { workDayId: 1, workDayName: 'Monday' },
            { workDayId: 2, workDayName: 'Tuesday' },
            { workDayId: 3, workDayName: 'Wednesday' },
            { workDayId: 4, workDayName: 'Thursday' },
            { workDayId: 5, workDayName: 'Friday' },
            { workDayId: 6, workDayName: 'Saturday' },
            { workDayId: 7, workDayName: 'Sunday' },
        ],
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [card, setCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();


    useEffect(() => {
        setIsLoading(true)
        dispatch(getSettingRequest());
    }, []);

    useEffect(() => {
        if (getSettingSuccess) {
            setIsLoading(false)
            setParentList(getSettingList)
            dispatch(resetGetSetting())
        } else if (getSettingFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSetting())
        }
    }, [getSettingSuccess, getSettingFailure]);

    useEffect(() => {
        if (createSettingSuccess) {
            const temp_state = [createSettingData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateSetting())
        } else if (createSettingFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateSetting())
        }
    }, [createSettingSuccess, createSettingFailure]);

    useEffect(() => {
        if (updateSettingSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateSettingData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateSetting())
        } else if (updateSettingFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateSetting())
        }
    }, [updateSettingSuccess, updateSettingFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            workDayId: '',
            esiPercentage: '',
            pfPercentage: '',
            permissionDeduction: '',
            leaveDeduction: '',
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
            workDayId: data?.fromDay || "",
            esiPercentage: data?.esiPercentage || "",
            pfPercentage: data?.pfPercentage || "",
            permissionDeduction: data?.permissionDeduction || "",
            leaveDeduction: data?.leaveDeduction || "",
            settingId: data?.settingId || ""
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
            workDayId: state?.fromDay || "",
            esiPercentage: state?.esiPercentage || "",
            pfPercentage: state?.pfPercentage || "",
            permissionDeduction: state?.permissionDeduction || "",
            leaveDeduction: state?.leaveDeduction || "",
            settingId: state?.settingId || ""
        }
        if (isEdit) {
            dispatch(updateSettingRequest(submitRequest, selectedItem.settingId))
        } else {
            console.log(submitRequest)
            dispatch(createSettingRequest(submitRequest))
        }
    };

    const onHandleCheckbox = (value, name) => {
        setState((prevState) => {
            const currentSelections = prevState[name] || [];
            const newSelections = currentSelections.includes(value)
                ? currentSelections.filter((item) => item !== value)
                : [...currentSelections, value];

            return {
                ...prevState,
                [name]: newSelections
            };
        });
    }



    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? <div className='bg-light opacity-0.25'>
                <div className="d-flex justify-content-center m-5">
                    <Spinner className='mt-5 mb-5' animation="border" />
                </div>
            </div> :                
            <CardViewBox
                card={card}
                setCard={setCard}
                cardHeader={'Work Day Setting'}
                cardSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={settingContainer}
                    handleSubmit={onFormSubmit}
                    optionListState={optionListState}
                    setState={setState}
                    onChangeCallBack={{ onHandleCheckbox: onHandleCheckbox }}
                    state={state}
                    ref={errorHandle}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </CardViewBox>}
            
        </React.Fragment>
    );
}

export default Index;
