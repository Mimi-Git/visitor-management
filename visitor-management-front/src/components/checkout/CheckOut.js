import { Container, Form, Button } from "reactstrap";
import GenericHeader from "../common/GenericHeader";
import InputText from "../common/InputText";
import ModalCheckOut from "./ModalCheckOut";
import useSearchEmail from "../../hooks/useSearchEmail";
import { useTranslation } from "react-i18next";

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

   const { t } = useTranslation("checkOut");

   const onSubmit = (data) => {
      setEmailTyped(data.emailSearched);
      setModal(true);
   };

   return (
      <section id="checkout">
         <GenericHeader />
         <Container>
            <h2 className="text-center m-4">{t("title")}</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <InputText {...emailSearchedProps} />
               <Button size="lg" type="submit" color="success" block>
                  {t("finishVisit")}
               </Button>
            </Form>
         </Container>
         <ModalCheckOut toggle={toggle} modal={modal} emailTyped={emailTyped} />
      </section>
   );
}

export default CheckOut;
