import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import LetterForm from '../../../components/Reports/Letterform';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';

const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function Index() {
    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({})

    const transferOrder = {
        header: {
            logo: 'logo.png',
            letterName: 'Transfer Order',
            address: `Head Office, ${stateVal?.transferFromName}`,
        },
        address: {
            address: `Rc.No.${stateVal?.transferCode}, \n ${stateVal?.staffName},\n ${(stateVal?.address || "").split(",")?.join(", \n")}`,
        },
        subject: {
            subject: 'Sub: Transfer Order - issue - reg.',
        },
        body: {
            body: `As per the instruction from the appropriate authority, it has been decided to ${stateVal?.staffName}, ${stateVal?.departmentName}, is hereby transferred and posted to ${stateVal?.transferToName} branch with effect from (${dayArr[moment(stateVal?.joiningDate).day()]}) ${moment(stateVal?.joiningDate).format("DD-MM-YYYY")} 
        The Branch Manager, ${stateVal?.transferFromName} has to ensure and relieve from his duties on (${dayArr[moment(stateVal?.relievingDate).day()]}) ${moment(stateVal?.relievingDate).format("DD-MM-YYYY")}, he is advised to report to the Manager, ${stateVal?.transferToName} Branch without fail.`,
        },
        regards: {
            regards: 'Yours sincerity,',
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
                    desigination: "The Branch Manager",
                    branch: `${stateVal?.transferFromName}`,
                    company: "K3 Women Foundation"
                },
                {
                    desigination: "The Branch Manager",
                    branch: `${stateVal?.transferToName}`,
                    company: "K3 Women Foundation"
                },
            ]
        },
        date: `${moment(stateVal?.createdAt).format("DD-MM-YYYY")}`
    };

    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])

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
                Header={transferOrder.header}
                Address={transferOrder.address}
                Date={transferOrder.date}
                Regards={transferOrder.regards}
                Conclusion={transferOrder.conclusion}
                Footer={transferOrder.footer}
            >
                <Row style={{ marginBottom: "40px", marginTop: "50px" }}>
                    <Row className="text-center mb-3 mt-2">
                        <Col>
                            <p style={{ textAlign: "left", color: "black", fontSize: '16px' }}>{transferOrder.subject.subject}</p>
                            <div style={{ fontSize: '24px', textAlign: 'center', color: "black" }}>
                                {'*'.repeat(5)}
                            </div>
                        </Col>
                    </Row>
                    <Row className="text-justify mb-3">
                        <Col style={{ textAlign: 'justify', fontSize: '16px', color: "black", }}>
                            {transferOrder.body.body}
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
