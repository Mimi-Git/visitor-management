import { useVisitor } from "../contexts/visitorContext";
import { useTranslation } from "react-i18next";

function useInputsFirstVisitProps(register, errors) {
   const { visitor } = useVisitor();
   const { t } = useTranslation("firstVisit");

   const firstNameProps = {
      fieldName: "firstName",
      icon: ["fas", "id-card-alt"],
      reg: register("firstName"),
      placeholder: t("firstNamePlaceholder"),
      error: errors.firstName,
      size: "lg",
      defaultvalue: visitor.firstName,
   };

   const lastNameProps = {
      fieldName: "lastName",
      icon: ["fas", "address-book"],
      reg: register("lastName"),
      placeholder: t("lastNamePlaceholder"),
      error: errors.lastName,
      size: "lg",
      defaultvalue: visitor.lastName,
   };

   const phoneNumberProps = {
      fieldName: "phoneNumber",
      icon: ["fas", "phone-square-alt"],
      reg: register("phoneNumber"),
      placeholder: t("phoneNumberPlaceholder"),
      error: errors.phoneNumber,
      size: "lg",
      defaultvalue: visitor.phoneNumber,
   };

   const emailProps = {
      fieldName: "email",
      icon: ["fas", "envelope"],
      reg: register("email"),
      placeholder: t("emailPlaceholder"),
      error: errors.email,
      size: "lg",
      defaultvalue: visitor.email,
   };

   const companyNameProps = {
      fieldName: "companyName",
      icon: ["fas", "building"],
      reg: register("companyName"),
      placeholder: t("companyNamePlaceholder"),
      error: errors.companyName,
      size: "lg",
      defaultvalue: visitor.companyName,
   };

   const visitorTypeLanguage = t("visitorType", { returnObjects: true });

   const visitorTypeProps = {
      fieldName: "visitorType",
      icon: ["fas", "building"],
      reg: register("visitorType"),
      placeholder: visitorTypeLanguage.placeholder,
      error: errors.visitorType,
      size: "lg",
      options: visitorTypeLanguage.options,
      defaultvalue: visitor.visitorType,
   };

   return {
      firstNameProps,
      lastNameProps,
      phoneNumberProps,
      emailProps,
      companyNameProps,
      visitorTypeProps,
   };
}

export default useInputsFirstVisitProps;
