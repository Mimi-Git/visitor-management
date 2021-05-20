import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function useYup(visitor) {
   const phoneRegExp =
      /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

   const schema = yup.object().shape({
      firstname: yup
         .string(`Le prénom doit être un chaine de charactères`)
         .required(`Le prénom est obligatoire`)
         .min(2, `Le prénom doit contenir au moins 2 charactères`)
         .default(visitor.firstname),
      lastname: yup
         .string(`Le nom de famille doit être un chaine de charactères`)
         .required(`Le nom de famille est obligatoire`)
         .min(2, `Le nom de famille doit contenir au moins 2 charactères`)
         .default(visitor.lastname),
      phonenumber: yup.lazy((value) =>
         !value
            ? yup.string().default(visitor.phonenumber)
            : yup
                 .string()
                 .matches(phoneRegExp, "Le numéro est invalide")
                 .default(visitor.phonenumber)
      ),
      email: yup
         .string(`L'email doit est une chaine de charactères`)
         .required(`L'email est obligatoire`)
         .email(`L'email est invalide`)
         .default(visitor.email),
      company: yup
         .string(`L'entreprise doit être un chaine de charactères`)
         .required(`L'entreprise est obligatoire`)
         .min(2, `L'entreprise doit contenir au moins 2 charactères`)
         .default(visitor.company),
      visitortype: yup
         .string(`Choix invalide`)
         .required(`Le type de visiteur est obligatoire`)
         .matches(
            /visitor|contractor|courier|other/,
            "Le type de visiteur est obligatoire"
         )
         .default(visitor.visitortype),
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });

   return {
      register,
      handleSubmit,
      errors,
      reset,
   };
}

export default useYup;
