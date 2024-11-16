import React, { useState } from 'react';
import { Button, Card, Col, Dropdown, Row } from 'react-bootstrap';
import StatisticsWidget1 from '../../components/StatisticsWidget1';
import StatisticsWidget2 from '../../components/StatisticsWidget2';
import Chart from 'react-apexcharts';
import CompanyDetails from '../../components/Atom/CompanyDetails';
import FormLayout from '../../utils/formLayout';
import { formContainer } from './formData';


const Index = () => {

    const [state, setState] = useState({});

    const columnsMonthly = [
        {
            title: "Active Loans",
            subTitle: "Monthly",
            keyValue: "activeLoans",
            color: "#02db1f",
            target: "64",
            statusValue: "72"
        },
        {
            title: "Closed Loans",
            subTitle: "Monthly",
            keyValue: "closedLoans",
            color: "#217dff",
            target: "24",
            statusValue: "15"
        },
        {
            title: "Requested",
            subTitle: "Monthly",
            keyValue: "requestedLoans",
            color: "#ffb921",
            target: "29",
            statusValue: "29"
        },
        {
            title: "Cancelled",
            subTitle: "Monthly",
            keyValue: "requestedLoans",
            color: "#ff2130",
            target: "45",
            statusValue: "29"
        },
    ]

    const apexOpts = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: '25%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false,
        },
        xaxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', "DEC"],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#adb5bd',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#adb5bd',
                },
            },
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        fill: {
            opacity: 1,
        },
        colors: ['#188ae2'],
        tooltip: {
            theme: 'dark',
        },
    };

    const apexData = [
        {
            name: 'Current Year',
            data: [75, 42, 75, 38, 19, 93, 77, 63, 82, 11, 20, 70],
        },
    ];

    const onSearchDate = () => {

    }

    return (
        <React.Fragment>
            <CompanyDetails fontSize="12px" imgSize="240px" classStyle="d-flex justify-content-center flex-column align-items-center" />
            <div className='d-flex justify-content-center'>
                <div className='mt-3' style={{ position: "relative", width: "35%" }}>
                    <FormLayout
                        dynamicForm={formContainer}
                        setState={setState}
                        state={state}
                        noOfColumns={1}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <Button
                    variant="primary"
                    className="waves-effect waves-light"
                    onClick={onSearchDate}>
                    <i className={`mdi mdi-clipboard-text-search mx-1 `}></i>
                    {"Search"}
                </Button>
            </div>
            <Row className='mt-2'>
                {columnsMonthly.map((itm, idx) => {
                    return (
                        <>
                            <Col xl={3} md={6}>
                                <StatisticsWidget1
                                    title={itm?.title || ""}
                                    data={itm?.target || ""}
                                    stats={itm?.statusValue || ""}
                                    color={itm?.color || ""}
                                    subTitle={itm?.subTitle || ""}
                                />
                            </Col>
                        </>
                    )
                })}
                {/* <Col xl={3} md={6}>
                <StatisticsWidget2
                    variant="pink"
                    title="Daily Sales"
                    trendValue="32%"
                    trendIcon="mdi mdi-trending-up"
                    stats={158}
                    subTitle="Revenue today"
                    progress={77}
                />
            </Col> */}
            </Row>
            <Row>
                <Col xs={12} lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mt-0">Year</h4>

                            <div dir="ltr">
                                <Chart options={apexOpts} series={apexData} type="bar" height={268} className="apex-charts mt-2" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default Index;
