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

    const permissionOrder = {
        header: {
            letterName: 'PERMISSION / LEAVE SLIP / ON DUTY',
        },
        body: {
            msg_received_by: 'Message received through telephone',
            name: 'Hariadharshini',
            desigination: 'JA',
            msg_received_at: '11:45',
            msg_received_on: '23/09/24',
            days_required: '1',
            from_date: '24/09/2024',
            to_date: '24/09/2024',
        },
        footer: {
            msg_received_by_details: {
                name: 'Gnanasekaran',
                desigination: 'The Branch Manager',
                date: '24/09/2024',
                sign: '',
            },
            approved_by: 'Branch Manager',
        },
    };

    const underlineStyle = (text) => ({
        display: 'inline-block',
        textAlign: "center",
        borderBottom: '2px solid black',
        width: `${text.length * 12}px`,
        lineHeight: 1.5,
        verticalAlign: 'bottom',
    });

    const renderBodyContent = () => {
        const { name, desigination, msg_received_at, msg_received_on, days_required, from_date, to_date } =
            permissionOrder.body;
        return (
            <p style={{ fontSize: '16px', color: 'black' }}>
                Mr./Ms. <span style={underlineStyle(name)}>{name}</span> desigination{' '}
                <span style={underlineStyle(desigination)}>{desigination}</span> spoke over the phone/ other means at{' '}
                <span style={underlineStyle(msg_received_at)}>{msg_received_at}</span> a.m and requested{' '}
                <span style={underlineStyle(msg_received_on)}>{msg_received_on}</span> on-duty/permission/leave for{' '}
                <span style={underlineStyle(days_required)}>{days_required}</span> day(s) from{' '}
                <span style={underlineStyle(from_date)}>{from_date}</span> to{' '}
                <span style={underlineStyle(to_date)}>{to_date}</span>.
            </p>
        );
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
            <LetterForm Header={permissionOrder.header} permission={true} Footer={permissionOrder.footer}>
                <Row className="text-justify" style={{marginBottom: "50px", marginTop: "50px"}}>
                    <p style={{textAlign: "center", color: "black",fontSize: '16px', fontWeight: "bold", marginBottom: "40px"}}>({permissionOrder.body.msg_received_by})</p>
                    <Col style={{ textAlign: 'justify' }}>
                        {renderBodyContent()}
                    </Col>
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
