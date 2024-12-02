import { Col, Row } from 'react-bootstrap';
import DeniReactTreeView from 'deni-react-treeview';

function RoleTreeView(props) {
    const { data } = props;

    return (
        <Row>
            <Col md={12}>
                <h4 className="header-title mt-0 mb-3">Checkbox Tree</h4>
                <DeniReactTreeView items={data} showCheckbox showIcon />
            </Col>
        </Row>
    );
};

export default RoleTreeView;

