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

    // useEffect(() => {
    //     // console.log('getUserRightsSuccess');
    //     // console.log(getUserRightsSuccess);

    //     if (getUserRightsSuccess) {
    //         setIsLoading(false);
    //         console.log('getUserRightsData');
    //         console.log(getUserRightsData);
    //         // console.log(JSON.parse(getUserRightsData.master.create));
    //         const strtoParse = getUserRightsData;
    //         console.log('data come here', strtoParse);
    //         console.log(typeof strtoParse, strtoParse);
    //         const parsedData = JSON.parse(strtoParse);

    //         const arrforUsrrights = parsedData.map(item => {
    //             const [key, permissions] = Object.entries(item).find(([k]) => k !== "title"); // Find the permissions object dynamically
    //             return {
    //               [`${key}_ins`]: permissions.create,
    //               [`${key}_upd`]: permissions.update,
    //               [`${key}_del`]: permissions.delete,
    //             };
    //           });
              
    //         console.log(arrforUsrrights);
    //         setState({
    //             ...state,
    //             user_id: getUserRightsData.user_id,
    //             userRights: arrforUserRights,
    //             master_ins: strtoPar?.master_ins,
    //             master_upd: strtoPar?.master_upd,
    //             master_upd: strtoPar?.master_upd,
    //             userright_ins: strtoPar?.userright_ins,
    //             userright_view: strtoPar?.userright_view,
    //             outstanding_view: strtoPar?.outstanding_view,
    //             user_ins: strtoPar?.user_ins,
    //             user_upd: strtoPar?.user_upd,
    //             user_upd: strtoPar?.user_upd,
    //             order_ins: strtoPar?.order_ins,
    //             order_upd: strtoPar?.order_upd,
    //             order_del: strtoPar?.order_del,
    //             collection_ins: strtoPar?.collection_ins,
    //             collection_upd: strtoPar?.collection_upd,
    //             collection_del: strtoPar?.collection_del,
    //             return_ins: strtoPar?.return_ins,
    //             return_upd: strtoPar?.return_upd,
    //             return_del: strtoPar?.return_del,
    //             expenses_ins: strtoPar?.expenses_ins,
    //             expenses_upd: strtoPar?.expenses_upd,
    //             expenses_del: strtoPar?.expenses_del,
    //             draft_del: strtoPar?.draft_del,
    //             draft_view: strtoPar?.draft_view,
    //             reports_view: strtoPar?.reports_view,
    //             settings_upd: strtoPar?.settings_upd,
    //             settings_view: strtoPar?.settings_view,
    //         });
    //         return;
    //     } else if (getUserRightsFailure) {
    //         setIsLoading(false);
    //         dispatch(resetGetUserRights());
    //     }
    // }, [getUserRightsSuccess, getUserRightsFailure]);

    useEffect(() => {
        if (getUserRightsSuccess) {
            setIsLoading(false);
    
            try {
                // Parse the JSON data from API response
                const parsedData = JSON.parse(getUserRightsData);
    
                // Transform parsed data into the required format
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
    
                // Update state with transformed rights
                setState((prevState) => ({
                    ...prevState,
                    userRights: transformedRights,
                }));

            } catch (error) {
                console.error("Error parsing user rights data:", error);
            }
    
            // Reset Redux state for user rights
            dispatch(resetGetUserRights());
        } else if (getUserRightsFailure) {
            setIsLoading(false);
            dispatch(resetGetUserRights());
        }
    }, [getUserRightsSuccess, getUserRightsFailure, getUserRightsData]);
    
    
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
        const submitRequest = [
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
        ];
    
        console.log("Submitted user rights", submitRequest);
        return;
        // dispatch(createUserRightsRequest(submitRequest));
    };
    

    const onChangeStaff = (option, name, uniqueKey, displayKey) => {
        // setIsLoading(true);
        dispatch(getUserRightsRequest(option?.staffId));
        // console.log('onChangeStaff');
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
