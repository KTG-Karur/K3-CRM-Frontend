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
import CompanyDetails from '../../../components/Atom/CompanyDetails';
import { numberToRupeesWords } from '../../../utils/AllFunction';

function Index() {
    const baseUrl = process.env?.baseURL || "http://localhost:5059";

    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({
        personalDetails: {},
        billDetails: [],
        petrolPurchase: [],
        claimedFor: 0,
        tolBillAmount: 0,
    })

    useEffect(() => {
        if (state != undefined && state != null) {
            const result = JSON.parse(state?.petrolPurchase || "[]").reduce((acc, curr) => {
                const existing = acc.find(item =>
                    item.billNo === curr.billNo &&
                    item.dateOfPurchase === curr.dateOfPurchase &&
                    item.fromPlace === curr.fromPlace &&
                    item.toPlace === curr.toPlace
                );
                if (existing) {
                    existing.activityName += ` & ${curr.activityName}`;
                } else {
                    acc.push({ ...curr });
                }
                return acc;
            }, []);
            setStateVal({
                ...stateVal,
                personalDetails: state || {},
                billDetails: JSON.parse(state?.billDetails || "[]"),
                petrolPurchase: result,
            });
        }
    }, [state])

    const petrolAllowance = {
        header: {
            logo: K3Logo,
            branchName: 'Erode',
        },
        body: {
            to: 'Head Office, \n K3 Women Foundation \n Karur-06',
            subject: 'Sub: Reimbursement of Fuel/ Conveyance Expenses for the month of SEPTEMBER 24',
            bodyContent:
                `I hereby declared that I have actually incurred a sum of Rs. ${stateVal?.tolBillAmount || 0}/- (${numberToRupeesWords(stateVal?.tolBillAmount || 0)} only) towards fuel/conveyance expense for the month of  ${moment(stateVal.personalDetails?.allowanceDate).format('MMMM - YY') || ''} in respect of the official visits undertaken by me within the limitsof local authorities, while deischarging my official duties. I request that the same may be reimbursed to me. The necessary particulars in this behalf are given below:`,
            details: {
                name: `${(stateVal.personalDetails?.staffName || '').toUpperCase()}`,
                desigination: `${(stateVal.personalDetails?.designationName || '').toUpperCase()}`,
                empNo: `${(stateVal.personalDetails?.staffCode || '').toUpperCase()}`,
                placeOfDuty: `${(stateVal.personalDetails?.branchName || '').toUpperCase()}`,
                maximumEntitlement: '20 L',
                claimedFor: `${stateVal?.claimedFor || 0}L`,
            },
            declaration:
                'I declare that in case the information furnished by me in claim form is found to be incorrect in any manner, I shall be deem to have committed an act of miscount and disciplinary proceedings may be against me',
            officeUse: {
                rupees: `${stateVal?.tolBillAmount || 0}`,
                inWords: `${numberToRupeesWords(stateVal?.tolBillAmount || 0)}`,
            },
        },
        images: stateVal.billDetails.map(item => (`${baseUrl}${item?.billImageName}` || '')),
        billDetails: {
            table: stateVal?.billDetails.map(item => ({
                "bill no": item?.billNo,
                "date Of purchase": moment(item?.dateOfPurchase).format('DD/MM/YYYY'),
                "Name of the Dealer": item?.nameOftheDealer,
                "price per litre": item?.pricePerLitir,
                "Qty purchased in Litre": item?.qtyPerLitre,
                "Total amount": item?.totalAmount
            }))
        },
        petrolClaim: {
            staffName: `${(stateVal.personalDetails?.staffName || '').toUpperCase()}`,
            forMonth: `${moment(stateVal.personalDetails?.allowanceDate).format('MMM - YY') || ''}`,
            branch: `${stateVal.personalDetails?.branchName || ''}`,
            table: stateVal?.petrolPurchase.map(item => ({
                "Date": moment(item?.allowanceDate).format('DD/MM/YYYY'),
                "From.place": item?.fromPlace,
                "To.place": item?.toPlace,
                "Activity": item?.activityName,
                "T.km": item?.totalKm,
                "T.amount": item?.totalAmount || 0,
                "billno": item?.billNo || "-",
            }))
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
    const tableHeaders = Object.keys(petrolAllowance.petrolClaim.table[0] || {});
    const tableBillDetailsHeaders = Object.keys(petrolAllowance.billDetails.table[0] || {});
    const rowsPerPage = 6;
    const rowsPerPageBill = 6;

    const paginatedData = Array.from(
        { length: Math.ceil(petrolAllowance.petrolClaim.table.length / rowsPerPage) },
        (_, pageIndex) =>
            petrolAllowance.petrolClaim.table.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
    );

    const paginatedBillDetailsData = Array.from(
        { length: Math.ceil(petrolAllowance.billDetails.table.length / rowsPerPageBill) },
        (_, pageIndex) =>
            petrolAllowance.billDetails.table.slice(pageIndex * rowsPerPageBill, (pageIndex + 1) * rowsPerPageBill)
    );

    const totals = petrolAllowance.petrolClaim.table.reduce(
        (acc, row) => ({
            tkm: acc.tkm + parseFloat(row["T.km"] || 0),
            amount: acc.amount + parseFloat(row["T.amount"] || 0),
        }),
        { tkm: 0, amount: 0 }
    );

    const totalBillAmount = petrolAllowance.billDetails.table.reduce(
        (acc, row) => {
            const qtyPurVal = row["Qty purchased in Litre"].split("/");
            const slashbeforeVal = `${qtyPurVal[0]}.${qtyPurVal[1]}`;
            return ({
                tolQtyPerLitre: acc.tolQtyPerLitre + parseFloat(slashbeforeVal || 0),
                tolAmount: acc.tolAmount + parseFloat(row["Total amount"] || 0),
            })
        },
        { tolQtyPerLitre: 0, tolAmount: 0 }
    );

    useEffect(() => {
        if (totalBillAmount?.tolQtyPerLitre > 0 && stateVal.claimedFor == 0) {
            setStateVal({
                ...stateVal,
                claimedFor: totalBillAmount?.tolQtyPerLitre || 0,
                tolBillAmount: totalBillAmount?.tolAmount || 0
            })
        }
    }, [totalBillAmount])

    return (
        <Container className="letter-container my-4 p-4 bg-light" style={{ maxWidth: '800px' }}>
            <Row className="mt-2 mb-4">
                {/* <CompanyDetails fontSize="12px" imgSize="150px" classStyle="d-flex justify-content-center flex-column align-items-center" />
                <hr className='mx-3'></hr> */}
                {/* *********************** page-1 *********************** */}
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
                            {petrolAllowance.body?.bodyContent || ''}
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
                            <Col xs={7}>{petrolAllowance.body.details?.empNo || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>4. Place of duty</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.placeOfDuty || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>5. Maximum Entitlement</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.maximumEntitlement || ''}</Col>
                        </Row>
                        <Row>
                            <Col xs={4}>
                                <strong>6. Claimed For</strong>
                            </Col>
                            <Col xs={1}>
                                <strong>:</strong>
                            </Col>
                            <Col xs={7}>{petrolAllowance.body.details?.claimedFor || ''}</Col>
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
                        Passed for Rs. <span style={underlineStyle(petrolAllowance.body?.officeUse.rupees)}>{petrolAllowance.body?.officeUse.rupees}</span>/_{' '}
                        <br />
                        (Rupees <span style={underlineStyle(petrolAllowance.body?.officeUse.inWords)}>{petrolAllowance.body?.officeUse.inWords}</span> only)
                    </p>
                </Row>
            </Row>

            {/* *********************** End page-1 *********************** */}
            {/* *********************** Start page-2 *********************** */}

            {petrolAllowance?.images && <div className="page-break"></div>}

            <Row className="justify-content-center mb-4" style={{ gap: '20px', marginTop: '40px' }}>
                {petrolAllowance.images.map((image, index) => (
                    <Col
                        key={index}
                        md={5}
                        className="d-flex justify-content-center align-items-center mb-3 mt-6"
                        style={{ padding: '10px' }}>
                        <img
                            src={image}
                            crossOrigin="anonymous"
                            alt={`Petrol Image ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                            }} />
                        {(index + 1) % 4 == 0 && <div className="page-break"></div>}
                    </Col>
                ))}
            </Row>

            {/* *********************** End page-2 *********************** */}
            {/* *********************** Start page-3 *********************** */}
            {petrolAllowance.billDetails && <div className="page-break"></div>}

            {paginatedBillDetailsData.map((pageBillData, pageIndex) => {
                return (
                    <div key={pageIndex} className="page-container" style={{ marginBottom: '20px' }}>
                        <Row className="mt-1 mb-2">
                            <Row className="text-center mt-2 mb-2">
                                <h3 style={{ color: 'black' }}>SUMMARY OF BILLS SUBMITTED</h3>
                            </Row>
                        </Row>
                        <Table bordered hover style={{ borderColor: '#000' }}>
                            <thead>
                                <tr>
                                    {tableBillDetailsHeaders.slice(0, maxColumns).map((header, index) => (
                                        <th key={index} style={{ color: "black" }}>{header.toUpperCase()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pageBillData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {tableBillDetailsHeaders.slice(0, maxColumns).map((header, colIndex) => {
                                            return (
                                                <td style={{ fontSize: "12px" }} key={colIndex}>{row[header]}</td>
                                            )
                                        })}
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold', color: "black" }}>
                                        Total
                                    </td>
                                    <td>{totalBillAmount?.tolQtyPerLitre || 0}</td>
                                    <td>{totalBillAmount?.tolAmount || 0}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )
            })}

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
                    Passed for Rs. <span style={underlineStyle(petrolAllowance.body?.officeUse.rupees)}>{petrolAllowance.body?.officeUse.rupees}</span>/_{' '}
                    <br />
                    (Rupees <span style={underlineStyle(petrolAllowance.body?.officeUse.inWords)}>{petrolAllowance.body?.officeUse.inWords}</span> only)
                </p>
            </Row>

            {/* *********************** End  page-3 *********************** */}
            {/* *********************** Start  page-4 *********************** */}

            {petrolAllowance.petrolClaim && <div className="page-break"></div>}

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
                                    <Col xs={7}>{petrolAllowance.petrolClaim?.staffName || ''}</Col>
                                </Row>
                                <Row>
                                    <Col xs={4}>
                                        <strong>For Month</strong>
                                    </Col>
                                    <Col xs={1}>
                                        <strong>:</strong>
                                    </Col>
                                    <Col xs={7}>{petrolAllowance.petrolClaim?.forMonth || ''}</Col>
                                </Row>
                            </Col>
                            <Col className="text-end text-black" style={{ fontSize: '16px', alignSelf: 'end' }}>
                                <strong>Branch:</strong> {petrolAllowance.petrolClaim?.branch || ''}
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

            {/* *********************** Start  page-4 *********************** */}



            {/* *********************** Start pdf download *********************** */}

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
                    {/* <Link to="#" className="btn btn-success me-1">
                        <i className="fa fa-download"></i> Download as PDF
                    </Link> */}
                </Col>
            </Row>

            {/* *********************** End pdf download *********************** */}

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
