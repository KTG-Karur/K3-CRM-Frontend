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
                            updatedState[`${item.title}_view`] = permissions?.view || false;
                            updatedState[`${item.title}_ins`] = permissions?.create || false;
                            updatedState[`${item.title}_upd`] = permissions?.update || false;
                            updatedState[`${item.title}_del`] = permissions?.delete || false;
                            return {
                                title: item.title,
                                [`${item.title}_view`]: permissions?.view || false,
                                [`${item.title}_ins`]: permissions?.create || false,
                                [`${item.title}_upd`]: permissions?.update || false,
                                [`${item.title}_del`]: permissions?.delete || false,
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
                        staffRights: []
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
                    create: state?.master_ins || false,
                    update: state?.master_upd || false,
                    delete: state?.master_del || false,
                    view: state?.master_view || false
                },
            },
            {
                title: "staff",
                permission: {
                    create: state?.staff_ins || false,
                    update: state?.staff_upd || false,
                    delete: state?.staff_del || false,
                    view: state?.staff_view || false
                },
            },
            {
                title: "visitEntry",
                permission: {
                    create: state?.visitEntry_ins || false,
                    update: state?.visitEntry_upd || false,
                    delete: state?.visitEntry_del || false,
                    view: state?.visitEntry_view || false,
                },
            },
            {
                title: "petrolAllowance",
                permission: {
                    create: state?.petrolAllowance_ins || false,
                    update: state?.petrolAllowance_upd || false,
                    delete: state?.petrolAllowance_del || false,
                    view: state?.petrolAllowance_view || false,
                },
            },
            {
                title: "salary",
                permission: {
                    create: state?.salary_ins || false,
                    update: state?.salary_upd || false,
                    delete: state?.salary_del || false,
                    view: state?.salary_view || false,
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
