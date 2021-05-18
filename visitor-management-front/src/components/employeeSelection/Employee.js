import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col } from 'reactstrap';

function EmployeeAvatar({ id }) {
    return (
        <div>
            <img src={`https://source.unsplash.com/random/${id}0x${id}0`} alt="Avatar" className="avatar" />
        </div>
    )
}

function EmployeeInfo({ firstName, lastName, department }) {
    return (
        <div>
            <div className="employee-name">{`${firstName} ${lastName}`}</div>
            <div className="employee-department text-muted">{department}</div>
        </div>
    )
}

function Employee({ employee }) {
    return (
        <Col sm="12" md="6" xl="4">
            <button className="employee-content  w-100" >
                <EmployeeAvatar id={employee.id} />
                <EmployeeInfo firstName={employee.firstName} lastName={employee.lastName} department={employee.department} />
                <div>
                    <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                </div>
            </button>
        </Col>
    )
}

export default Employee;