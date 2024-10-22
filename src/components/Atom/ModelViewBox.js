import React from 'react';
import { VerticalForm } from '../form';
import { Modal, Button } from 'react-bootstrap';

function ModelViewBox(props) {
    const { modal, setModel, children, modelHeader, cancelBtn = true, modelSize,saveBtn = true, handleSubmit, btnName = false, isEdit, modelHead = false, backgroundColor = "", headerBg = "" } = props;

    const handleClose = () => {
        setModel(false);
    };

    return (
        <React.Fragment>
            <Modal show={modal} onHide={handleClose} centered size={modelSize}>
                <Modal.Header style={{ backgroundColor: headerBg }} closeButton>
                    <Modal.Title as="h4">{`${isEdit ? 'Edit ' : modelHead ? '' : 'Add'} ${modelHeader}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: backgroundColor }}>
                    <VerticalForm onSubmit={() => { }} defaultValues={{}}>
                        {children}

                        <div className='d-flex justify-content-end'>
                            {saveBtn && <Button
                                variant="primary"
                                className="waves-effect waves-light me-1"
                                type="button"
                                onClick={handleSubmit}>
                                {`${isEdit ? 'Update' : btnName ? btnName : 'Save'}`}
                            </Button>}
                            {cancelBtn && <Button variant="danger" className="waves-effect waves-light" onClick={handleClose}>
                                Cancel
                            </Button>}
                        </div>
                    </VerticalForm>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default ModelViewBox;
