import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import CompanyDetails from '../../../components/Atom/CompanyDetails';
import moment from 'moment';

function Index() {
    const today = new Date().toLocaleDateString();

    const { state } = useLocation();

    const [stateVal, setStateVal] = useState([
        {
            staffName: '',
            staffCode: '',
            contactNo: '',
            branchName: '',
            departmentName: '',
            designationName: '',
        }
    ])

    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])

    console.log("stateVal")
    console.log(stateVal)

    const staffLedger = {
        ledger: {
            staffName: `${stateVal[0]?.staffName}`,
            staffBranch: `${stateVal[0]?.branchName}`,
            staffDepartment: `${stateVal[0]?.departmentName}`,
            staffdesignation: `${stateVal[0]?.designationName}`,
            staffCode: `${stateVal[0]?.staffCode}`,
            staffPhnNo: `${stateVal[0]?.contactNo}`,
            table: stateVal.map((item, i) => ({
                ["s.no"]: i + 1,
                date: moment(item?.date).format('DD-MM-YYYY'),
                credit: Number(item?.credit),
                debit: Number(item?.debit),
            }))
        },
    };

    const footerFields = [
        ['Field Development Officer', '', 'Branch Manager'],
        ['Accounts', 'Area Manager', 'Director'],
    ];

    let snoCounter = 1;

    const paginatedData = [];
    let tempTable = [...staffLedger.ledger.table];

    // First page
    paginatedData.push(tempTable.splice(0, 13));

    // Middle pages
    while (tempTable.length > 20) {
        paginatedData.push(tempTable.splice(0, 20));
    }

    // Last page
    if (tempTable.length > 0) {
        paginatedData.push(tempTable);
    }

    const totals = staffLedger.ledger.table.reduce(
        (acc, row) => ({
            credit: acc.credit + Number(row.credit || 0),
            debit: acc.debit + Number(row.debit || 0),
        }),
        { credit: 0, debit: 0 }
    );

    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            {paginatedData.map((pageData, pageIndex) => (
                <div key={pageIndex} className="page-container" style={{ marginBottom: '10px' }}>
                    {pageIndex === 0 && (
                        <>
                            <Row className="mt-1 mb-1">
                                <Row className="text-center mt-2">
                                    <CompanyDetails
                                        fontSize="12px"
                                        imgOnly={true}
                                        imgSize="150px"
                                        classStyle="d-flex justify-content-center flex-column align-items-center"
                                    />
                                    <h3 style={{ color: 'black', marginTop: '10px' }}>Staff Ledger</h3>
                                </Row>
                                <Row className="justify-between mt-3">
                                    <Col className="text-black" style={{ fontSize: '16px', alignSelf: 'center' }}>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Staff Name</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffName || ''}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Staff Code</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffCode || ''}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Mobile No</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffPhnNo || ''}</Col>
                                        </Row>
                                    </Col>
                                    <Col className="text-black" style={{ fontSize: '16px', alignSelf: 'center' }}>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Branch</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffBranch || ''}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Department</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffDepartment || ''}</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4}>
                                                <strong>Designation</strong>
                                            </Col>
                                            <Col xs={1}>
                                                <strong>:</strong>
                                            </Col>
                                            <Col xs={7}>{staffLedger.ledger?.staffdesignation || ''}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </>
                    )}

                    {/* Table Data */}
                    <Table bordered hover style={{ borderColor: '#000', marginTop: '50px' }}>
                        <thead>
                            <tr>
                                <th style={{ color: 'black', textAlign: 'center' }}>SNO</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>DATE</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>CREDIT</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>DEBIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td style={{ fontSize: '12px', color: 'black', textAlign: 'center' }}>
                                        {snoCounter++}
                                    </td>
                                    <td style={{ fontSize: '12px', color: 'black', textAlign: 'center' }}>
                                        {row.date}
                                    </td>
                                    <td style={{ fontSize: '12px', color: 'black', textAlign: 'right' }}>
                                        {row.credit}
                                    </td>
                                    <td style={{ fontSize: '12px', color: 'black', textAlign: 'right' }}>
                                        {row.debit}
                                    </td>
                                </tr>
                            ))}
                            {pageIndex === paginatedData.length - 1 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'right', fontWeight: 'bold', color: 'black' }}>
                                        Total
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'black' }}>
                                        {totals.credit}
                                    </td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'black' }}>
                                        {totals.debit}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Footer Section (only on the last page) */}
                    {pageIndex === paginatedData.length - 1 && (
                        <div style={{ marginTop: '40px', padding: '10px' }}>
                            {footerFields.map((row, rowIndex) => (
                                <Row key={rowIndex} className="justify-between mb-2">
                                    {row.map((col, colIndex) => (
                                        <Col
                                            key={colIndex}
                                            className="text-center"
                                            style={{
                                                fontSize: '16px',
                                                color: 'black',
                                                fontWeight: 'bold',
                                                flex: 1,
                                                marginTop: "20px"
                                            }}>
                                            {col && <strong>{col}</strong>}
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </div>
                    )}

                    {/* Page Break */}
                    {pageIndex < paginatedData.length - 1 && <div className="page-break"></div>}
                </div>
            ))}

            <Row className="d-print-none mt-4">
                <Col className="text-end">
                    <Link
                        to="#"
                        className="btn btn-dark me-1"
                        onClick={(e) => {
                            window.print();
                        }}>
                        <i className="fa fa-print"></i>
                    </Link>
                    <Link to="#" className="btn btn-success me-1">
                        <i className="fa fa-download"></i> Download as PDF
                    </Link>
                </Col>
            </Row>

            <style>
                {`
                    @media print {
                        .page-break { 
                            page-break-before: always; 
                        }
                    }
                `}
            </style>
        </Container>
    );
}

export default Index;
