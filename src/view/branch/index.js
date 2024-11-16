import React, { useEffect, useRef, useState } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import ModelViewBox from '../../components/Atom/ModelViewBox';
import FormLayout from '../../utils/formLayout';
import { employeeFormContainer } from './formFieldData';
import Table from '../../components/Table';
import { showConfirmationDialog, showMessage } from '../../utils/AllFunction';
import { createBranchRequest, getBranchRequest, resetCreateBranch, resetGetBranch, resetUpdateBranch, updateBranchRequest } from '../../redux/actions';
import { useRedux } from '../../hooks'
import { NotificationContainer } from 'react-notifications';

let isEdit = false;

function Index() { 

    const { dispatch, appSelector } = useRedux();

    const { getBranchSuccess, getBranchList, getBranchFailure,
        createBranchSuccess, createBranchData, createBranchFailure,
        updateBranchSuccess, updateBranchData, updateBranchFailure,errorMessage

    } = appSelector((state) => ({
        getBranchSuccess: state.branchReducer.getBranchSuccess,
        getBranchList: state.branchReducer.getBranchList,
        getBranchFailure: state.branchReducer.getBranchFailure,

        createBranchSuccess: state.branchReducer.createBranchSuccess,
        createBranchData: state.branchReducer.createBranchData,
        createBranchFailure: state.branchReducer.createBranchFailure,

        updateBranchSuccess: state.branchReducer.updateBranchSuccess,
        updateBranchData: state.branchReducer.updateBranchData,
        updateBranchFailure: state.branchReducer.updateBranchFailure,

        errorMessage: state.branchReducer.errorMessage,
    }));

    const columns = [
        {
            Header: 'S.No',
            accessor: 'id',
            Cell: (row) => <div>{row?.row?.index + 1}</div>,
        },
        {
            Header: 'Branch Name',
            accessor: 'branchName',
            sort: true,
        },
        {
            Header: 'Email',
            accessor: 'email',
            sort: true,
        },
        {
            Header: 'Contact No',
            accessor: 'contactNo',
            sort: true,
        },        {
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
        dispatch(getBranchRequest());
    }, []);

    useEffect(() => {
        if (getBranchSuccess) {
            setIsLoading(false)
            setParentList(getBranchList)
            dispatch(resetGetBranch())
        } else if (getBranchFailure) {
            setIsLoading(false)
            setParentList([])
            dispatch(resetGetBranch())
        }
    }, [getBranchSuccess, getBranchFailure]);

    useEffect(() => {
        if (createBranchSuccess) {
            const temp_state = [createBranchData[0], ...parentList];
            setParentList(temp_state)
            showMessage('success', 'Created Successfully');
            closeModel()
            dispatch(resetCreateBranch())
        } else if (createBranchFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetCreateBranch())
        }
    }, [createBranchSuccess, createBranchFailure]);

    useEffect(() => {
        if (updateBranchSuccess) {
            const temp_state = [...parentList];
            temp_state[selectedIndex] = updateBranchData[0];
            setParentList(temp_state)
            isEdit && showMessage('success', 'Updated Successfully');
            closeModel()
            dispatch(resetUpdateBranch())
        } else if (updateBranchFailure) {
            showMessage('warning', errorMessage);
            dispatch(resetUpdateBranch())
        }
    }, [updateBranchSuccess, updateBranchFailure]);

    const closeModel = () => {
        isEdit = false;
        onFormClear()
        setModal(false)
    }

    const onFormClear = () => {
        setState({
            ...state,
            branchName: '',
            address: '',
            city: '',
            pincode: '',
            email: '',
            contactNo: '',
            state
        });
    };

    const createModel = () => {
        onFormClear()
        setErrors([]);
        isEdit = false;
        setModal(true)
    };

    const onEditForm = (data, index) => {
        setState({
            ...state,
            branchName: data?.branchName || "",
            address: data?.address || "",
            city: data?.city || "",
            pincode: data?.pincode || "",
            email: data?.email || "",
            contactNo: data?.contactNo || "",
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
            branchName: state?.branchName || "",
            address: state?.address || "",
            city: state?.city || "",
            pincode: state?.pincode || "",
            email: state?.email || "",
            contactNo: state?.contactNo || "",
        }
        if (isEdit) {
            dispatch(updateBranchRequest(submitRequest, selectedItem.branchId))
        } else {
            dispatch(createBranchRequest(submitRequest))
        }
    };

    const onDeleteForm = (data, index, activeChecker) => {
        const submitRequest = {
            isActive: activeChecker == 0 ? 1 : 0
        }
        setSelectedIndex(index)
        dispatch(updateBranchRequest(submitRequest, data.branchId))
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
                Title={'Branch List'}
                data={parentList || []}
                pageSize={5}
                toggle={createModel}
            />}

            <ModelViewBox
                modal={modal}
                setModel={setModal}
                modelHeader={'Branch'}
                modelSize={'md'}
                isEdit={isEdit}
                handleSubmit={handleValidation}>
                <FormLayout
                    dynamicForm={employeeFormContainer}
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
