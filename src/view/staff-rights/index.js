import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Col, Image, Row, Spinner } from 'react-bootstrap';
import { formContainer, formContainerStaffRights } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createStaffRightsRequest,
    getStaffRequest,
    getSettingsRequest,
    getStaffRightsRequest,
    resetCreateStaffRights,
    resetGetStaff,
    resetGetSettings,
    resetGetStaffRights,
    resetUpdateSettings,
    updateSettingsRequest,
    updateStaffRightsRequest,
    resetUpdateStaffRights,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import FormLayout from '../../utils/formLayout';
import { Form } from 'react-bootstrap';
import { isNull } from 'lodash';

let isEdit = false;
function Index() {
    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess,
        getStaffList,
        getStaffFailure,

        getStaffRightsSuccess,
        getStaffRightsData,
        getStaffRightsFailure,

        createStaffRightsSuccess,
        createStaffRightsData,
        createStaffRightsFailure,

        updateStaffRightsSuccess,
        updateStaffRightsData,
        updateStaffRightsFailure,

        errorMessage,
    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getStaffRightsSuccess: state.staffRightsReducer.getStaffRightsSuccess,
        getStaffRightsData: state.staffRightsReducer.getStaffRightsData,
        getStaffRightsFailure: state.staffRightsReducer.getStaffRightsFailure,

        createStaffRightsSuccess: state.staffRightsReducer.createStaffRightsSuccess,
        createStaffRightsData: state.staffRightsReducer.createStaffRightsData,
        createStaffRightsFailure: state.staffRightsReducer.createStaffRightsFailure,

        updateStaffRightsSuccess: state.staffRightsReducer.updateStaffRightsSuccess,
        updateStaffRightsData: state.staffRightsReducer.updateStaffRightsData,
        updateStaffRightsFailure: state.staffRightsReducer.updateStaffRightsFailure,

        errorMessage: state.staffRightsReducer.errorMessage,
    }));

    const itemList = [
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'VIE',
            accessor: 'view',
            Cell: ({ row, value }) => {
                return (
                    <div>
                        {row.original?.view && (
                            <Form.Check
                                key={row.index}
                                type="checkbox"
                                name={row.original?.view}
                                id={`basic-checkbox-0`}
                                checked={state.staffRights[row.index]?.[row.original?.view]}
                                className={'mb-2 form-check-Primary'}
                                onChange={(e) => handleChange(e, e.target.name, row.index)}
                            />
                        )}
                    </div>
                );
            },
        },
        {
            Header: 'CRT',
            accessor: 'create',
            Cell: ({ row, value }) => {
                return (
                    <div>
                        {row.original?.create && (
                            <Form.Check
                                key={row.index}
                                type="checkbox"
                                name={row.original?.create}
                                id={`basic-checkbox-0`}
                                checked={state.staffRights[row.index]?.[row.original?.create]}
                                className={'mb-2 form-check-Primary'}
                                onChange={(e) => handleChange(e, e.target.name, row.index)}
                            />
                        )}
                    </div>
                );
            },
        },
        {
            Header: 'UPD',
            accessor: 'update',
            Cell: ({ row, value }) => {
                return (
                    <div>
                        {row.original?.update && (
                            <Form.Check
                                key={row.index}
                                type="checkbox"
                                name={row.original?.update}
                                id={`basic-checkbox-0`}
                                checked={state.staffRights[row.index]?.[row.original?.update]}
                                className={'mb-2 form-check-Primary'}
                                onChange={(e) => handleChange(e, e.target.name, row.index)}
                            />
                        )}
                    </div>
                );
            },
        },
        {
            Header: 'DEL',
            accessor: 'delete',
            Cell: ({ row, value }) => {
                return (
                    <div>
                        {row.original?.delete && (
                            <Form.Check
                                key={row.index}
                                type="checkbox"
                                name={row.original?.delete}
                                id={`basic-checkbox-0`}
                                checked={state.staffRights[row.index]?.[row.original?.delete]}
                                className={'mb-2 form-check-Primary'}
                                onChange={(e) => handleChange(e, e.target.name, row.index)}
                            />
                        )}
                    </div>
                );
            },
        },
    ];

    const handleChange = (e, name, index) => {
        setState((prevState) => {
            const updatedStaffRightsList = [...prevState.staffRights];

            updatedStaffRightsList[index] = {
                ...updatedStaffRightsList[index],
                [name]: e.target.checked,
            };

            return {
                ...prevState,
                staffRights: updatedStaffRightsList,
                [name]: e.target.checked,
            };
        });
    };

    const [state, setState] = useState({
        staffId: '',
        staffName: '',
        staffCode: '',
        staffRights: [],
    });
    const [selectedItem, setSelectedItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [optionListState, setOptionListState] = useState({
        staff_list: [],
    });
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        dispatch(getStaffRequest());
    }, []);

    //Get Staff
    useEffect(() => {
        if (getStaffSuccess) {
            setOptionListState({
                ...optionListState,
                staff_list: getStaffList,
            });
            dispatch(resetGetStaff());
        } else if (getStaffFailure) {
            dispatch(resetGetStaff());
        }
    }, [getStaffSuccess, getStaffFailure]);

    useEffect(() => {
        if (getStaffRightsSuccess) {
            setIsLoading(false);
            try {
                if (getStaffRightsData.length > 0) {
                    isEdit = true;
                    const parsedData = JSON.parse(getStaffRightsData[0]?.staffRightsPermission || "");
                    setState((prevState) => {
                        const updatedState = { ...prevState };
                        const staffRights = parsedData.map((item) => {
                            const [key, permissions] = Object.entries(item).find(([k]) => k !== "title");
                            updatedState[`${item.title}View`] = permissions?.view || false;
                            updatedState[`${item.title}Ins`] = permissions?.create || false;
                            updatedState[`${item.title}Upd`] = permissions?.update || false;
                            updatedState[`${item.title}Del`] = permissions?.delete || false;
                            return {
                                title: item.title,
                                [`${item.title}View`]: permissions?.view || false,
                                [`${item.title}Ins`]: permissions?.create || false,
                                [`${item.title}Upd`]: permissions?.update || false,
                                [`${item.title}Del`]: permissions?.delete || false,
                            };
                        });
                        return {
                            ...updatedState,
                            staffRights,
                        };
                    });
                    setSelectedItem(getStaffRightsData[0]);
                } else {
                    setState({
                        ...state,
                        staffRights: [],
                        masterIns: false,
                        masterUpd: false,
                        masterDel: false,
                        masterView: false,
                        staffIns: false,
                        staffUpd: false,
                        staffDel: false,
                        staffView: false,
                        visitEntryIns: false,
                        visitEntryUpd: false,
                        visitEntryDel: false,
                        visitEntryView: false,
                        petrolAllowanceIns: false,
                        petrolAllowanceUpd: false,
                        petrolAllowanceDel: false,
                        petrolAllowanceView: false,
                        salaryIns: false,
                        salaryUpd: false,
                        salaryDel: false,
                        salaryView: false,
                    })
                    isEdit = false;
                }
            } catch (error) {
                console.error("Error parsing staff rights data:", error);
            }
            dispatch(resetGetStaffRights());
        } else if (getStaffRightsFailure) {
            setIsLoading(false);
            dispatch(resetGetStaffRights());
        }
    }, [getStaffRightsSuccess, getStaffRightsFailure]);


    useEffect(() => {
        if (createStaffRightsSuccess) {
            setIsLoading(false);
            showMessage('success', 'Created Successfully');
            onFormClear();
            dispatch(resetCreateStaffRights());
        } else if (createStaffRightsFailure) {
            setIsLoading(false);
            dispatch(resetCreateStaffRights());
        }
    }, [createStaffRightsSuccess, createStaffRightsFailure]);


    useEffect(() => {
        if (updateStaffRightsSuccess) {
            setIsLoading(false);
            isEdit && showMessage('success', 'Updated Successfully');
            onFormClear();
            dispatch(resetUpdateStaffRights());
        } else if (updateStaffRightsFailure) {
            setIsLoading(false);
            dispatch(resetUpdateStaffRights());
        }
    }, [updateStaffRightsSuccess, updateStaffRightsFailure]);

    const onFormClear = () => {
        setState({
            staffId: '',
            staffName: '',
            staffCode: '',
            staffRights: [],
        });
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const onFormSubmit = () => {
        const data = [
            {
                title: "master",
                permission: {
                    create: state?.masterIns || false,
                    update: state?.masterUpd || false,
                    delete: state?.masterDel || false,
                    view: state?.masterView || false
                },
            },
            {
                title: "staff",
                permission: {
                    create: state?.staffIns || false,
                    update: state?.staffUpd || false,
                    delete: state?.staffDel || false,
                    view: state?.staffView || false
                },
            },
            {
                title: "visitEntry",
                permission: {
                    create: state?.visitEntryIns || false,
                    update: state?.visitEntryUpd || false,
                    delete: state?.visitEntryDel || false,
                    view: state?.visitEntryView || false,
                },
            },
            {
                title: "petrolAllowance",
                permission: {
                    create: state?.petrolAllowanceIns || false,
                    update: state?.petrolAllowanceUpd || false,
                    delete: state?.petrolAllowanceDel || false,
                    view: state?.petrolAllowanceView || false,
                },
            },
            {
                title: "salary",
                permission: {
                    create: state?.salaryIns || false,
                    update: state?.salaryUpd || false,
                    delete: state?.salaryDel || false,
                    view: state?.salaryView || false,
                },
            },
        ]
        const submitRequest = {
            staffId: state?.staffId || "",
            staffRightsPermission: JSON.stringify(data)
        };

        if (isEdit) {
            dispatch(updateStaffRightsRequest(submitRequest, selectedItem?.staffRightsId));

        } else {
            dispatch(createStaffRightsRequest(submitRequest));
        }
    };


    const onChangeStaff = (option, name, uniqueKey, displayKey) => {
        const staffId = {
            staffId: option?.staffId
        }
        dispatch(getStaffRightsRequest(staffId));
        setState({
            ...state,
            [name]: option[uniqueKey],
            staffName: option?.staffName,
            staffCode: option?.staffCode,
        });
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
                <Card>
                    <Card.Body>
                        <Row className="mb-3">
                            <FormLayout
                                dynamicForm={formContainer}
                                handleSubmit={onFormSubmit}
                                setState={setState}
                                state={state}
                                ref={errorHandle}
                                noOfColumns={4}
                                onChangeCallBack={{ onChangeStaff: onChangeStaff }}
                                errors={errors}
                                optionListState={optionListState}
                                setErrors={setErrors}
                            />

                            <Col>
                                <Table
                                    columns={itemList}
                                    Title={'User Rights'}
                                    data={formContainerStaffRights || []}
                                    pagination={false}
                                    isSearchable={false}
                                    setState={setState}
                                    state={state}
                                />

                                <Row className="d-flex justify-content-end">
                                    <Col lg={2}>
                                        <Button
                                            style={{ background: '#7638FF', borderColor: '#7638FF' }}
                                            className="w-100"
                                            onClick={() => handleValidation()}>
                                            {isEdit ? "Update" : "Submit"}
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}
        </React.Fragment>
    );
}

export default Index;
