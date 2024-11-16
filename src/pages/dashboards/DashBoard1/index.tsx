import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';
import { useDispatch, useSelector } from "react-redux";
// component
import Statistics from './Statistics';
import SalesChart from './SalesChart';
import StatisticsChart from './StatisticsChart';
import RevenueChart from './RevenueChart';
import Users from './Users';
import Inbox from './Inbox';
import Projects from './Projects';

// dummy data
import { messages, projectDetails } from './data';
import { useEffect } from 'react';
import { useViewport, useRedux } from '../../../hooks';
import { getDepartment } from '../../../api/DepartmentApi';
import { getDepartmentRequest } from '../../../redux/actions';

const DashBoard1 = () => {

    const { dispatch, appSelector } = useRedux();
    // const dispatch = useDispatch();

    // set pagetitle
    usePageTitle({
        title: 'DashBoard',
        breadCrumbItems: [
            {
                path: '/dashboard',
                label: 'DashBoard',
                active: true,
            },
        ],
    });

    useEffect(() => {
        // dispatch(getDepartment())
        dispatch(getDepartmentRequest());
        // getDepartment()
    }, []);

    return (
        <>
            <Statistics />

            <Row>
                <Col xl={4}>
                    <SalesChart />
                </Col>
                <Col xl={4}>
                    <StatisticsChart />
                </Col>
                <Col xl={4}>
                    <RevenueChart />
                </Col>
            </Row>

            <Users />

            <Row>
                <Col xl={4}>
                    <Inbox messages={messages} />
                </Col>
                <Col xl={8}>
                    <Projects projectDetails={projectDetails} />
                </Col>
            </Row>
        </>
    );
};

export default DashBoard1;
