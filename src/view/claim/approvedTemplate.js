import React from 'react';
import { Button, Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import { dateConversion } from '../../utils/AllFunction';

const LoanDueComponent = (props) => {

    const { detailsLeftColumns, detailsRightColumns, selectedItem, interetsColumns=[], paymentDetails=[] } = props;

    return (
        <React.Fragment>
            <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
            <hr className='mx-3'></hr>
            {/* <div className='row mt-3 mx-1'>
                <div className='col-6'>
                    {(detailsLeftColumns.map((item, index) => {
                        return (
                            <Row className='mt-1' key={index}>
                                <Col xs={5} lg={5}>{item?.title || ""}</Col>
                                <Col xs={1} lg={1}><b>:</b></Col>
                                <Col xs={6} lg={6}><b>{item?.prefix || ""}{selectedItem[item.keyValue] ? selectedItem[item.keyValue] : ""}{item?.sufix || ""}</b></Col>
                            </Row>
                        )
                    }))}
                </div>
                <div className='col-6'>
                    {(detailsRightColumns.map((item, index) => {
                        return (
                            <Row className='mt-1' key={index}>
                                <Col xs={5} lg={5}>{item?.title || ""}</Col>
                                <Col xs={1} lg={1}><b>:</b></Col>
                                <Col xs={6} lg={6}><b>{item?.prefix || ""}{(item?.referField || "") === "date" ? dateConversion(selectedItem[item.keyValue], "DD-MM-YYYY") : selectedItem[item.keyValue] || ""}{item?.sufix || ""}</b></Col>
                            </Row>
                        )
                    }))}
                </div>
            </div>
            <div className='mt-2'>
                <Table
                    columns={interetsColumns}
                    Title={'Search List'}
                    data={paymentDetails}
                    pagination={'false'}
                />
            </div> */}
        </React.Fragment>

    );
};

export default LoanDueComponent ;
