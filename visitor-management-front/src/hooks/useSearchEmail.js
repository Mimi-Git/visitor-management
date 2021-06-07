import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function useSearchEmail() {
   const { t } = useTranslation("firstVisit");
   const { t: common } = useTranslation("common");
   const err = common("errors", { returnObjects: true });

   const [emailTyped, setEmailTyped] = useState("");

   const [modal, setModal] = useState(false);
   const toggle = () => setModal(!modal);

   const schema = yup.object().shape({
      emailSearched: yup
         .string(`${t("emailTitle")} ${err.string}`)
         .required(`${t("emailTitle")} ${err.required}`)
         .email(`${t("emailTitle")} ${err.invalid}`),
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
      placeholder: t("emailPlaceholder"),
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
