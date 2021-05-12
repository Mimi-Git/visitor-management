import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardBody, CardHeader, Spinner } from 'reactstrap';

// const BASE_URL = 'https://visitor-management-api.azurewebsites.net/api';
const BASE_URL = 'https://localhost:5001/api';
const APP_ID = 'X-ClientId';

const EmployeeSelection = (props) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/employees`, { headers: { 'app-id': APP_ID } })
            .then(({ data }) => setData(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="employee-selection">
            <Row>
                <Col xs="3" sm="5" md="6" lg="7" xl="8">
                    <Button size="lg" color="primary"><FontAwesomeIcon icon={["fas", "chevron-left"]} /></Button>
                </Col>
                <Col xs="9" sm="7" md="6" lg="5" xl="4">
                    <InputGroup>
                        <Input
                            placeholder={"Rechercher"}
                            name={"search"}
                            aria-describedby={"search-addon"}
                            autoComplete="off"
                            bsSize={"lg"}
                        />
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText id={"search-addon"}>
                                <FontAwesomeIcon icon={["fas", "search"]} className="text-primary" />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-2 employees-row">
                <Col lg="9" className="mt-2">
                    <Card style={{ "color": "#212529" }}>
                        <CardHeader tag="h2" className="text-center">Personne visitée</CardHeader>
                        <CardBody className="scroll">
                            {loading && <div className="text-center"><Spinner color="primary" /></div>}
                            <Row>
                                {
                                    Object.values(data).map(employee => (
                                        <Col sm="12" md="6" xl="4" key={employee.id}>
                                            <button className="employee-content  w-100" >
                                                <div>
                                                    <img src={`https://source.unsplash.com/random/${employee.id}0x${employee.id}0`} alt="Avatar" className="avatar" />
                                                </div>
                                                <div>
                                                    <div className="employee-name">{`${employee.firstName} ${employee.lastName}`}</div>
                                                    <div className="employee-department text-muted">{employee.department}</div>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={["fas", "chevron-right"]} />
                                                </div>
                                            </button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </section>
    );
};

export { EmployeeSelection };