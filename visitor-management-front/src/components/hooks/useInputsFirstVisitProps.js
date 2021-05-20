function useInputsFirstVisitProps(register, errors) {
   const firstNameProps = {
      fieldName: "firstname",
      icon: ["fas", "id-card-alt"],
      reg: register("firstname"),
      placeholder: "Prénom *",
      error: errors.firstname,
      size: "lg",
   };

   const lastNameProps = {
      fieldName: "lastname",
      icon: ["fas", "address-book"],
      reg: register("lastname"),
      placeholder: "Nom de famille *",
      error: errors.lastname,
      size: "lg",
   };

   const phoneNumberProps = {
      fieldName: "phonenumber",
      icon: ["fas", "phone-square-alt"],
      reg: register("phonenumber"),
      placeholder: "Numéro de téléphone",
      error: errors.phonenumber,
      size: "lg",
   };

   const emailProps = {
      fieldName: "email",
      icon: ["fas", "envelope"],
      reg: register("email"),
      placeholder: "Email *",
      error: errors.email,
      size: "lg",
   };

   const companyProps = {
      fieldName: "company",
      icon: ["fas", "building"],
      reg: register("company"),
      placeholder: "Nom de l'entreprise *",
      error: errors.company,
      size: "lg",
   };

   const visitorTypeProps = {
      fieldName: "visitortype",
      icon: ["fas", "building"],
      reg: register("visitortype"),
      placeholder: "Type de visiteur *",
      error: errors.visitortype,
      size: "lg",
      options: {
         visitor: "Visiteur",
         contractor: "Prestataire",
         courier: "Coursier",
         other: "Autre",
      },
   };

   return {
      firstNameProps,
      lastNameProps,
      phoneNumberProps,
      emailProps,
      companyProps,
      visitorTypeProps,
   };
}

export default useInputsFirstVisitProps;
