import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "reactstrap";
import { useTranslation } from "react-i18next";

function Employee({ employee, handleClick }) {
   const { t } = useTranslation("employeeSelection");
   return (
      <Col sm="12" md="6" xl="4">
         <button
            className="employee-content  w-100"
            onClick={() => handleClick(employee)}
         >
            <EmployeeAvatar id={employee.id} />
            <EmployeeInfo
               firstName={employee.firstName}
               lastName={employee.lastName}
               department={t(employee.department)}
            />
            <div>
               <FontAwesomeIcon icon={["fas", "chevron-right"]} />
            </div>
         </button>
         {}
      </Col>
   );
}

function EmployeeAvatar({ id }) {
   return (
      <div>
         <img
            src={`https://source.unsplash.com/random/${id}0x${id}0`}
            alt="Avatar"
            className="avatar"
         />
      </div>
   );
}

function EmployeeInfo({ firstName, lastName, department }) {
   return (
      <div>
         <div className="employee-name">{`${firstName} ${lastName}`}</div>
         <div className="employee-department text-muted">{department}</div>
      </div>
   );
}

export default Employee;
