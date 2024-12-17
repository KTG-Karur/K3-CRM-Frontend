import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { settingBenefitContainer } from './formFieldData';
import Table from '../../components/Table';
import { dateConversion, showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createSettingBenefitRequest,
    getActivityRequest,
    getSettingBenefitRequest,
    resetCreateSettingBenefit,
    resetGetActivity,
    resetGetSettingBenefit,
    resetUpdateSettingBenefit,
    updateSettingBenefitRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import _ from 'lodash';

let isEdit = false;

function Index() {
    const { dispatch, appSelector } = useRedux();

    const {
        getSettingBenefitSuccess,
        getSettingBenefitList,
        getSettingBenefitFailure,
        getActivitySuccess,
        getActivityList,
        getActivityFailure,
        createSettingBenefitSuccess,
        createSettingBenefitData,
        createSettingBenefitFailure,
        updateSettingBenefitSuccess,
        updateSettingBenefitData,
        updateSettingBenefitFailure,
        errorMessage,
    } = appSelector((state) => ({
        getSettingBenefitSuccess: state.settingBenefitReducer.getSettingBenefitSuccess,
        getSettingBenefitList: state.settingBenefitReducer.getSettingBenefitList,
        getSettingBenefitFailure: state.settingBenefitReducer.getSettingBenefitFailure,

        getActivitySuccess: state.activityReducer.getActivitySuccess,
        getActivityList: state.activityReducer.getActivityList,
        getActivityFailure: state.activityReducer.getActivityFailure,

        createSettingBenefitSuccess: state.settingBenefitReducer.createSettingBenefitSuccess,
        createSettingBenefitData: state.settingBenefitReducer.createSettingBenefitData,
        createSettingBenefitFailure: state.settingBenefitReducer.createSettingBenefitFailure,

        updateSettingBenefitSuccess: state.settingBenefitReducer.updateSettingBenefitSuccess,
        updateSettingBenefitData: state.settingBenefitReducer.updateSettingBenefitData,
        updateSettingBenefitFailure: state.settingBenefitReducer.updateSettingBenefitFailure,

        errorMessage: state.settingBenefitReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Benefit Name',
            accessor: 'benefitName',
            sort: true,
        },
        {
            Header: 'Percentage',
            accessor: 'benefitPercentage',
            sort: true,
        },

        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => {
                const activeChecker = row.original.isActive;
                const iconColor = activeChecker ? 'text-danger' : 'text-warning';
                const deleteMessage = activeChecker ? 'You want to In-Active...?' : 'You want to retrive this Data...?';
                return (
                    <div>
                        <span
                            className="text-success  me-2 cursor-pointer"
                            onClick={() => onEditForm(row.original, row.index)}>
                            <i className={'fe-edit-1'}></i>
                        </span>
                    </div>
                );
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [optionListState, setOptionListState] = useState({});
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true);
        dispatch(getSettingBenefitRequest());
    }, []);

    useEffect(() => {
        if (getSettingBenefitSuccess) {
            setIsLoading(false);
            setParentList(getSettingBenefitList);
            dispatch(resetGetSettingBenefit());
        } else if (getSettingBenefitFailure) {
            setIsLoading(false);
            setParentList([]);
            dispatch(resetGetSettingBenefit());
        }
    }, [getSettingBenefitSuccess, getSettingBenefitFailure]);

    useEffect(() => {
        if (createSettingBenefitSuccess) {
            const temp_state = [createSettingBenefitData[0], ...parentList];
            setParentList(temp_state);
            showMessage('success', 'Created Successfully');
            closeModel();
            dispatch(resetCreateSettingBenefit());
        } else if (createSettingBenefitFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateSettingBenefit());
        }
    }, [createSettingBenefitSuccess, createSettingBenefitFailure]);

    useEffect(() => {
        if (updateSettingBenefitSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateSettingBenefitData[0];
            setParentList(temp_state);
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel();
            dispatch(resetUpdateSettingBenefit());
        } else if (updateSettingBenefitFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateSettingBenefit());
        }
    }, [updateSettingBenefitSuccess, updateSettingBenefitFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear();
        setModal(false);
    };

    const onFormClear = () => {
        setState({
            ...state,
            benefitName: '',
            benefitPercentage: '',
        });
    };

    const createModel = () => {
        onFormClear();
        isEdit = false;
        setModal(true);
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            benefitName: data?.benefitName || '',
            benefitPercentage: data?.benefitPercentage || '',
        });
        isEdit = true;
        setSelectedItem(data);
        setSelectedIndex(index);
        setModal(true);
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const onFormSubmit = async () => {
        const submitRequest = {
            benefitName: state?.benefitName || '',
            benefitPercentage: state?.benefitPercentage || '',
        };
        if (isEdit) {
            dispatch(updateSettingBenefitRequest(submitRequest, selectedItem.settingBenefitId));
        } else {
            dispatch(createSettingBenefitRequest(submitRequest));
        }
    };

    return (
        <React.Fragment>
            <NotificationContainer />
            {isLoading ? (
                <div className="bg-light opacity-0.25">
                    <div className="d-flex justify-content-center m-5">
                        <Spinner className="mt-5 mb-5" animation="border" />
                    </div>
                </div>
            ) : (
                <Table
                    columns={columns}
                    Title={'Setting Benefit List'}
                    data={parentList || []}
                    pageSize={25}
                    toggle={parentList.length >= 2 ? false : true}
                />
            )}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Setting Benefit'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={settingBenefitContainer}
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
