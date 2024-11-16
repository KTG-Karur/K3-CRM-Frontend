import { Button, Card, Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

const CustomTabComponent = (props) => {

    const { title, activeKey, tabContents = [], tableColumn = 5, openingShowKey = false, state, onSubmit } = props;

    return (
        <Card>
            <Card.Body>
                <div className='d-flex justify-content-between mb-2'>
                    <h4 className="header-title">{title || ""}</h4>
                    <Button
                        variant="success"
                        className="waves-effect waves-light"
                        onClick={onSubmit}>
                        <i className={`mdi mdi-book-edit-outline `}></i>
                        {"Day Closing"}
                    </Button>
                </div>
                {openingShowKey && <div className='d-flex justify-content-between mb-2'>
                    <h5>
                        <span className='mx-2'>OPENING : Rs. {state?.opening || "0.00"} </span>
                    </h5>
                    <h5>
                        <span className='mx-2'>TODAY'S TOTAL : Rs. {state?.todayAmount || "0.00"}</span>
                    </h5>

                </div>
                }
                <Tab.Container defaultActiveKey={activeKey}>
                    <Nav as="ul" variant="pills" justify className="navtab-bg">
                        {(tabContents || []).map((tab, index) => {
                            return (
                                <Nav.Item as="li" key={index.toString()}>
                                    <Nav.Link as={Link} to="#" className="cursor-pointer" eventKey={tab.keyEvent}>
                                        {tab.title}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>

                    <Tab.Content>
                        {(tabContents || []).map((tab, index) => {
                            const stateName = tab.totalKey
                            return (
                                <Tab.Pane eventKey={tab.keyEvent} id={String(tab.keyId)} key={index.toString()}>
                                      {openingShowKey && <div className='d-flex justify-content-end'>
                                        <h5>
                                            <span className='mx-2'>TOTAL : Rs. {stateName ? state[stateName] : "0.00"}</span>
                                        </h5>
                                    </div>
                                    }
                                    <Table
                                        columns={tab.tableColumns}
                                        // Title={'Department List'}
                                        data={tab.tableData || []}
                                        pageSize={25}
                                        // toggle={onSubmit}
                                        // btnName={"Day Closing"}
                                        // addBtn={true}
                                        // tableIcon={"mdi-book-edit-outline"}
                                    />
                                </Tab.Pane>
                            );
                        })}
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};

export default CustomTabComponent;
