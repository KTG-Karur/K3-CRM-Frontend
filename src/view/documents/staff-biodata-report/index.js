import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import noProfile from '../../../assets/images/noprofile_images.jpg';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { findArrObj } from '../../../utils/AllFunction';
// import CompanyDetails from '../../components/Atom/CompanyDetails';
import _ from "lodash";

function Index() {
    const baseUrl = process.env?.baseURL || "http://localhost:5059";

    const today = new Date().toLocaleDateString();

    const { state } = useLocation();

    const [stateVal, setStateVal] = useState({
        idProof: [],
        jobRoleDetails: {},
        language: [],
        personalInfo: {},
        staffDetails: [],
        staffQualification: [],
        workExperience: [],
        achievements: [],
    })

    useEffect(() => {
        if (state != undefined && state != null) {
            setStateVal(state || {});
        }
    }, [state])

    console.log("stateVal")
    console.log(stateVal)
    console.log("state")
    console.log(state)

    // console.log(findArrObj(stateVal?.idProof || [], "proofTypeId", 1))

    const staffBiodata = {
        profileImg: `${baseUrl}${stateVal?.personalInfo?.staffProfileImageName || noProfile}`,
        postAppliedFor: `${stateVal?.jobRoleDetails?.designationName || ''}`,
        staffDetails: {
            firstName: `${stateVal?.personalInfo?.firstName || ''}`,
            lastName: `${stateVal?.personalInfo?.lastName || ''}`,
            dob: `${moment(stateVal?.dob).format("DD-MM-YYYY")}`,
            age: `${stateVal?.personalInfo?.age || ''}`,
            address: `${stateVal?.personalInfo?.address || ''}`,
            aadharNumber: _.chain(stateVal?.idProof)
                .filter((item) => item.proofTypeId === 1)
                .map('proofNumber')
                .value(),
            panNumber: _.chain(stateVal?.idProof)
                .filter((item) => item.proofTypeId === 2)
                .map('proofNumber')
                .value(),
            category: `${stateVal?.personalInfo?.casteName || ''}`,
            mobileNumber: `${stateVal?.personalInfo?.contactNo || ''}`,
            alternativeContact: `${stateVal?.personalInfo?.alternativeContactNo || ''}`,
            mailId: `${stateVal?.personalInfo?.emailId || ''}`,
            famlyDetails: (stateVal?.staffDetails || []).map(item => ({
                relation: item?.relationTypeName || '-',
                name: item?.relationName || '-',
                contactNo: item?.contactNo || '-',
                education: item?.qualificationName || '-',
                occupation: item?.occupation || '-',
            })),
            academicDetails: (stateVal?.staffQualification || []).map(item => ({
                qualificationName: item?.qualificationName || '-',
                passingYear: item?.passingYear || '-',
                universityName: item?.universityName || '-',
                percentage: item?.percentage || '-',
                stream: item?.stream || '-',
            })),
            languageProficiency: (stateVal?.language || []).map(item => ({
                languageName: item?.languageName || '-',
                read: JSON.parse(item?.read),
                write: JSON.parse(item?.write),
                speak: JSON.parse(item?.speak),
            })),
            achievements: stateVal?.achievements,
            employmentExperience: (stateVal?.workExperience || []).map(item => ({
                qualificationName: item?.organizationName || '-',
                position: item?.position || '-',
                yearsOfExperience: item?.yearsOfExperience || '-',
                // fromDate: moment(item?.fromDate).format('DD/MM/YYYY'),
                // toDate: moment(item?.toDate).format('DD/MM/YYYY'),
                grossPay: item?.grossPay || '-',
                workLocation: item?.workLocation || '-',
                reasonForLeaving: item?.reasonForLeaving || '-',
            })),
            expectedSalary: `${stateVal?.personalInfo?.expectedSalary || ''}`,
            timeNeededToJoin: `${stateVal?.personalInfo?.timeToJoinName || ''}`,
            preferredlocation: `${stateVal?.personalInfo?.preferenceLocationList || ''}`,
            whetherRepatriate: `${stateVal?.personalInfo?.repatriate ? "Yes": "No" || ''}`,
            reference: {
                refDetails: [
                    {
                        name: 'V.Jayavarshini',
                        desigination: 'App developer',
                        mobileNumber: '9078564312',
                        email: 'jvarshini@gmail.com',
                    },
                    {
                        name: 'V.Jayavarshini',
                        desigination: 'App developer',
                        mobileNumber: '9078564312',
                        email: 'jvarshini@gmail.com',
                    },
                ],
            },
            repcoInstitutionBelongs: {
                status: true,
                details: {
                    name: 'V.Jayavarshini',
                    desigination: 'App developer',
                    mobileNumber: '9078564312',
                    email: 'jvarshini@gmail.com',
                },
            },
            otherInformation: 'haii hello good bye',
        },
    };

    const footerFields = [['Name', 'Signature', 'Date']];

    const underlineStyle = (text) => ({
        display: 'inline-block',
        textAlign: 'center',
        borderBottom: '2px solid black',
        width: `${text.length * 12}px`,
        lineHeight: 1.5,
        verticalAlign: 'bottom',
    });

    const groupedAchievements = () => {
        const grouped = (stateVal?.achievements || []).reduce((acc, curr) => {
            const { achievementAtName, achievementTitleName, achievementDetails } = curr;
            if (!acc[achievementAtName]) {
                acc[achievementAtName] = {};
            }
            acc[achievementAtName][achievementTitleName] = achievementDetails;
            return acc;
        }, {});
        const uniqueTitles = [
            ...new Set((stateVal?.achievements || []).map((item) => item.achievementTitleName)),
        ];

        return { grouped, uniqueTitles };
    };

    const activementData = groupedAchievements();
    const achievementAtNames = Object.keys(activementData?.grouped || {});

    return (
        <Container className="letter-container my-4 p-4 bg-white" style={{ maxWidth: '800px' }}>
            <div className="page-container" style={{ marginBottom: '10px' }}>
                <Row className="mt-3 mb-1">
                    <Row className="text-center">
                        <h3 style={{ color: 'black' }}>BIO DATA FORM</h3>
                        <p style={{ color: 'black', marginTop: '5px' }}>
                            (To be filled in by the candidate in his / her own handwritting)
                        </p>
                    </Row>
                </Row>
                <Row className="mt-3 mb-1" style={{ flex: 1, justifyContent: 'space-between' }}>
                    <Col style={{ flex: 0.7 }}>
                        <Row style={{ flex: 1 }}>
                            <h4 style={{ color: 'black' }}>
                                POST APPLIED FOR:{' '}
                                <span style={underlineStyle(staffBiodata?.postAppliedFor || '')}>
                                    {staffBiodata?.postAppliedFor || ''}
                                </span>{' '}
                            </h4>
                        </Row>
                        <Row style={{ flex: 1, marginTop: '40px' }}>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>1. NAME: </span>
                                <span style={underlineStyle(staffBiodata.staffDetails?.firstName || '')}>
                                    {staffBiodata.staffDetails?.firstName || ''}
                                </span>{' '}
                                <span style={underlineStyle(staffBiodata.staffDetails?.lastName || '')}>
                                    {staffBiodata.staffDetails?.lastName || ''}
                                </span>{' '}
                            </p>
                        </Row>
                        <Row style={{ flex: 1 }}>
                            <p style={{ color: 'black' }}>
                                <span style={{ fontWeight: 'bold' }}>2. DATE OF BIRTH: </span>
                                <span style={underlineStyle(staffBiodata.staffDetails?.dob || '')}>
                                    {staffBiodata.staffDetails?.dob || ''}
                                </span>{' '}
                                <span style={{ fontWeight: 'bold' }}> AGE: </span>
                                <span style={underlineStyle(staffBiodata.staffDetails?.dob || '')}>
                                    {staffBiodata.staffDetails?.age || ''}
                                </span>{' '}
                            </p>
                        </Row>
                    </Col>
                    <Col style={{ flex: 0.3 }}>
                        <img
                            src={staffBiodata.profileImg}
                            alt="profile image"
                            crossOrigin='anonymous'
                            style={{ width: '100%', height: '160px', objectFit: 'contain' }}
                        />
                    </Col>
                </Row>
                {/* address */}
                <Row className="mt-3 mb-1">
                    <Row className="" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                3. ADDRESS FOR COMMUNICATION{' '}
                            </p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.45, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.address || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mx-2" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.41 }}>
                            <p style={{ color: '#000', fontWeight: 'semi-bold', fontSize: '16px' }}>a. Aadhar Number</p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.49, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.aadharNumber || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mx-2" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.41 }}>
                            <p style={{ color: '#000', fontWeight: 'semi-bold', fontSize: '16px' }}>b. PAN Number</p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.49, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.panNumber || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mx-2" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.41 }}>
                            <p style={{ color: '#000', fontWeight: 'semi-bold', fontSize: '16px' }}>
                                c. Category(BC/MBC/OC/SC/ST)
                            </p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.49, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.category || ''}
                            </p>
                        </Col>
                    </Row>
                </Row>
                {/* mobile number */}
                <Row className="mt-3 mb-1">
                    <Row className="" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.45 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                4. ALTERNATIVE CONTACT No. (With SRG CDE){' '}
                            </p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.45, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.alternativeContact || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mx-2" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.41 }}>
                            <p style={{ color: '#000', fontWeight: 'semi-bold', fontSize: '16px' }}>a. Mobile Number</p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.49, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.mobileNumber || ''}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mx-2" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                        <Col style={{ flex: 0.41 }}>
                            <p style={{ color: '#000', fontWeight: 'semi-bold', fontSize: '16px' }}>b. E-mail ID</p>
                        </Col>
                        <Col style={{ flex: 0.1 }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>:</p>
                        </Col>
                        <Col style={{ flex: 0.49, textAlign: 'left' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', textAlign: 'left' }}>
                                {staffBiodata.staffDetails?.mailId || ''}
                            </p>
                        </Col>
                    </Row>
                </Row>
                {/* family details */}
                <Row className="mt-3 mb-1">
                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>5. FAMILY DETAILS</p>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Name</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Contact No</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Education</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Occupation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffBiodata?.staffDetails?.famlyDetails.map((member, index) => (
                                <tr key={index}>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{member.relation}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{member.name}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{member.contactNo}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{member.education}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{member.occupation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>

                {/* ********************************************************** Page -2 ***********************************************************/}
                {staffBiodata.staffDetails.academicDetails && <div className="page-break"></div>}

                {/* Academic details */}
                <Row className="mt-5 mb-1">
                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>6. ACADEMIC DETAILS</p>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th style={{ color: 'black', textAlign: 'center' }}>S.No</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Examination Passed</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Year of Passing</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Board/ University/ Institution</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Marks (%)</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Streams (Maths, Commerce, etc.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffBiodata.staffDetails.academicDetails.map((academic, index) => (
                                <tr key={index}>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>
                                        {academic.qualificationName}
                                    </td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{academic.passingYear}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{academic.universityName}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{academic.percentage}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{academic.stream}</td>{' '}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
                {/* Language Proficiency */}
                <Row className="mt-3 mb-1">
                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>7. LANGUAGE PROFICIENCY</p>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th style={{ color: 'black', textAlign: 'center' }}>S.No</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>Language</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>READ</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>WRITE</th>
                                <th style={{ color: 'black', textAlign: 'center' }}>SPEAK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffBiodata.staffDetails.languageProficiency.map((language, index) => (
                                <tr key={index}>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{language.languageName}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>{language.read ? '✔️' : ''}</td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>
                                        {language.write ? '✔️' : ''}
                                    </td>
                                    <td style={{ color: 'black', textAlign: 'center' }}>
                                        {language.speak ? '✔️' : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>

                {/* Other Achievements */}
                <Row className="mt-3 mb-1">
                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                        8. OTHER ACHIEVEMENTS
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ color: 'black', textAlign: 'center' }}>S.no</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Achievement at</th>
                                    {(activementData?.uniqueTitles || []).map((title, index) => (
                                        <th key={index} style={{ color: 'black', textAlign: 'center' }}>
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {achievementAtNames.map((atName, index) => (
                                    <tr key={index}>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{atName}</td>
                                        {(activementData?.uniqueTitles || []).map((title, i) => (
                                            <td key={i} style={{ color: 'black', textAlign: 'center' }}>
                                                {activementData?.grouped[atName][title] || ""}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>


                {/* Employment Experience */}
                <Row className="mt-3 mb-1">
                    <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>8. EMPLOYMENT EXPERIENCE</p>
                    <div style={{ overflowX: 'auto' }}>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ color: 'black', textAlign: 'center' }}>S.no</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Organization</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Position</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Experience</th>
                                    {/* <th style={{ color: 'black', textAlign: 'center' }}>From
                                        <br />Date</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>To <br />Date</th> */}
                                    <th style={{ color: 'black', textAlign: 'center' }}>CTC</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Place</th>
                                    <th style={{ color: 'black', textAlign: 'center' }}>Reason for Leaving</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffBiodata.staffDetails.employmentExperience.map((experience, index) => (
                                    <tr key={index}>
                                        <td style={{ color: 'black', textAlign: 'center' }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>
                                            {experience.qualificationName}
                                        </td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{experience.position}</td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{experience.yearsOfExperience}</td>
                                        {/* <td style={{ color: 'black', textAlign: 'center' }}>{experience.fromDate}</td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{experience.toDate}</td> */}
                                        <td style={{ color: 'black', textAlign: 'center' }}>
                                            {experience.grossPay}
                                        </td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>{experience.workLocation}</td>
                                        <td style={{ color: 'black', textAlign: 'center' }}>
                                            {experience.reasonForLeaving}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Row>

                {/* ********************************************************** Page -3 ********************************************************** */}
                {staffBiodata.staffDetails.expectedSalary && <div className="page-break"></div>}
                {/* expected salary */}
                <Row className="mt-5 mb-1">
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>9. Expected Salary : </p>
                            <span style={{ color: '#000', fontSize: '16px', marginLeft: '20px' }}>
                                {staffBiodata.staffDetails?.expectedSalary || ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* notice period */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                10. Time needed to join (Days), If selected :{' '}
                            </p>
                            <span style={{ color: '#000', fontSize: '16px', marginLeft: '20px' }}>
                                {staffBiodata.staffDetails?.timeNeededToJoin || ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* work location */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                11. Preferred work location :{' '}
                            </p>
                            <span style={{ color: '#000', fontSize: '16px', marginLeft: '20px' }}>
                                {staffBiodata.staffDetails?.preferredlocation || ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* repatriate */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                12. Whether Repatriate :{' '}
                            </p>
                            <span style={{ color: '#000', fontSize: '16px', marginLeft: '20px' }}>
                                {staffBiodata.staffDetails?.whetherRepatriate || ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* reference person details */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
                            13. References with Designation/ Mobile No/ Phone No/ Official Email ID:
                        </p>
                        <Row className="mx-5">
                            {Array.from({ length: 2 }, (_, colIndex) => (
                                <Col md={6} key={colIndex}>
                                    {staffBiodata.staffDetails?.reference?.refDetails
                                        .filter((_, index) => index % 2 === colIndex)
                                        .map((ref, innerIndex) => (
                                            <div key={innerIndex} style={{ marginBottom: '10px' }}>
                                                <p style={{ color: '#000', fontSize: '16px', margin: 0 }}>
                                                    {colIndex + 1 + innerIndex * 2}.{''} {''}
                                                    {ref.name}
                                                </p>
                                                <p
                                                    style={{
                                                        paddingLeft: '15px',
                                                        color: '#000',
                                                        fontSize: '16px',
                                                        margin: 0,
                                                    }}>
                                                    {ref.desigination}
                                                </p>
                                                <p
                                                    style={{
                                                        paddingLeft: '15px',
                                                        color: '#000',
                                                        fontSize: '16px',
                                                        margin: 0,
                                                    }}>
                                                    {ref.mobileNumber}
                                                </p>
                                                <p
                                                    style={{
                                                        paddingLeft: '15px',
                                                        color: '#000',
                                                        fontSize: '16px',
                                                        margin: 0,
                                                    }}>
                                                    {ref.email}
                                                </p>
                                            </div>
                                        ))}
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                {/* Reference person belongs to */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
                            14. Whether you are known/related to anybody working in any Repco Institution (if yes, give
                            details):
                        </p>
                        {staffBiodata.staffDetails?.repcoInstitutionBelongs?.status ? (
                            <div className="mx-4">
                                <p style={{ color: '#000', fontSize: '16px', marginBottom: '5px' }}>Yes</p>
                                <p style={{ color: '#000', fontSize: '16px', marginBottom: '5px' }}>
                                    1. {staffBiodata.staffDetails.repcoInstitutionBelongs.details.name}
                                </p>
                                <p
                                    style={{
                                        color: '#000',
                                        fontSize: '16px',
                                        marginBottom: '5px',
                                        paddingLeft: '10px',
                                    }}>
                                    {staffBiodata.staffDetails.repcoInstitutionBelongs.details.desigination}
                                </p>
                                <p
                                    style={{
                                        color: '#000',
                                        fontSize: '16px',
                                        marginBottom: '5px',
                                        paddingLeft: '10px',
                                    }}>
                                    {staffBiodata.staffDetails.repcoInstitutionBelongs.details.mobileNumber}
                                </p>
                                <p
                                    style={{
                                        color: '#000',
                                        fontSize: '16px',
                                        marginBottom: '5px',
                                        paddingLeft: '10px',
                                    }}>
                                    {staffBiodata.staffDetails.repcoInstitutionBelongs.details.email}
                                </p>
                            </div>
                        ) : (
                            <p style={{ color: '#000', fontSize: '16px', marginBottom: '5px' }}>No</p>
                        )}
                    </Col>
                </Row>
                {/* information */}
                <Row className="mt-3 mb-1">
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>
                                15. Any other Information :{' '}
                            </p>
                            <span style={{ color: '#000', fontSize: '16px', marginLeft: '20px' }}>
                                {staffBiodata.staffDetails?.otherInformation || ''}
                            </span>
                        </div>
                    </Col>
                </Row>
                {/* declaration */}
                <Row className="mt-3 mb-1">
                    <Col className="mx-4">
                        <p style={{ color: '#000', fontSize: '16px', marginBottom: '0' }}>
                            <span style={{ fontWeight: 'bold' }}>Declaration:</span>
                            <span style={{ marginLeft: '10px' }}>
                                I hereby declare that the above information is correct to the best of my knowledge &
                                belief. In case any of the above information is found incorrect at a later date, I'll
                                abide by the company decision/disciplinary action taken in that regard.
                            </span>
                        </p>
                    </Col>
                </Row>
                {/* footer */}
                <div style={{ marginTop: '80px', padding: '10px' }}>
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
                                        marginTop: '20px',
                                    }}>
                                    {col && <strong>{col}</strong>}
                                </Col>
                            ))}
                        </Row>
                    ))}
                </div>
            </div>
            {/* print design */}
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
