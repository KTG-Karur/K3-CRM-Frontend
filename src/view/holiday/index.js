import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { holidayContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createHolidayRequest, getHolidayRequest, resetCreateHoliday, resetGetHoliday, resetUpdateHoliday, updateHolidayRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false; 

function Index() {

    const { dispatch, appSelector } = useRedux();

    const { getHolidaySuccess, getHolidayList, getHolidayFailure,
        createHolidaySuccess, createHolidayData, createHolidayFailure,
        updateHolidaySuccess, updateHolidayData, updateHolidayFailure,
        errorMessage,

    } = appSelector((state) => ({
        getHolidaySuccess: state.holidayReducer.getHolidaySuccess,
        getHolidayList: state.holidayReducer.getHolidayList,
        getHolidayFailure: state.holidayReducer.getHolidayFailure,

        createHolidaySuccess: state.holidayReducer.createHolidaySuccess,
        createHolidayData: state.holidayReducer.createHolidayData,
        createHolidayFailure: state.holidayReducer.createHolidayFailure,

        updateHolidaySuccess: state.holidayReducer.updateHolidaySuccess,
        updateHolidayData: state.holidayReducer.updateHolidayData,
        updateHolidayFailure: state.holidayReducer.updateHolidayFailure,

        errorMessage: state.holidayReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Department Name',
            accessor: 'departmentName',
            sort: true,
        },
        {
            Header: 'Holiday Name',
            accessor: 'holidayName',
            sort: true,
        },
        
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }) => (
                <div>
                    {row?.original?.isActive ? (
                        <Badge bg={'success'}>Active</Badge>
                    ) : (
                        <Badge bg={'danger'}>In active</Badge>
                    )}
                </div>
            ),
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
                        <span
                            className={`${iconColor} cursor-pointer`}
                            onClick={() =>
                                showConfirmationDialog(
                                    deleteMessage,
                                    () => onDeleteForm(row.original, row.index, activeChecker),
                                    'Yes'
                                )
                            }>
                            {
                                row?.original?.isActive ? <i className={'fe-trash-2'}></i> : <i className={'fas fa-recycle'}></i>
                            }
                        </span>
                    </div>
                )
            },
        },
    ];

    const [state, setState] = useState({});
    const [parentList, setParentList] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(false);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const errorHandle = useRef();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getHolidayRequest());
    }, []);

    useEffect(() => {
        if (getHolidaySuccess) {
            setIsLoading(false)
            setParentList(getHolidayList)
            dispatch(resetGetHoliday())
        } else if (getHolidayFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetHoliday())
        }
    }, [getHolidaySuccess, getHolidayFailure]);

    useEffect(() => {
        if (createHolidaySuccess) {
            const temp_state = [createHolidayData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateHoliday())
        } else if (createHolidayFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateHoliday())
        }
    }, [createHolidaySuccess, createHolidayFailure]);

    useEffect(() => {
        if (updateHolidaySuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateHolidayData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateHoliday())
        } else if (updateHolidayFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateHoliday())
        }
    }, [updateHolidaySuccess, updateHolidayFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            holidayName: '',
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
            holidayName: data?.holidayName || "",
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
            holidayName: state?.holidayName || ""
        }
        if (isEdit) {
            dispatch(updateHolidayRequest(submitRequest, selectedItem.holidayId))
        } else {
            dispatch(createHolidayRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateHolidayRequest(submitRequest, data.holidayId))
    };

    return (
        <React.Fragment>
            <NotificationContainer />
           { isLoading ? <div className='bg-light opacity-0.25'>
            <div className="d-flex justify-content-center m-5">
                <Spinner className='mt-5 mb-5' animation="border" />
            </div>
            </div> :
            <Table
                columns={columns}
                Title={'Holiday List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Holiday'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={holidayContainer}
                    handleSubmit={onFormSubmit}
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
