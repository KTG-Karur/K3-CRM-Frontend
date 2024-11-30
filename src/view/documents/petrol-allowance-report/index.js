import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import K3Logo from '../../../assets/images/K3_Logo.png';
import Petrol from '../../../assets/images/invoice_petrol.png';
import Petrol_1 from '../../../assets/images/petrol_1.jpeg';
import Petrol_2 from '../../../assets/images/petrol_2.jpeg';
import { size } from 'lodash';
import { Table } from 'react-bootstrap';
import moment from 'moment';

function Index() {
    const baseUrl = process.env?.baseURL || "http://localhost:5059";


    const { state } = useLocation();


    const [stateVal, setStateVal] = useState({})

    console.log(baseUrl +  stateVal?.billImageName)
    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])

    console.log("stateVal")
    console.log(stateVal)

    const petrolAllowance = {
        header: {
            logo: K3Logo,
            branch_name: 'Erode',
        },
        body: {
            to: 'Head Office, \n K3 Women Foundation \n Karur-06',
            subject: 'Sub: Reimbursement of Fuel/ Conveyance Expenses for the month of SEPTEMBER 24',
            body_content:
                'I hereby declared that I have actually incurred a sum of Rs.1860/- (Rupees one thousand eight hundred sixty only) towards fuel/conveyance expense for the month of SEPTEMBER 24 in respect of the official visits undertaken by me within the limitsof local authorities, while deischarging my official duties. I request that the same may be reimbursed to me. The necessary particulars in this behalf are given below:',
            details: {
                name: `${(stateVal?.staffName || '').toUpperCase()}`,
                desigination: `${(stateVal?.designationName || '').toUpperCase()}`,
                emply_no: `${(stateVal?.staffCode || '').toUpperCase()}`,
                place_of_duty: `${(stateVal?.branchName || '').toUpperCase()}`,
                maximum_entitlement: '20 L',
                claimed_for: '18.35 L',
            },
            declaration:
                'I declare that in case the information furnished by me in claim form is found to be incorrect in any manner, I shall be deem to have committed an act of miscount and disciplinary proceedings may be against me',
            office_use: {
                rupees: '1860',
                in_words: 'One Thousand eight hundred Sixty',
            },
        },
        images: [`${stateVal?.billImageName}`, Petrol, Petrol_2, Petrol, Petrol, Petrol_2, Petrol_1, Petrol_2, Petrol_1, Petrol],
        petrol_claim: {
            staff_name: 'TAMILSELVAN S',
            for_month: 'SEP 24',
            branch: 'ERODE',
            table: [
                {
                    date: '02/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR, SINTHAN NAGAR, THIRUNAGAR COLONY, PALLIPALAYAM, MARAPALAM',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '04/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '05/09/24',
                    from: 'BRANCH',
                    to: 'VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '06/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR, SINTHAN NAGAR, THIRUNAGAR COLONY, PALLIPALAYAM, MARAPALAM',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '06/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR, SINTHAN NAGAR, THIRUNAGAR COLONY, PALLIPALAYAM, MARAPALAM',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '06/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR, SINTHAN NAGAR, THIRUNAGAR COLONY, PALLIPALAYAM, MARAPALAM',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
                {
                    date: '06/09/24',
                    from: 'BRANCH',
                    to: 'SANGUNAGAR SAMPATHNAGAR, MGR NAGAR, VEERAPPANCHITHRAM, AMMAN NAGAR PERIYASEMUR, SINTHAN NAGAR, THIRUNAGAR COLONY, PALLIPALAYAM, MARAPALAM',
                    activity: 'REGULAR COLLECTION',
                    tkm: '50',
                    amount: '860',
                    bill_no: '5735',
                },
            ],
        },
        today: moment().format("DD-MM-YYYY")
    };

    const underlineStyle = (text) => ({
        display: 'inline-block',
        textAlign: 'center',
        borderBottom: '2px solid black',
        width: `${text.length * 12}px`,
        lineHeight: 1.5,
        verticalAlign: 'bottom',
    });

    const footerFields = [
        ['Field Development Officer', '', 'Branch Manager'],
        ['Accounts', 'Area Manager', 'Director'],
    ];

    const maxColumns = 7;
    const tableHeaders = Object.keys(petrolAllowance.petrol_claim.table[0] || {});
    const rowsPerPage = 6;

    const paginatedData = Array.from(
        { length: Math.ceil(petrolAllowance.petrol_claim.table.length / rowsPerPage) },
        (_, pageIndex) =>
            petrolAllowance.petrol_claim.table.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
    );

    const totals = petrolAllowance.petrol_claim.table.reduce(
        (acc, row) => ({
            tkm: acc.tkm + parseFloat(row.tkm || 0),
            amount: acc.amount + parseFloat(row.amount || 0),
            bill_no: acc.bill_no.includes(row.bill_no) ? acc.bill_no : [...acc.bill_no, row.bill_no],
        }),
        { tkm: 0, amount: 0, bill_no: [] }
    );


    return (
        <Container className="letter-container my-4 p-4 bg-light" style={{ maxWidth: '800px' }}>
            <Row className="mt-2 mb-4">
                <Row className="text-center">
                    <h4 className="mt-2">SCHEME-1</h4>
                    <h4 style={{ color: 'black' }}>DECLARATION BASIS</h4>
                </Row>

                <Row className="justify-between">
                    <Col style={{ whiteSpace: 'pre-line', fontSize: '16px', color: 'black' }}>
                        <h6 style={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>To</h6>
                        {petrolAllowance.body?.to || ''}
                    </Col>
                    <Col className="text-end mb-2 text-black" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Date: {petrolAllowance.today}
                    </Col>
                </Row>

                <Row style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <Row className="text-center">
                        <Col>
                            <p style={{ textAlign: 'left', color: 'black', fontSize: '16px' }}>
                                {petrolAllowance.body?.subject || ''}
                            </p>
                            <div style={{ fontSize: '24px', textAlign: 'center', color: 'black' }}>{'*'.repeat(5)}</div>
                        </Col>
                    </Row>
                    <Row className="text-justify">
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                            {petrolAllowance.body?.body_content || ''}
                        </Col>
                    </Row>
                </Row>

                <Row className="justify-between align-center mt-4">
                    <Col className="text-black" style={{ fontSize: '16px', alignSelf: 'center' }}>
                        <Row>
                            <Col xs={4}>
                                <strong>1. Name</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.name || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>2. Designation</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details.desigination || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>3. Employee No</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.emply_no || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>4. Place of duty</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.place_of_duty || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>5. Maximum Entitlement</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.maximum_entitlement || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>6. Claimed For</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.claimed_for || ''}</Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="text-justify mt-4">
                    <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                        {petrolAllowance.body?.declaration || ''}
                    </Col>
                </Row>

                <Row className="justify-between mt-2">
                    <Col className="text-black" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Date: {petrolAllowance.today}
                    </Col>
                    <Col className="text-black text-end" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Signature
                    </Col>
                </Row>

                <Row className="mt-4 mb-4">
                    <div
                        style={{
                            borderColor: 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}></div>
                </Row>

                <Row className="mt-1 mb-2 text-left">
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '16px' }}>FOR OFFICE USE ONLY</h4>
                    <p style={{ fontSize: '16px', color: 'black' }}>
                        Passed for Rs. <span style={underlineStyle(petrolAllowance.body?.office_use.rupees)}></span>/_{' '}
                        <br />
                        (Rupees <span style={underlineStyle(petrolAllowance.body?.office_use.in_words)}></span> only)
                    </p>
                </Row>
            </Row>

            {petrolAllowance.images && <div className="page-break"></div>}

            <Row className="justify-content-center mb-4" style={{ gap: '20px', marginTop: '40px' }}>
                {petrolAllowance.images.slice(0, 4).map((image, index) => (
                    <Col
                        key={index}
                        md={5}
                        className="d-flex justify-content-center align-items-center mb-3 mt-6"
                        style={{ padding: '10px' }}>
                        <img
                            src={image}
                            alt={`Petrol Image ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                            }}
                        />
                    </Col>
                ))}
            </Row>

            {petrolAllowance.images.length > 4 && <div className="page-break"></div>}

            {petrolAllowance.images.length > 4 && (
                <Row className="justify-content-center mb-4" style={{ gap: '20px', marginTop: '40px' }}>
                    {petrolAllowance.images.slice(4).map((image, index) => (
                        <Col
                            key={index + 4}
                            md={5}
                            className="d-flex justify-content-center align-items-center mb-3"
                            style={{ padding: '10px' }}>
                            <img
                                src={image}
                                alt={`Petrol Image ${index + 5}`}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {petrolAllowance.petrol_claim && <div className="page-break"></div>}

            {paginatedData.map((pageData, pageIndex) => (
                <div key={pageIndex} className="page-container" style={{ marginBottom: '20px' }}>
                    <Row className="mt-1 mb-2">
                        <Row className="text-center mt-2 mb-2">
                            <h3 style={{ color: 'black' }}>Petrol Claim</h3>
                        </Row>

                        <Row className="justify-between mt-2">
                            <Col className="text-black" style={{ fontSize: '16px', alignSelf: 'center' }}>
                                <Row>
                                    <Col xs={4}>
                                        <strong>Staff Name</strong>
                                    </Col>
                                    <Col xs={1}>
                                        <strong>:</strong>
                                    </Col>
                                    <Col xs={7}>{petrolAllowance.petrol_claim?.staff_name || ''}</Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>
                                        <strong>For Month</strong>
                                    </Col>
                                    <Col xs={1}>
                                        <strong>:</strong>
                                    </Col>
                                    <Col xs={7}>{petrolAllowance.petrol_claim?.for_month || ''}</Col>
                                </Row>
                            </Col>
                            <Col className="text-end text-black" style={{ fontSize: '16px', alignSelf: 'end' }}>
                                <strong>Branch:</strong> {petrolAllowance.petrol_claim?.branch || ''}
                            </Col>
                        </Row>
                    </Row>
                    <Table bordered hover style={{ borderColor: '#000' }}>
                        <thead>
                            <tr>
                                {tableHeaders.slice(0, maxColumns).map((header, index) => (
                                    <th key={index} style={{ color: "black" }}>{header.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {tableHeaders.slice(0, maxColumns).map((header, colIndex) => (
                                        <td style={{ fontSize: "12px" }} key={colIndex}>{row[header]}</td>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold', color: "black" }}>
                                    Total
                                </td>
                                <td>{totals.tkm}</td>
                                <td>{totals.amount}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{ marginTop: '20px', padding: '10px' }}>
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
                                        }}>
                                        {col && <strong>{col}</strong>}
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
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
