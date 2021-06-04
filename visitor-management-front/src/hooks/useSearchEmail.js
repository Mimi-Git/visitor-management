import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

function useSearchEmail() {
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

   return {
      setEmailTyped,
      emailTyped,
      modal,
      setModal,
      toggle,
      handleSubmit,
      emailSearchedProps,
   };
}
export default useSearchEmail;
