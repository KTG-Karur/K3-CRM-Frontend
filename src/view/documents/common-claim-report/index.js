import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import LetterForm from '../../../components/Reports/Letterform';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import companyLogo from '../../../assets/images/K3_Logo.png';
import moment from 'moment';
import { fiscalYear } from '../../../utils/AllFunction';
import { baseURL } from '../../../api/ApiConfig';

function Index() {

    
    const baseUrl = baseURL || "https://crmapi.repatriatepeoples.com";
    const claimAmount = '1000';
    const today = moment().format("DD-MM-YYYY");

    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({});

    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state]);

    const commonClaim = {
        header: {
            logo: 'logo.png',
            address: 'Head Office, Karur',
        },
        address: {
            address: `Rc.No.${stateVal?.claimId}/${fiscalYear(stateVal?.applyDate)}/${stateVal?.roleName}, \n The Branch Managers,\n K3 Women Foundation`,
        },
        subject: {
            subject: `Sub: Staff ${stateVal.claimTypeName} claim – format enclosed -reg.`,
        },
        body: {
            body: `Our management has announced many welfare measures as a reward for the
performance of the branches and to motivate them to put in their fullest efforts to achieve
the set targets for the year end.`,
            commonClaimBody: `We are pleased to introduce a new benefit to support all categories of staff members equally. For this specific benefit, the approved reimbursement limit is ${claimAmount}, applicable to all employees.The format for applying for the ${stateVal.claimTypeName} has been enclosed and should be submitted through the branch head for approval as part of the sanctioning process.`,

            acknowlegement: 'Receipt of the circular shall be acknowledged.',
        },
        regards: {
            regards: 'Yours sincerely,',
            sign: 'Sd/-',
            to: 'Chairman,',
            companyName: 'K3 Women Foundation',
        },
        conclusion: {
            mdName: 'Managing Director',
            companyName: 'K3 Women Foundation',
        },
        footer: {
            copyTo: [
                {
                    branch: 'All Branch',
                },
            ],
        },
        branchName: `${stateVal.branchName}`,
        staffDetails: {
            date: ` ${moment(stateVal?.applyDate).format("DD-MM-YYYY")}`,
            staffName: ` ${stateVal?.requestedBy}`,
            staffDesigination: ` ${stateVal?.designationName}`,
            staffCadre: ` ${stateVal?.roleName}`,
            staffDateOfBirth: ` ${moment(stateVal?.dob).format('DD-MM-YYYY')}`,
            staffDateOfJoining: ` ${moment(stateVal?.dateOfJoining).format('DD-MM-YYYY')}`,
            purposeofClaim: `${stateVal?.claimTypeName || ''}`,
            purchaseBillValue: `Rs. ${stateVal?.requestedAmount}.00`,
            purchaseBillDate: ` ${moment(stateVal?.applyDate).format('DD-MM-YYYY')}`,
            commonClaimAmount: `Rs. ${stateVal?.eligibleAmount || 0}.00`,
            modeOfPayment: ` ${stateVal?.paymentModeName  || "Cash"}`,
        },
        branchRecommendation: {
            rupees: `${stateVal?.claimAmount}.00`,
            to: `${stateVal.requestedBy || ""}`,
        },
        officeUse: {
            accounts: {
                originalReceiptAmount: `${stateVal?.requestedAmount || 0}.00`,
                eligibleAmount: `${stateVal?.eligibleAmount || 0}.00`,
                passedForPayment: `${stateVal?.claimAmount || 0}.00`,
            },
        },
        receiptImage: `${baseUrl}${stateVal?.recepitImageName}` || false
    };

    console.log(stateVal)

    const downloadPDF = () => {
        const element = document.querySelector('.letter-container');
        const actionRow = document.querySelector('.d-print-none');

        actionRow.style.display = 'none';

        html2canvas(element, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Permission_Leave_Slip.pdf');

            actionRow.style.display = 'flex';
        });
    };

    const underlineStyle = (text) => ({
        display: 'inline-block',
        textAlign: 'center',
        borderBottom: '2px solid black',
        width: `${text.length * 12}px`,
        lineHeight: 1.5,
        verticalAlign: 'bottom',
    });

    const getPronoun = (name) => {
        if (name.startsWith('Mr')) return 'his';
        if (name.startsWith('Mrs') || name.startsWith('Ms')) return 'her';
        return 'their';
    };

    const footerFields = [['Clerical', 'Officer', 'MD', 'SD Chairman']];

    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            {/* <Row className="mb-3"> */}
            <LetterForm
                Header={commonClaim.header}
                Address={commonClaim.address}
                Date={today}
                Regards={commonClaim.regards}
                Conclusion={commonClaim.conclusion}
                Footer={commonClaim.footer}>
                <Row style={{ marginBottom: '40px', marginTop: '50px' }}>
                    <Row className="text-center mb-3 mt-2">
                        <Col>
                            <p style={{ textAlign: 'left', color: 'black', fontSize: '16px' }}>
                                {commonClaim.subject?.subject || ''}
                            </p>
                            <div style={{ fontSize: '24px', textAlign: 'center', color: 'black' }}>{'*'.repeat(5)}</div>
                        </Col>
                    </Row>
                    <Row className="text-justify mb-3">
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                            {commonClaim.body?.body || ''}
                        </Col>
                        <p
                            style={{
                                fontSize: 16,
                                textAlign: 'left',
                                color: 'black',
                                marginTop: '10px',
                                fontWeight: 'bold',
                            }}>
                            {stateVal.claimTypeName} claim:
                        </p>
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                            {commonClaim.body?.commonClaimBody || ''}
                        </Col>
                    </Row>
                    <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                        {commonClaim.body?.acknowlegement || ''}
                    </Col>
                </Row>
            </LetterForm>
            {commonClaim.branchName && <div className="page-break"></div>}
            <Row style={{ marginTop: '40px' }}>
                <Row className="text-left">
                    <Col style={{ flex: 0.7 }}>
                        <p style={{ fontSize: '16px', color: '#000' }}>
                            Format for applying Staff {stateVal.claimTypeName} claim -&nbsp;
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}> 
                                {commonClaim?.branchName || ''} branch
                            </span>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-end">
                        <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                            Date :
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.date || ''}
                            </span>
                        </p>
                    </Col>
                </Row>
                <Row className="mx-3">
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                1. Name of the staff
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.staffName || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                2. Designation & Cadre
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.staffDesigination || ''} /{' '}
                                {commonClaim.staffDetails?.staffCadre || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                3. Date of Birth
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.staffDateOfBirth || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                4. Date of Joining
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.staffDateOfJoining || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                5.Purpose of the claim
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.purposeofClaim || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                6. Purchase bill value & Date
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.purchaseBillValue || ''} &{' '}
                                {commonClaim.staffDetails?.purchaseBillDate || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                7. {stateVal?.claimTypeName} amount
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.commonClaimAmount || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                8. Mode of payment
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {commonClaim.staffDetails?.modeOfPayment || ''}
                            </p>
                        </Col>
                    </Row>
                </Row>
                <Row className="text-left">
                    <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginTop: '20px' }}>
                        Branch Recommendation:
                    </p>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', marginTop: '10px' }}>
                        We recommend to sanction Staff {stateVal?.claimTypeName} of Rs.{' '}
                        <span style={underlineStyle(commonClaim.branchRecommendation?.rupees || '0')}>
                            {commonClaim.branchRecommendation?.rupees || ''}{' '}
                        </span>
                        to{' '}
                        <span style={underlineStyle(commonClaim.branchRecommendation?.to || '')}>
                            {commonClaim.branchRecommendation?.to || ''}{' '}
                        </span>{' '}
                    </span>
                </Row>
                <Row style={{ marginTop: '60px' }}>
                    <Col className="text-end">
                        <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                            Signature of the Branch Head
                        </p>
                    </Col>
                </Row>
                <Row className="mt-1 mb-2 text-left">
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '16px', color: '#000' }}>
                        FOR OFFICE USE ONLY
                    </h4>
                    <h4
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '16px',
                            marginTop: '10px',
                            color: '#000',
                        }}>
                        ACCOUNTS
                    </h4>
                    <Row className="mx-5">
                        <Col style={{ flex: 0.4 }}>
                            <p style={{ fontSize: '16px', color: 'black' }}>
                                1. Original Receipt Amount <br />
                                2. Eligible Amount <br />
                                3. Passed for payment
                            </p>
                        </Col>
                        <Col style={{ flex: 0.6 }}>
                            <p style={{ fontSize: '16px', color: 'black' }}>
                                Rs.{' '}
                                <span
                                    style={underlineStyle(commonClaim.officeUse.accounts?.originalReceiptAmount || '')}>
                                    {commonClaim.officeUse.accounts?.originalReceiptAmount || ''}
                                </span>
                                /_ <br />
                                Rs.{' '}
                                <span style={underlineStyle(commonClaim.officeUse.accounts?.eligibleAmount || '')}>
                                    {' '}
                                    {commonClaim.officeUse.accounts?.eligibleAmount || ''}
                                </span>
                                /_ <br />
                                Rs.{' '}
                                <span style={underlineStyle(commonClaim.officeUse.accounts?.passedForPayment || '')}>
                                    {commonClaim.officeUse.accounts?.passedForPayment || ''}
                                </span>
                                /_{' '}
                            </p>
                        </Col>
                    </Row>
                </Row>
                <div style={{ marginTop: '30px', padding: '10px' }}>
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
            </Row>

            {/* ******************************** Page - 3 ******************************** */}
            {commonClaim.receiptImage && <div className="page-break"></div>}

            {commonClaim.receiptImage &&
                <Row className="justify-content-center mb-4" style={{ gap: '20px', marginTop: '40px' }}>
                    <Col
                        md={5}
                        className="d-flex justify-content-center align-items-center mb-3 mt-6"
                        style={{ padding: '10px' }}>
                        <img
                            src={commonClaim.receiptImage}
                            crossOrigin="anonymous"
                            alt="claim Report"
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                            }} />
                    </Col>
                </Row>
            }

            {/* ******************************** End Page - 3 ******************************** */}

            {/* </Row> */}

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
                    {/* <Link to="#" className="btn btn-success me-1" onClick={downloadPDF}>
                        <i className="fa fa-download"></i> Download as PDF
                    </Link> */}
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
