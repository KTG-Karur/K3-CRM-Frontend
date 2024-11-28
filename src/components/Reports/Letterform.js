import React, { Children } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import K3Logo from '../../assets/images/K3_Logo.png';

function LetterForm(props) {
    const { children, Header, Address = false, Date = false, Regards = false, Conclusion = false, Footer, permission } = props;

    return (
        <>
            <Row className="mb-4 text-center">
                <Col>
                    {permission ? (
                        ""
                    ) : (
                        <Image src={K3Logo} rounded fluid style={{ maxHeight: '40px' }} alt="Company Logo" />
                    )}
                    <h3 className="mt-2">{Header?.letterName || ""}</h3>
                    <p style={{ color: "black", fontSize: '16px', }}>{Header?.address || ""}</p>
                </Col>
            </Row>
            {Address && Date && (
                <Row className="justify-between">
                    <Col style={{ whiteSpace: 'pre-line', fontSize: '16px', color: "black" }}>{Address?.address || ""}</Col>
                    <Col className="text-end mb-2 text-black" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Date: {Date}
                    </Col>
                </Row>
            )}

            {children}

            <Row className="justify-between mt-2">
                {Conclusion && (
                    <Col className="ps-2 text-black" style={{ fontSize: '16px', alignSelf: "end" }}>
                        <div>{Conclusion?.mdName || ""}</div>
                        <div>{Conclusion?.companyName || ""}</div>
                    </Col>
                )}
                {Regards && (
                    <Col className="text-end text-black" style={{ fontSize: '16px' }}>
                        <div>{Regards?.regards || ""}</div>
                        <div>{Regards?.sign || ""}</div>
                        <div>{Regards?.to || ""}</div>
                        <div>{Regards?.companyName || ""}</div>
                    </Col>
                )}
            </Row>
            {permission ? (
                <Row className="justify-between mt-2">
                    <Col className="ps-2 text-black" style={{ fontSize: '16px', alignSelf: "end" }}>
                        <div className='mb-1'><strong>Telephone message received By:</strong></div>
                        <Row>
                            <Col xs={3}><strong>Name</strong></Col>
                            <Col xs={1}><strong>:</strong></Col>
                            <Col xs={8}>{Footer.msgReceivedByDetails.name}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}><strong>Designation</strong></Col>
                            <Col xs={1}><strong>:</strong></Col>
                            <Col xs={8}>{Footer.msgReceivedByDetails.desigination}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}><strong>Date</strong></Col>
                            <Col xs={1}><strong>:</strong></Col>
                            <Col xs={8}>{Footer.msgReceivedByDetails.date}</Col>
                        </Row>
                        <Row>
                            <Col xs={3}><strong>Sign</strong></Col>
                            <Col xs={1}><strong>:</strong></Col>
                        </Row>
                    </Col>
                    <Col className="text-end text-black" style={{ fontSize: '16px', alignSelf: "end" }}>
                        <div><strong>Approved By:</strong></div>
                        <div>{Footer.approved_by}</div>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-start mt-3">
                    <Col className="ps-2 text-black" style={{ fontSize: '16px', lineHeight: '20px' }}>
                        <div className="mb-2">
                            <strong>Copy to:</strong>
                        </div>
                        {Footer.copyTo.map((line, index) => (
                            <div key={index} style={{ lineHeight: '10px', marginBottom: "40px", marginTop: "20px" }}>
                                <p style={{ color: "black", fontSize: "16px" }}>{line.desigination}</p>
                                <p style={{ color: "black", fontSize: "16px" }}>{line.branch}</p>
                                <p style={{ color: "black", fontSize: "16px" }}>{line.company}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            )}

        </>
    );
}

export default LetterForm;
