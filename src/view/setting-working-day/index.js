import React, { useEffect, useRef, useState } from 'react';
import { Badge, Card, Col, Row, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { settingWorkingDayContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createSettingWorkingDayRequest, getSettingWorkingDayRequest, resetCreateSettingWorkingDay, resetGetSettingWorkingDay, resetUpdateSettingWorkingDay, updateSettingWorkingDayRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';
import CardViewBox from '../../components/Atom/CardViewBox';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getSettingWorkingDaySuccess, getSettingWorkingDayList, getSettingWorkingDayFailure,
        createSettingWorkingDaySuccess, createSettingWorkingDayData, createSettingWorkingDayFailure,
        updateSettingWorkingDaySuccess, updateSettingWorkingDayData, updateSettingWorkingDayFailure,
        errorMessage,

    } = appSelector((state) => ({
        getSettingWorkingDaySuccess: state.settingWorkingDayReducer.getSettingWorkingDaySuccess,
        getSettingWorkingDayList: state.settingWorkingDayReducer.getSettingWorkingDayList,
        getSettingWorkingDayFailure: state.settingWorkingDayReducer.getSettingWorkingDayFailure,

        createSettingWorkingDaySuccess: state.settingWorkingDayReducer.createSettingWorkingDaySuccess,
        createSettingWorkingDayData: state.settingWorkingDayReducer.createSettingWorkingDayData,
        createSettingWorkingDayFailure: state.settingWorkingDayReducer.createSettingWorkingDayFailure,

        updateSettingWorkingDaySuccess: state.settingWorkingDayReducer.updateSettingWorkingDaySuccess,
        updateSettingWorkingDayData: state.settingWorkingDayReducer.updateSettingWorkingDayData,
        updateSettingWorkingDayFailure: state.settingWorkingDayReducer.updateSettingWorkingDayFailure,

        errorMessage: state.settingWorkingDayReducer.errorMessage,
    }));



    const [state, setState] = useState({
        workDay: [],
        settingWorkingDayId: 1
    });
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({
        workDayList: [
            { workDay: 1, workDayName: 'Monday' },
            { workDay: 2, workDayName: 'Tuesday' },
            { workDay: 3, workDayName: 'Wednesday' },
            { workDay: 4, workDayName: 'Thursday' },
            { workDay: 5, workDayName: 'Friday' },
            { workDay: 6, workDayName: 'Saturday' },
            { workDay: 7, workDayName: 'Sunday' },
        ],
    });
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [card, setCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        const params = {
            settingWorkingDayId: 1
        }
        dispatch(getSettingWorkingDayRequest(params));
    }, []);

    useEffect(() => {
        if (getSettingWorkingDaySuccess) {
            setIsLoading(false)
            const data = {
                workDay: JSON.parse(getSettingWorkingDayList[0]?.workDay || '[]'),
                logoName: getSettingWorkingDayList[0]?.logoName || '',
                settingWorkingDayId: 1
            }
            if (getSettingWorkingDayList.length > 0) {
                isEdit = true;
            } else {
                isEdit = false;
            }
            setState(data)
            dispatch(resetGetSettingWorkingDay())
        } else if (getSettingWorkingDayFailure) {
            setIsLoading(false)
            setState({
                workDay: [],
                settingWorkingDayId: 1
            })
            dispatch(resetGetSettingWorkingDay())
        }
    }, [getSettingWorkingDaySuccess, getSettingWorkingDayFailure]);

    useEffect(() => {
        if (createSettingWorkingDaySuccess) {
            const data = {
                workDay: JSON.parse(createSettingWorkingDayData[0]?.workDay || '[]'),
                logoName: createSettingWorkingDayData[0]?.logoName || '',
                settingWorkingDayId: 1
            }
            setState(data)
            isEdit = true;
            showMessage('success', 'Created Successfully');
            dispatch(resetCreateSettingWorkingDay())
        } else if (createSettingWorkingDayFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateSettingWorkingDay())
        }
    }, [createSettingWorkingDaySuccess, createSettingWorkingDayFailure]);

    useEffect(() => {
        if (updateSettingWorkingDaySuccess) {
            const data = {
                workDay: JSON.parse(updateSettingWorkingDayData[0]?.workDay || '[]'),
                logoName: updateSettingWorkingDayData[0]?.logoName || '',
                settingWorkingDayId: 1
            }
            setState(data)
            isEdit && showMessage('success', 'Updated Successfully');
            dispatch(resetUpdateSettingWorkingDay())
        } else if (updateSettingWorkingDayFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateSettingWorkingDay())
        }
    }, [updateSettingWorkingDaySuccess, updateSettingWorkingDayFailure]);

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    }

    const onFormSubmit = async () => {
        let submitRequest = {
            workDay: JSON.stringify(state.workDay),
        }
        if (isEdit) {
            dispatch(updateSettingWorkingDayRequest(submitRequest, state.settingWorkingDayId))
        } else {
            submitRequest.settingWorkingDayId = state.settingWorkingDayId;
            dispatch(createSettingWorkingDayRequest(submitRequest))
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
                        dynamicForm={settingWorkingDayContainer}
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
