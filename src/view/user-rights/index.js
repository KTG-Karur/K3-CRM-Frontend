import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Col, Image, Row, Spinner } from 'react-bootstrap';
import { formContainer, formContainerUserRights } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import {
    createUserRightsRequest,
    getStaffRequest,
    getSettingsRequest,
    getUserRightsRequest,
    resetCreateUserRights,
    resetGetStaff,
    resetGetSettings,
    resetGetUserRights,
    resetUpdateSettings,
    updateSettingsRequest,
} from '../../redux/actions';
import { useRedux } from '../../hooks';
import { NotificationContainer } from 'react-notifications';
import FormLayout from '../../utils/formLayout';
import { Form } from 'react-bootstrap';
import { isNull } from 'lodash';

function Index() {
    const { dispatch, appSelector } = useRedux();

    const {
        getStaffSuccess,
        getStaffList,
        getStaffFailure,

        getUserRightsSuccess,
        getUserRightsData,
        getUserRightsFailure,

        createUserRightsSuccess,
        createUserRightsData,
        createUserRightsFailure,
        getStaffMetaMessage,
    } = appSelector((state) => ({
        getStaffSuccess: state.staffReducer.getStaffSuccess,
        getStaffList: state.staffReducer.getStaffList,
        getStaffFailure: state.staffReducer.getStaffFailure,

        getUserRightsSuccess: state.userRightsReducer.getUserRightsSuccess,
        getUserRightsData: state.userRightsReducer.getUserRightsData,
        getUserRightsFailure: state.userRightsReducer.getUserRightsFailure,

        createUserRightsSuccess: state.userRightsReducer.createUserRightsSuccess,
        createUserRightsData: state.userRightsReducer.createUserRightsData,
        createUserRightsFailure: state.userRightsReducer.createUserRightsFailure,

        getStaffMetaMessage: state.staffReducer.getStaffMetaMessage,
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
                                checked={state.userRights[row.index]?.[row.original?.view]}
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
                                checked={state.userRights[row.index]?.[row.original?.create]}
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
                                checked={state.userRights[row.index]?.[row.original?.update]}
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
                                checked={state.userRights[row.index]?.[row.original?.delete]}
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
            const updatedUserRightsList = [...prevState.userRights];

            updatedUserRightsList[index] = {
                ...updatedUserRightsList[index],
                [name]: e.target.checked,
            };

            return {
                ...prevState,
                userRights: updatedUserRightsList,
                [name]: e.target.checked,
            };
        });
    };

    const [state, setState] = useState({
        staffId: '',
        staffName: '',
        staffCode: '',
        userRights: [],
    });
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
        if (getUserRightsSuccess) {
            setIsLoading(false);
            try {
                const parsedData = JSON.parse(getUserRightsData);
                const transformedRights = parsedData.map((item) => {
                    const [key, permissions] = Object.entries(item).find(([k]) => k !== "title");

                    return {
                        title: item.title,
                        [`${key}_view`]: permissions.view || false,
                        [`${key}_ins`]: permissions.create || false,
                        [`${key}_upd`]: permissions.update || false,
                        [`${key}_del`]: permissions.delete || false,
                    };
                });

                setState((prevState) => ({
                    ...prevState,
                    userRights: transformedRights,
                }));

            } catch (error) {
                console.error("Error parsing user rights data:", error);
            }
            dispatch(resetGetUserRights());
        } else if (getUserRightsFailure) {
            setIsLoading(false);
            dispatch(resetGetUserRights());
        }
    }, [getUserRightsSuccess, getUserRightsFailure]);


    useEffect(() => {
        if (createUserRightsSuccess) {
            setIsLoading(false);
            showMessage('success', getStaffMetaMessage);
            onFormClear();
            dispatch(resetCreateUserRights());
        } else if (createUserRightsFailure) {
            setIsLoading(false);
            dispatch(resetCreateUserRights());
        }
    }, [createUserRightsSuccess, createUserRightsFailure]);

    const onFormClear = () => {
        setState({
            staffId: '',
            staffName: '',
            staffCode: '',
            userRights: [],
        });
    };

    const handleValidation = () => {
        errorHandle.current.validateFormFields();
    };

    const onFormSubmit = () => {
        const data = {
            data: [
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
        }
        const submitRequest = {
            staffId: state?.staffId || "",
            userPermission: JSON.stringify(data)
        };

        console.log("Submitted user rights", submitRequest);
        // return;
        dispatch(createUserRightsRequest(submitRequest));
    };


    const onChangeStaff = (option, name, uniqueKey, displayKey) => {
        const staffId = {
            staffId: option?.staffId
        }
        dispatch(getUserRightsRequest(staffId));
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
                                    data={formContainerUserRights || []}
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
                                            Submit
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
