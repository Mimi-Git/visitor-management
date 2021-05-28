import { useVisitor } from "../contexts/visitorContext";

function useInputsFirstVisitProps(register, errors) {
   const { visitor } = useVisitor();

   const firstNameProps = {
      fieldName: "firstName",
      icon: ["fas", "id-card-alt"],
      reg: register("firstName"),
      placeholder: "Prénom *",
      error: errors.firstName,
      size: "lg",
      defaultvalue: visitor.firstName,
   };

   const lastNameProps = {
      fieldName: "lastName",
      icon: ["fas", "address-book"],
      reg: register("lastName"),
      placeholder: "Nom de famille *",
      error: errors.lastName,
      size: "lg",
      defaultvalue: visitor.lastName,
   };

   const phoneNumberProps = {
      fieldName: "phoneNumber",
      icon: ["fas", "phone-square-alt"],
      reg: register("phoneNumber"),
      placeholder: "Numéro de téléphone",
      error: errors.phoneNumber,
      size: "lg",
      defaultvalue: visitor.phoneNumber,
   };

   const emailProps = {
      fieldName: "email",
      icon: ["fas", "envelope"],
      reg: register("email"),
      placeholder: "Email *",
      error: errors.email,
      size: "lg",
      defaultvalue: visitor.email,
   };

   const companyNameProps = {
      fieldName: "companyName",
      icon: ["fas", "building"],
      reg: register("companyName"),
      placeholder: "Nom de l'entreprise *",
      error: errors.companyName,
      size: "lg",
      defaultvalue: visitor.companyName,
   };

   const visitorTypeProps = {
      fieldName: "visitorType",
      icon: ["fas", "building"],
      reg: register("visitorType"),
      placeholder: "Type de visiteur *",
      error: errors.visitorType,
      size: "lg",
      options: {
         visitor: "Visiteur",
         contractor: "Prestataire",
         courier: "Coursier",
         other: "Autre",
      },
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
