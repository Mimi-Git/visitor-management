import { Container, Form, Button } from "reactstrap";
import useSearchEmail from "../../hooks/useSearchEmail";
import GenericHeader from "../common/GenericHeader";
import InputText from "../common/InputText";
import ModalReturn from "./ModalReturn";

function CheckOut() {
   const {
      setEmailTyped,
      emailTyped,
      modal,
      setModal,
      toggle,
      handleSubmit,
      emailSearchedProps,
   } = useSearchEmail();

   const onSubmit = (data) => {
      setEmailTyped(data.emailSearched);
      setModal(true);
   };

   return (
      <section id="checkout">
         <GenericHeader />
         <Container>
            <h2 className="text-center m-4">{"Retour dans l'entreprise."}</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <InputText {...emailSearchedProps} />
               <Button size="lg" type="submit" color="success" block>
                  {"Suivant"}
               </Button>
            </Form>
         </Container>
         <ModalReturn toggle={toggle} modal={modal} emailTyped={emailTyped} />
      </section>
   );
}

export default CheckOut;
