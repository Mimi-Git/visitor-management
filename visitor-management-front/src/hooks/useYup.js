import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useVisitor } from "../contexts/visitorContext";
import useGetVisitors from "./visitors/useGetVisitors";

function useYup() {
   const { visitor } = useVisitor();
   const { queryGetVisitors, getVisitorByEmail } = useGetVisitors();

   const phoneRegExp =
      /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

   const schema = yup.object().shape({
      firstName: yup
         .string(`Le prénom doit être un chaine de charactères`)
         .required(`Le prénom est obligatoire`)
         .min(2, `Le prénom doit contenir au moins 2 charactères`)
         .default(visitor.firstName),
      lastName: yup
         .string(`Le nom de famille doit être un chaine de charactères`)
         .required(`Le nom de famille est obligatoire`)
         .min(2, `Le nom de famille doit contenir au moins 2 charactères`)
         .default(visitor.lastName),
      phoneNumber: yup.lazy((value) =>
         !value
            ? yup.string().default(visitor.phoneNumber).nullable()
            : yup
                 .string()
                 .matches(phoneRegExp, "Le numéro est invalide")
                 .default(visitor.phoneNumber)
      ),
      email: yup
         .string(`L'email doit être une chaine de charactères`)
         .required(`L'email est obligatoire`)
         .email(`L'email est invalide`)
         .test(
            "email-exist",
            "Email déjà utilisé. Veuillez en saisir un autre ou revenir sur la page précédente et selectionner 'Déjà venu⸱e'",
            function (email) {
               if (queryGetVisitors.isSuccess) {
                  const visitorExist = getVisitorByEmail(email).length !== 0;
                  return !visitorExist;
               }
               return false;
            }
         )
         .default(visitor.email),
      companyName: yup
         .string(`L'entreprise doit être un chaine de charactères`)
         .required(`L'entreprise est obligatoire`)
         .min(2, `L'entreprise doit contenir au moins 2 charactères`)
         .default(visitor.companyName),
      visitorType: yup
         .string(`Choix invalide`)
         .required(`Le type de visiteur est obligatoire`)
         .matches(
            /visitor|contractor|courier|other/,
            "Le type de visiteur est obligatoire"
         )
         .default(visitor.visitorType),
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
