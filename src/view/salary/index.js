import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, Form, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer, staffSalaryBtn } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';
import { createStaffSalaryRequest, getStaffSalaryRequest, resetCreateStaffSalary, resetGetStaffSalary, resetUpdateStaffSalary, updateStaffSalaryRequest } from '../../redux/staff-salary/actions';
import { getSettingBenefitRequest, resetGetSettingBenefit } from '../../redux/actions';

let isEdit = false;

function Index() {

    const { dispatch, appSelector } = useRedux();

    const incentiveAmountRefs = useRef([]);

    const {
        getSettingBenefitSuccess, getSettingBenefitList, getSettingBenefitFailure,
        getStaffSalarySuccess, getStaffSalaryList, getStaffSalaryFailure,
        updateStaffSalarySuccess, updateStaffSalaryData, updateStaffSalaryFailure,
        createStaffSalarySuccess, createStaffSalaryFailure, createStaffSalaryData,
        errorMessage,

    } = appSelector((state) => ({

        getSettingBenefitSuccess: state.settingBenefitReducer.getSettingBenefitSuccess,
        getSettingBenefitList: state.settingBenefitReducer.getSettingBenefitList,
        getSettingBenefitFailure: state.settingBenefitReducer.getSettingBenefitFailure,

        getStaffSalarySuccess: state.staffsalaryReducer.getStaffSalarySuccess,
        getStaffSalaryList: state.staffsalaryReducer.getStaffSalaryList,
        getStaffSalaryFailure: state.staffsalaryReducer.getStaffSalaryFailure,

        createStaffSalarySuccess: state.staffsalaryReducer.createStaffSalarySuccess,
        createStaffSalaryData: state.staffsalaryReducer.createStaffSalaryData,
        createStaffSalaryFailure: state.staffsalaryReducer.createStaffSalaryFailure,

        updateStaffSalarySuccess: state.staffsalaryReducer.updateStaffSalarySuccess,
        updateStaffSalaryData: state.staffsalaryReducer.updateStaffSalaryData,
        updateStaffSalaryFailure: state.staffsalaryReducer.updateStaffSalaryFailure,

        errorMessage: state.staffsalaryReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Name',
            accessor: 'staffName',
            sort: true,
        },
        {
            Header: 'Tol Salary',
            accessor: 'salaryMonth',
            sort: true,
        },
        {
            Header: 'No.of leave days',
            accessor: 'leaveCount',
            sort: true,
        },
        {
            Header: 'Leave sal',
            accessor: 'Leave salary',
            sort: true,
        },
        {
            Header: 'Sal after Leave amt',
            accessor: 'Salary after Leave amount',
            sort: true,
        },
        {
            Header: 'ESI 1.75%',
            accessor: 'ESI',
            sort: true,
        },
        {
            Header: 'PF 12%',
            accessor: 'PF',
            sort: true,
        },
        {
            Header: 'Adv amt',
            accessor: 'Advance amt Pending',
            sort: true,
        },
        {
            Header: 'Ded Amt',
            accessor: 'Deducted Amt this Month',
            sort: true,
        },
        {
            Header: 'Sal on Hand',
            accessor: 'Sal on Hand',
            sort: true,
        },
        {
            Header: 'Incentive',
            accessor: 'incentiveAmount',
            Cell: ({ row }) => {
                return (
                    <div>
                        <Form.Control
                            type="number"
                            name={"incentiveAmount"}
                            className="mb-1"
                            placeholder={"0.00"}
                            value={state.staffSalary[row.index]?.incentiveAmount || ""}
                            onWheel={(e) => e.target.blur()}
                            ref={(el) => (incentiveAmountRefs.current[row.index] = el)}
                            onChange={(e) => {
                                handleChange(row.original, e.target.value, row.index)
                            }}
                        />
                    </div>
                )
            },
            Footer: () => {
                return (

                    <Button
                        variant="success"
                        onClick={onFormSubmit}
                        style={{ width: "100%", padding: '10px' }}
                    >
                        {isEdit ? 'Update' : 'Submit'}
                    </Button>
                )
            }
        }
    ];

    const [state, setState] = useState({
        staffSalary: [{}]
    });
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getSettingBenefitRequest());
        dispatch(getStaffSalaryRequest());
    }, []);

    useEffect(() => {
        if (getSettingBenefitSuccess) {
            setIsLoading(false)
            // setParentList(getSettingBenefitList)
            console.log("getSettingBenefitList")
            console.log(getSettingBenefitList)
            setState({
                ...state,
                benefitList: getSettingBenefitList
            });
            dispatch(resetGetSettingBenefit())
        } else if (getSettingBenefitFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetSettingBenefit())
        }
    }, [getSettingBenefitSuccess, getSettingBenefitFailure]);


    useEffect(() => {
        if (getStaffSalarySuccess) {
            setIsLoading(false)
            setParentList(getStaffSalaryList)
            const staffSalaryList = getStaffSalaryList.map(item => {
                return {
                    staffId: item.staffId,
                    staffName: item?.staffName || '',
                    incentiveAmount: item?.incentiveAmount || 0,
                }
            })
            setState({
                ...state,
                staffSalary: staffSalaryList
            })
            dispatch(resetGetStaffSalary())
        } else if (getStaffSalaryFailure) {
            setIsLoading(false)
            dispatch(resetGetStaffSalary())
        }
    }, [getStaffSalarySuccess, getStaffSalaryFailure]);

    useEffect(() => {
        if (createStaffSalarySuccess) {
            const temp_state = [createStaffSalaryData[0], ...parentList];
            console.log("createStaffSalarySuccess temp_state")
            console.log(temp_state)
            // setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateStaffSalary())
        } else if (createStaffSalaryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateStaffSalary())
        }
    }, [createStaffSalarySuccess, createStaffSalaryFailure]);

    useEffect(() => {
        if (updateStaffSalarySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateStaffSalaryData[0];
            console.log("updateStaffSalarySuccess temp_state")
            console.log(temp_state)
            // setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateStaffSalary())
        } else if (updateStaffSalaryFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateStaffSalary())
        }
    }, [updateStaffSalarySuccess, updateStaffSalaryFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            departmentName: '',
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
            departmentName: data?.departmentName || "",
        });
        isEdit = true;
        setSelectedItem(data)
        setSelectedIndex(index)
        setModal(true)
    };


    const onFormSubmit = async () => {
        const submitRequest = {
            staffSalary: state?.staffSalary || ""
        }
        console.log("submitRequest");
        console.log(submitRequest);
        return;
        if (isEdit) {
            dispatch(updateStaffSalaryRequest(submitRequest, selectedItem.departmentId))
        } else {
            dispatch(createStaffSalaryRequest(submitRequest))
        }
    };

    const handleChange = (staffDetail, incentiveAmount, index) => {
        setState((prev) => {
            const updatedStaffSalary = [...prev.staffSalary];

            updatedStaffSalary[index] = {
                ...updatedStaffSalary[index],
                incentiveAmount: incentiveAmount,
            };

            return {
                ...prev,
                staffSalary: updatedStaffSalary,
            };
        });

        requestAnimationFrame(() => {
            incentiveAmountRefs.current[index]?.focus();
        });
    };

    console.log("state.staffSalary")
    console.log(state.staffSalary)

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
                    Title={'Salary List'}
                    data={parentList || []}
                    pageSize={5}
                    toggle={false}
                    pagination={false}
                />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Department'}
                modelSize={'md'}
                isEdit={isEdit}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
                    handleSubmit={onFormSubmit}
                    setState={setState}
                    state={state}
                    noOfColumns={1}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ModelViewBox>
        </React.Fragment>
    );
}

export default Index;
