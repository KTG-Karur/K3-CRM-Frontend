import React from 'react';
import { VerticalForm } from '../form';
import { Card, Button } from 'react-bootstrap';

function CardViewBox(props) {
    const { card, setCard, children, cardHeader, cancelBtn = true, cardSize,saveBtn = true, handleSubmit, btnName = false, isEdit, cardHead = false, backgroundColor = "", headerBg = "" } = props;
    const handleClose = () => {
        setCard(false);
    };

    return (
        <React.Fragment>
            <Card show={card} onHide={handleClose} centered size={cardSize}>
                <Card.Header style={{ backgroundColor: headerBg }} closeButton>
                    <Card.Title as="h4">{`${isEdit ? 'Edit ' : cardHead ? '' : ''} ${cardHeader}`}</Card.Title>
                </Card.Header>
                <Card.Body style={{ backgroundColor: backgroundColor }}>
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
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default CardViewBox;
