import { Alert } from "reactstrap";

function AlertTemplate({ color, content }) {
   return <Alert color={color}>{content}</Alert>;
}
export default AlertTemplate;
