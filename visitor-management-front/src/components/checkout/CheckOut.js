import { useState } from "react";
import { Container, Form, Button } from "reactstrap";
import GenericHeader from "../common/GenericHeader";
import InputText from "../common/InputText";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ModalCheckOut from "./ModalCheckOut";

function CheckOut() {
   const [emailTyped, setEmailTyped] = useState("");
   const [modal, setModal] = useState(false);
   const toggle = () => setModal(!modal);

   const schema = yup.object().shape({
      emailSearched: yup
         .string(`L'email doit être une chaine de charactères`)
         .required(`L'email est obligatoire`)
         .email(`L'email est invalide`),
   });
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const emailSearchedProps = {
      fieldName: "emailSearched",
      icon: ["fas", "search"],
      reg: register("emailSearched"),
      placeholder: "Email *",
      error: errors.emailSearched,
      size: "lg",
   };

   const onSubmit = (data) => {
      setEmailTyped(data.emailSearched);
      setModal(true);
   };

   return (
      <section id="checkout">
         <GenericHeader />
         <Container>
            <h2 className="text-center m-4">
               {"Veuillez renseigner votre addresse mail :"}
            </h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <InputText {...emailSearchedProps} />
               <Button size="lg" type="submit" color="success" block>
                  {"Terminer la visite"}
               </Button>
            </Form>
         </Container>
         <ModalCheckOut toggle={toggle} modal={modal} emailTyped={emailTyped} />
      </section>
   );
}

export default CheckOut;
