import GoBackButton from "../common/GoBackButton";
import { Row, Col } from "reactstrap";
import { Languages } from "../common/Languages";

function GenericHeader() {
   return (
      <Row className="justify-content-between">
         <Col>
            <GoBackButton size="lg" color="success" />
         </Col>
         <Col className="text-right">
            <Languages />
         </Col>
      </Row>
   );
}

export default GenericHeader;
