import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import LetterForm from '../../../components/Reports/Letterform';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { fiscalYear } from '../../../utils/AllFunction';
import moment from 'moment';

function Index() {
    const baseUrl = process.env?.baseURL || "http://localhost:5059";

    const today = moment().format('DD-MM-YYYY');
    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({})

    const birthdayClaim = {
        header: {
            logo: 'logo.png',
            address: 'Head Office, Karur',
        },
        address: {
            address: `Rc.No.${stateVal?.claimId}/${fiscalYear(stateVal?.applyDate)}, \n The Branch Managers,\n K3 Women Foundation`,
        },
        subject: {
            subject: 'Sub: Staff Birthday claim – format enclosed -reg.',
        },
        body: {
            body: `Our management has announced many welfare measures as a reward for the
performance of the branches and to motivate them to put in their fullest efforts to achieve
the set targets for the year end.`,
            birthdayClaimBody: `Reimbursement of Birthday gift is one such benefit which is 
            introduced to benefit all categories of staff members equally. Now the limit for 
            “Reimbursement of Birthday Gift” is announced Rs.${stateVal?.claimAmount}.00/- for all category of employees 
            and enclosed herewith format for applying staff birthday claim format and forward 
            through branch head for sanctioning process.`,
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
        note: 'Claim shall be made within 30 days from the birthday',
        branchName: ` ${stateVal?.branchName}`,
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
            birthdayClaimAmount: `Rs. ${stateVal?.eligibleAmount || 0}.00`,
            modeOfPayment: ` ${stateVal?.paymentModeName  || "Cash"}`,
        },
        branchRecommendation: {
            rupees: `${stateVal?.claimAmount}.00`,
            to: ` ${stateVal?.requestedBy}`,
            on: ` ${moment(stateVal?.dob).format('DD-MM-YYYY')}`,
        },
        officeUse: {
            admin: {
                dateOfBirth: ` ${moment(stateVal?.dob).format('DD-MM-YYYY')}`,
                foundStatus: `${stateVal?.statusId == 29 ? 'correct' : 'incorrect'}`,
                claimStatus: `${stateVal?.statusId == 29 ? 'Sanctioned' : 'Rejected'}`,
            },
            accounts: {
                originalReceiptAmount: `${stateVal?.requestedAmount || 0}.00`,
                eligibleAmount: `${stateVal?.eligibleAmount || 0}.00`,
                passedForPayment: `${stateVal?.claimAmount || 0}.00`,
            },
        },
        receiptImage: `${baseUrl}${stateVal?.recepitImageName}` || false
    };

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

    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])

    const footerFields = [
        ['Clerical', 'Officer', "MD", "SD Chairman"],
    ];

    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            {/* <Row className="mb-3"> */}
            {/* ******************************** Page - 1 ******************************** */}
            <LetterForm
                Header={birthdayClaim.header}
                Address={birthdayClaim.address}
                Date={today}
                Regards={birthdayClaim.regards}
                Conclusion={birthdayClaim.conclusion}
                Footer={birthdayClaim.footer}>
                <Row style={{ marginBottom: '40px', marginTop: '50px' }}>
                    <Row className="text-center mb-3 mt-2">
                        <Col>
                            <p style={{ textAlign: 'left', color: 'black', fontSize: '16px' }}>
                                {birthdayClaim.subject?.subject || ''}
                            </p>
                            <div style={{ fontSize: '24px', textAlign: 'center', color: 'black' }}>{'*'.repeat(5)}</div>
                        </Col>
                    </Row>
                    <Row className="text-justify mb-3">
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                            {birthdayClaim.body?.body || ''}
                        </Col>
                        <p
                            style={{
                                fontSize: 16,
                                textAlign: 'left',
                                color: 'black',
                                marginTop: '10px',
                                fontWeight: 'bold',
                            }}>
                            Birthday claim:
                        </p>
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                            {birthdayClaim.body?.birthdayClaimBody || ''}
                        </Col>
                    </Row>
                    <Col style={{ textAlign: 'justify', fontSize: '16px', color: 'black' }}>
                        {birthdayClaim.body?.acknowlegement || ''}
                    </Col>
                </Row>
            </LetterForm>
            {/* ******************************** End Page - 1 ******************************** */}

            {/* ******************************** Page - 2 ******************************** */}
            {birthdayClaim.receiptImage && <div className="page-break"></div>}
            {
                birthdayClaim.receiptImage &&
                <Row className="justify-content-center mb-4" style={{ gap: '20px', marginTop: '40px' }}>
                    <Col
                        md={5}
                        className="d-flex justify-content-center align-items-center mb-3 mt-6"
                        style={{ padding: '10px' }}>
                        <img
                            src={birthdayClaim.receiptImage}
                            crossOrigin="anonymous"
                            alt={`birthdayClaim receipt image`}
                            style={{
                                width: '100%',
                                height: '400px',
                                objectFit: 'contain',
                            }} />
                    </Col>
                </Row>
            }

            {/* ******************************** End Page - 2 ******************************** */}

            {/* ******************************** Page - 3 ******************************** */}
            {birthdayClaim.note && <div className="page-break"></div>}
            <Row style={{ marginTop: '10px' }}>
                <Row className="text-left">
                    <Col>
                        <p style={{ fontSize: '16px', color: '#000' }}>
                            Note :
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                {birthdayClaim?.note || ''}
                            </span>
                        </p>
                    </Col>
                </Row>
                <Row className="text-left">
                    <Col style={{ flex: 0.7 }}>
                        <p style={{ fontSize: '16px', color: '#000' }}>
                            Format for applying Staff birthday claim -
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                {birthdayClaim?.branchName || ''} branch
                            </span>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-end">
                        <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                            Date :
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                {birthdayClaim.staffDetails?.date || ''}
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
                                {birthdayClaim.staffDetails?.staffName || ''}
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
                                {birthdayClaim.staffDetails?.staffDesigination || ''} /{' '}
                                {birthdayClaim.staffDetails?.staffCadre || ''}
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
                                {birthdayClaim.staffDetails?.staffDateOfBirth || ''}
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
                                {birthdayClaim.staffDetails?.staffDateOfJoining || ''}
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
                                {birthdayClaim.staffDetails?.purposeofClaim || ''}
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
                                {birthdayClaim.staffDetails?.purchaseBillValue || ''} &{' '}
                                {birthdayClaim.staffDetails?.purchaseBillDate || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-left flex-1">
                        <Col style={{ flex: 0.45 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                                7. Birthday claim amount
                            </span>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>:</span>
                        </Col>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ fontSize: '16px', color: '#000' }}>
                                {birthdayClaim.staffDetails?.birthdayClaimAmount || ''}
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
                                {birthdayClaim.staffDetails?.modeOfPayment || ''}
                            </p>
                        </Col>
                    </Row>
                </Row>
                <Row className="text-left">
                    <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold', marginTop: '10px' }}>
                        Branch Recommendation:
                    </p>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000'}}>
                        We recommend to sanction Staff birthday claim of Rs.{' '}
                        <span style={underlineStyle(birthdayClaim.branchRecommendation?.rupees || '')}>
                            {birthdayClaim.branchRecommendation?.rupees || ''}{'/- '}
                        </span>
                        to{' '}
                        <span style={underlineStyle(birthdayClaim.branchRecommendation?.to || '')}>
                            {birthdayClaim.branchRecommendation?.to || ''}{' '}
                        </span>{' '}
                        and <span>{getPronoun(birthdayClaim.branchRecommendation?.to || '')}</span> birthday is held on{' '}
                        <span style={underlineStyle(birthdayClaim.branchRecommendation?.on || '')}>
                            {birthdayClaim.branchRecommendation?.on || ''}.
                        </span>
                    </span>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    <Col className="text-end">
                        <p style={{ fontSize: '16px', color: '#000', fontWeight: 'bold' }}>
                            Signature of the Branch Head
                        </p>
                    </Col>
                </Row>
                <Row className="mt-1 text-left">
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
                        ADMIN
                    </h4>
                    <p style={{ fontSize: '16px', color: '#000' }}>
                        Original date of birth{' '}
                        <span style={underlineStyle(birthdayClaim.officeUse.admin?.dateOfBirth || '')}>
                            {birthdayClaim.officeUse.admin?.dateOfBirth || ''}.
                        </span>{' '}
                        is found <span>{birthdayClaim.officeUse.admin?.foundStatus || ''}.</span> with employee master
                        date. Hence the above claim may be{' '}
                        <span>{birthdayClaim.officeUse.admin?.claimStatus || ''}.</span> .
                    </p>
                    <h4
                        style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '16px',
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
                                    style={underlineStyle(
                                        birthdayClaim.officeUse.accounts?.originalReceiptAmount || ''
                                    )}>
                                    {birthdayClaim.officeUse.accounts?.originalReceiptAmount || ''}
                                </span>
                                /_ <br />
                                Rs.{' '}
                                <span style={underlineStyle(birthdayClaim.officeUse.accounts?.eligibleAmount || '')}>
                                    {' '}
                                    {birthdayClaim.officeUse.accounts?.eligibleAmount || ''}
                                </span>
                                /_ <br />
                                Rs.{' '}
                                <span style={underlineStyle(birthdayClaim.officeUse.accounts?.passedForPayment || '')}>
                                    {birthdayClaim.officeUse.accounts?.passedForPayment || ''}
                                </span>
                                /_{' '}
                            </p>
                        </Col>
                    </Row>
                </Row>

                <div style={{ marginTop: '40px', padding: '10px' }}>
                    {footerFields.map((row, rowIndex) => (
                        <Row key={rowIndex} className="justify-between">
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
                    <Link to="#" className="btn btn-success me-1" onClick={downloadPDF}>
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
