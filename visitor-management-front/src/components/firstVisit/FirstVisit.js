import React from 'react';
import { Col, Row, Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback, Container, FormGroup } from 'reactstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputText } from '../common/InputText';


export const FirstVisit = (props) => {

    const phoneRegExp = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

    const schema = yup.object().shape({
        firstname: yup.string(`Le prénom doit être un chaine de charactères`)
            .required(`Le prénom est obligatoire`)
            .min(2, `Le prénom doit contenir au moins 2 charactères`),
        lastname: yup.string(`Le nom de famille doit être un chaine de charactères`)
            .required(`Le nom de famille est obligatoire`)
            .min(2, `Le nom de famille doit contenir au moins 2 charactères`),
        phonenumber: yup.lazy(value => !value ? yup.string() : yup.string().matches(phoneRegExp, 'Le numéro est invalide')),
        email: yup.string(`L'email doit est une chaine de charactères`)
            .required(`L'email est obligatoire`)
            .email(`L'email est invalide`),
        company: yup.string(`L'entreprise doit être un chaine de charactères`)
            .required(`L'entreprise est obligatoire`)
            .min(2, `L'entreprise doit contenir au moins 2 charactères`),
        visitortype: yup.string(`Choix invalide`)
            .required(`Le type de visiteur est obligatoire`)
            .matches(/visitor|contractor|courier|other/, 'Le type de visiteur est obligatoire'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data, e) => {
        console.log(data)
    }

    const firstNameProps = {
        fieldName: "firstname",
        icon: ["fas", "id-card-alt"],
        reg: register("firstname"),
        placeholder: "Prénom *",
        error: errors.firstname,
        size: 'lg'
    };

    const lastNameProps = {
        fieldName: "lastname",
        icon: ["fas", "address-book"],
        reg: register("lastname"),
        placeholder: "Nom de famille *",
        error: errors.lastname,
        size: 'lg'
    }

    const phoneNumberProps = {
        fieldName: "phonenumber",
        icon: ["fas", "phone-square-alt"],
        reg: register("phonenumber"),
        placeholder: "Numéro de téléphone",
        error: errors.phonenumber,
        size: 'lg'
    }

    const emailProps = {
        fieldName: "email",
        icon: ["fas", "envelope"],
        reg: register("email"),
        placeholder: "Email *",
        error: errors.email,
        size: 'lg'
    }

    const companyProps = {
        fieldName: "company",
        icon: ["fas", "building"],
        reg: register("company"),
        placeholder: "Nom de l'entreprise *",
        error: errors.company,
        size: 'lg'
    }

    const visitorTypeProps = {
        fieldName: "visitortype",
        icon: ["fas", "building"],
        reg: register("visitortype"),
        placeholder: "Type de visiteur *",
        error: errors.visitortype,
        size: 'lg',
        options: {
            "visitor": "Visiteur",
            "contractor": "Prestataire",
            "courier": "Coursier",
            "other": "Autre",
        }
    }

    return (
        <section id="first-visit" >
            <div>
                <Button color="primary"><FontAwesomeIcon icon={["fas", "chevron-left"]} /></Button>
            </div>
            <Row>
                <Col className="text-center">
                    <h2 className="h2 mt-3 mb-4">Vos coordonées, SVP</h2>
                </Col>
            </Row>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md="6">
                            <InputText {...firstNameProps} />
                        </Col>
                        <Col md="6">
                            <InputText {...lastNameProps} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="5">
                            <InputText {...phoneNumberProps} />
                        </Col>
                        <Col md="7">
                            <InputText {...emailProps} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <InputText {...companyProps} />
                        </Col>
                        <Col md="6">
                            <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText id={visitorTypeProps.fieldName + "-addon"}>
                                        <FontAwesomeIcon icon={visitorTypeProps.icon} className="text-primary" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input {...visitorTypeProps.reg}
                                    className={`${visitorTypeProps.error ? 'is-invalid' : ''}`}
                                    name={visitorTypeProps.fieldName}
                                    aria-describedby={visitorTypeProps.fieldName + "-addon"}
                                    autoComplete="off"
                                    bsSize={visitorTypeProps.size}
                                    type="select"
                                    defaultValue=""
                                >
                                    <option hidden value="">{visitorTypeProps.placeholder}</option>
                                    {
                                        Object.entries(visitorTypeProps.options).map(([value, display]) => {
                                            return (<option key={value} value={value}>{display}</option>)
                                        })
                                    }
                                </Input>
                                <FormFeedback>{visitorTypeProps.error?.message}</FormFeedback>
                            </InputGroup>
                        </Col>
                    </Row>
                    <FormGroup className="text-center">
                        <Button id="submit-new" type="submit" color="success">Suivant</Button>
                    </FormGroup>
                </Form>
            </Container>
        </section >
    )
}

