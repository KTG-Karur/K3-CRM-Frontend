import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import LetterForm from '../../../components/Reports/Letterform';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import { timerAmPm } from '../../../utils/AllFunction';

function Index() {

    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({})

    const permissionOrder = {
        header: {
            letterName: `${stateVal?.isPermission ? "PERMISSION" : stateVal?.isLeave ? "LEAVE SLIP" : stateVal?.isDuty ? "ON DUTY" : ""}`,
        },
        body: {
            msgReceivedBy: 'Message received through telephone',
            name: `${stateVal?.staffName}`,
            desigination: `${stateVal?.designationName}`,
            msgReceivedAt: `${timerAmPm(stateVal?.spokenTime)}`,
            msgReceivedOn: `${moment(stateVal?.spokenDate).format('DD-MM-YYYY')}`,
            daysRequired: `${stateVal?.typeName}`,
            fromDate: `${moment(stateVal?.fromDate).format('DD-MM-YYYY')}`,
            toDate: stateVal?.toDate ? `${moment(stateVal?.toDate).format('DD-MM-YYYY')}` : false,
        },
        footer: {
            msgReceivedByDetails: {
                name: `${stateVal?.spokenStaffName
                    }`,
                desigination: `${stateVal?.spokenDesignationName} `,
                date: `${moment(stateVal?.spokenDate).format('DD-MM-YYYY')} `,
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
        lineHeight: 2,
        verticalAlign: 'bottom',
    });

    const renderBodyContent = () => {
        const { name, desigination, msgReceivedAt, msgReceivedOn, daysRequired, fromDate, toDate = false } =
            permissionOrder.body;
        return (
            <p style={{ fontSize: '16px', color: 'black' }}>
                <span style={underlineStyle(name)}>{name}</span> {' desigination '}
                <span style={underlineStyle(desigination)}>{desigination}</span> {' spoke over the phone/ other means at '}
                <span style={underlineStyle(msgReceivedAt)}>{msgReceivedAt}</span>{' and requested '}
                <span style={underlineStyle(msgReceivedOn)}>{msgReceivedOn}</span> {`${stateVal?.isPermission ? "permission" : stateVal?.isLeave ? "leave slip" : stateVal?.isDuty ? "on duty" : ""} `}{' for '}
                <span style={underlineStyle(daysRequired)}>{daysRequired}</span>{" "}
                {
                    toDate ?
                        <span>
                            <span>{" from "}</span>
                            <span style={underlineStyle(fromDate)}>{fromDate}</span>
                            <span>{" to "}</span>
                            <span style={underlineStyle(toDate)}>{toDate}</span>
                        </span>
                        :
                        <span>
                            {" on "}
                            <span style={underlineStyle(fromDate)}>{`${fromDate}`}</span>
                        </span>
                }
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


    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])


    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            {/* <Row className="mb-3"> */}
            <LetterForm Header={permissionOrder.header} permission={true} Footer={permissionOrder.footer}>
                <Row className="text-justify" style={{ marginBottom: "50px", marginTop: "50px" }}>
                    <p style={{ textAlign: "center", color: "black", fontSize: '16px', fontWeight: "bold", marginBottom: "40px" }}>({permissionOrder.body.msgReceivedBy})</p>
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
