import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

function GoBackButton(props) {
   const history = useHistory();
   const { color, size } = props;

   return (
      <Button size={size} color={color} onClick={() => history.goBack()}>
         <FontAwesomeIcon icon={["fas", "chevron-left"]} />
      </Button>
   );
}

export default GoBackButton;
