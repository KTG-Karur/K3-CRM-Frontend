import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Button, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Wizard, Steps, Step } from 'react-albus';
import FormLayout from '../../utils/formLayout';
import Table from '../../components/Table';
import { sizePerPageList } from '../../utils/constData';
import { deleteData, showConfirmationDialog, updateData } from '../../utils/AllFunction';
//import LoanPdf from '../../utils/loanPdf';

let submitWizardCall = false;
let reinsertIndex = 0;
let checkIsNotlastPrevious = '';

const WizardWithProgressbar = (props) => {
    let {
        //state
        arrVal,
        setArrVal,
        tabIndex,
        setTabIndex,
        isEdit,
        setTab,
        tab,
        state,
        setState,
        multiStateValue,
        setMultiStateValue,
        errors,
        setErrors,
        IsEditArrVal,
        setIsEditArrVal,
        perVal = 0,
        setPerVal,
        uploadImages,
        //const value
        Title,
        showSelectmodel,
        showMultiAdd,
        optionListState,
        columnsWizard,
        checkIsLoan = false,
        //function
        toggleModal,
        toggle,
        handleSubmit,
        onChangeCallBack,
        //formFieldData.js
        tabList,
    } = props;

    const errorHandle = useRef();
    const [checkValidationforAddorNext, setCheckValidationforAddorNext] = useState(false);

    useEffect(() => {
        if (submitWizardCall) {
            handleSubmit();
            reinsertIndex = 0;
            submitWizardCall = false;
        }
    }, [multiStateValue]);

    useEffect(() => {
        if (isEdit) {
            setState(multiStateValue[0][tabList?.[tabIndex]?.name] || {});
            if (Array.isArray(multiStateValue[0][tabList?.[tabIndex]?.name])) {
                setArrVal(multiStateValue[0][tabList?.[tabIndex]?.name]);
                setState({})
            }
        }
    }, [tabIndex]);

    // Validation
    const checkValidation = (next, condition) => {
        setCheckValidationforAddorNext(condition);
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length !== 0 && next != null) {
            return handleNext(next);
        }
        setTimeout(() => {
            errorHandle.current.validateFormFields();
        }, 0);
    };
    // Add
    const handleAdd = async () => {
        if (IsEditArrVal) {
            const data = { ...state };
            if (perVal != 0) {
                if (data?.chargesAmount) {
                    data.chargesAmount = perVal;
                    setPerVal(0);
                }
            }
            // const updata = await updateData(arrVal, state?.id, data);
            arrVal[state.selectedIdx] = data
            setArrVal(arrVal);
            setIsEditArrVal(false);
            setState({});
        } else {
            const data = { id: arrVal.length, ...state };
            // if(data.imageProof)
            if (perVal != 0) {
                if (data?.chargesAmount) {
                    data.chargesAmount = perVal;
                    setPerVal(0);
                }
            }
            setArrVal((prevValues) => [...prevValues, data]);
            setState({});
        }
    };

    // Next
    const handleNext = async (next) => {
        const checkMultiAdd = showMultiAdd.includes(tabList[tabIndex].name);
        if (checkMultiAdd && arrVal.length === 0) {
            return;
        }
        let updatedStateValue;
        updatedStateValue = checkMultiAdd ? arrVal : state;
        const temp_state = [...multiStateValue];
        temp_state[reinsertIndex][tabList?.[tabIndex]?.name] = updatedStateValue;
        setMultiStateValue(temp_state);

        if (tabIndex === tabList.length - 1) {
            submitWizardCall = true;
        } else {
            setTab(tabList?.[tabIndex + 1]?.name);
            setTabIndex((prev) => prev + 1);
            setState(multiStateValue[reinsertIndex][tabList?.[tabIndex + 1]?.name] || {});
            if (showMultiAdd.includes(tabList[tabIndex + 1].name)) {
                setArrVal(multiStateValue[reinsertIndex][tabList?.[tabIndex + 1]?.name] || []);
                setState({});
            }
            next();
        }
    };

    // Previous
    const handlePrevious = (previous) => {
        setTab(tabList[tabIndex - 1]?.name || '');
        setTabIndex((prev) => prev - 1);
        setState(multiStateValue[reinsertIndex][tabList?.[tabIndex - 1]?.name] || {});
        if (showMultiAdd.includes(tabList[tabIndex - 1].name)) {
            setArrVal(multiStateValue[reinsertIndex][tabList?.[tabIndex - 1]?.name] || []);
        }
        previous();
    };

    // handleReinsert
    const handleReinsert = async (val) => {
        const checkMultiAdd = showMultiAdd.includes(tabList[tabIndex].name);
        checkIsNotlastPrevious = val != 'isPrevious';
        if (showMultiAdd.includes(tabList[tabIndex].name) && arrVal.length === 0) {
            return;
        }
        let updatedStateValue;
        updatedStateValue = checkMultiAdd ? arrVal : state;
        const temp_state = [...multiStateValue];
        temp_state[reinsertIndex][tabList?.[tabIndex]?.name] = updatedStateValue;
        if (checkIsNotlastPrevious) {
            reinsertIndex = 1 + parseInt(reinsertIndex);
            temp_state[reinsertIndex] = {};
        }
        setMultiStateValue(temp_state);
        if (checkIsNotlastPrevious) {
            if (tabIndex === tabList.length - 1) {
                setTab('personalInfo');
                setTabIndex(0);
                setArrVal([]);
            }
        }
    };

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Row>
                                <Col md={4}>
                                    <h4 style={{ lineHeight: '100%' }}>{`${isEdit ? 'Update' : 'Add'} ${Title}`}</h4>
                                </Col>
                                <Col md={8} xs={12} className="d-flex justify-content-end">
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="secondary"
                                                className="waves-effect waves-light"
                                                onClick={() => {
                                                    setMultiStateValue([{}]);
                                                    setState({});
                                                    toggle();
                                                }}>
                                                <i className="mdi mdi-arrow-left"></i>
                                                Back
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Wizard
                    render={() => (
                        <Steps>
                            <Tab.Container
                                id="left-tabs-example"
                                defaultActiveKey={tabList?.[0]?.defaultActiveKey || ''}
                                activeKey={tab ? tab : tabList?.[0]?.defaultActiveKey || ''}
                                onSelect={(k) => setTab(k)}>
                                <Nav variant="pills" as="ul" className="nav-justified bg-light form-wizard-header mb-3">
                                    {tabList.map((item, i) => (
                                        <Nav.Item as="li" key={i}>
                                            <Nav.Link
                                                as={Link}
                                                disabled
                                                to="#"
                                                eventKey={item?.name || ''}
                                                className="rounded-0 pt-2 pb-2">
                                                <i className={`${item?.icon || ''} me-1`}></i>
                                                <span className="d-none d-sm-inline">{item?.label || ''}</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                                <Tab.Content className="pb-0 mb-0 pt-0">
                                    <Tab.Pane eventKey={tabList[tabIndex].name}>
                                        <Step
                                            id={tabList[tabIndex]?.name || ''}
                                            render={({ next, previous }) => {
                                                return (
                                                    <Form>
                                                        

                                                        {
                                                           <FormLayout
                                                                    optionListState={optionListState}
                                                                    dynamicForm={tabList[tabIndex]?.children || ''}
                                                                    handleSubmit={
                                                                        checkValidationforAddorNext
                                                                            ? () => handleAdd()
                                                                            : () => handleNext(next)
                                                                    }
                                                                    setState={setState}
                                                                    state={state}
                                                                    ref={errorHandle}
                                                                    onChangeCallBack={onChangeCallBack}
                                                                    noOfColumns={3}
                                                                    errors={errors}
                                                                    setErrors={setErrors}
                                                                    toggleModal={toggleModal}
                                                                    showSelectmodel={showSelectmodel}
                                                                />
                                                        }



                                                        {showMultiAdd.includes(tabList[tabIndex].name) && (
                                                            <div className="d-flex justify-content-end">
                                                                <Button
                                                                    onClick={() => {
                                                                        checkValidation(null, true);
                                                                    }}
                                                                    variant="success">
                                                                    {IsEditArrVal ? 'Update' : 'Add'}
                                                                </Button>
                                                            </div>
                                                        )}
                                                        <ul className="pager wizard mb-0 list-inline mt-2">
                                                            {tabIndex != 0 && (
                                                                <li className="previous list-inline-item">
                                                                    <Button
                                                                        onClick={async () => {
                                                                            if (!isEdit) {
                                                                                await handleReinsert('isPrevious');
                                                                            }
                                                                            await handlePrevious(previous);
                                                                        }}
                                                                        variant="secondary">
                                                                        Previous
                                                                    </Button>
                                                                </li>
                                                            )}

                                                            <li className="next list-inline-item float-end">
                                                                {tabIndex === tabList.length - 1 && checkIsLoan ?
                                                                    <Button
                                                                        onClick={() => {
                                                                            handleSubmit();
                                                                        }}
                                                                        variant="primary">
                                                                        {tabIndex != tabList.length - 1
                                                                            ? 'Next'
                                                                            : isEdit
                                                                                ? 'Update'
                                                                                : 'Submit'}
                                                                    </Button> :
                                                                    <Button
                                                                        onClick={() => {
                                                                            checkValidation(next, false);
                                                                        }}
                                                                        variant="primary">
                                                                        {tabIndex != tabList.length - 1
                                                                            ? 'Next'
                                                                            : isEdit
                                                                                ? 'Update'
                                                                                : 'Submit'}
                                                                    </Button>
                                                                }
                                                            </li>
                                                        </ul>
                                                    </Form>
                                                );
                                            }}
                                        />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Steps>
                    )}
                />

                {showMultiAdd.includes(tabList[tabIndex].name) && (
                    <Table
                        columns={columnsWizard?.[tabList[tabIndex].name] || []}
                        Title={`${tabList[tabIndex].label} List`}
                        data={arrVal || []}
                        pageSize={5}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSearchable={true}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export { WizardWithProgressbar };
