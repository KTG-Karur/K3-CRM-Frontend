import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import LetterForm from '../../components/Reports/Letterform';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Index() {
    const today = new Date().toLocaleDateString();

    const deputationOrder = {
        header: {
            logo: 'logo.png',
            letterName: 'Deputation Order',
            address: 'Head Office, Karur',
        },
        address: {
            address: `Rc.No.Estt/2024-25/AAD,\nThe Branch Manager & Staff member,\nErode Branch,\nK3 Women Foundation`,
        },
        subject: {
            subject: 'Sub: Deputation Order - issue - reg.',
        },
        body: {
            body: `As per the instruction from the appropriate authority, it has been decided that Sri 
            Tamilselvan, Branch Manager and Sri S. Abishek, FDO, is hereby deputed to the Arur branch on 
            weekly two days (Friday and Saturday) for recovery work with effect from today onwards until further orders.`,
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
            address: 'Company Address, City, State, Zip',
        },
        footer: {
            copyTo: [
                {
                    desigination: "The Branch Manager",
                    branch: "Karur Branch",
                    company: "K3 Women Foundation"
                },
            ]
        },
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

    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            {/* <Row className="mb-3"> */}
                <LetterForm
                    Header={deputationOrder.header} 
                    Address={deputationOrder.address} 
                    Date={today} 
                    Regards={deputationOrder.regards}
                    Conclusion={deputationOrder.conclusion}
                    Footer={deputationOrder.footer}
                >
                    <Row style={{marginBottom: "60px",marginTop: "50px"}}>
                        <div>
                            <view>
                                <text className="text-black" style={{ fontSize: '16px' }}>
                                    Sir,
                                </text>
                            </view>
                        </div>
                        <Row className="text-center mb-3 mt-3">
                            <Col>
                                <p style={{textAlign: "left", color: "black",fontSize: '16px'}}>{deputationOrder.subject.subject}</p>
                                <div style={{ fontSize: '24px', marginTop: '1px', textAlign: 'center', color: "black" }}>
                                    {'*'.repeat(5)}
                                </div>
                            </Col>
                        </Row>
                        <Row className="text-justify mb-3" style={{marginTop: "20px"}}>
                            <Col style={{ textAlign: 'justify', fontSize: '16px', color: "black",}}>
                                {deputationOrder.body.body}
                            </Col>
                        </Row>
                    </Row>
                </LetterForm>
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
        </Container>
    );
}

export default Index;
