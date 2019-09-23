import React, {useState, useContext} from 'react';
import {AuthContext} from "../Contexts/AuthContext";
import {Container, Form, FormGroup, Input, Card, Image} from "semantic-ui-react";
import useForm from "./useForm";

const Login = (props) => {
    const {history} = props;
    const {login} = useContext(AuthContext);
    const [status, setStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const {values, handleChange, handleSubmit, setValues} = useForm({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit({values}) {
            setStatus("loading");
            setFormErrors({});
            login(values.email, values.password)
                .then(response => {
                    setStatus("success");
                    history.goBack();
                    /**
                     * @todo goto home if `back` is not defined
                     */
                })
                .catch(error => {
                    setStatus("error");
                    setFormErrors(error.errors);
                });
        }
    });

    return (
        <Container style={{paddingTop: "3em"}}>
            <Card style={{maxWidth: "430px"}}>

                <Image src='/images/desk-top.jpg' wrapped ui={false} style={{objectFit: "cover"}}/>

                <Card.Content>
                    <Form onSubmit={handleSubmit}
                          {...(status === "loading" && {loading: true})}
                          {...(status === "success" && {success: true})}
                          {...(status === "error" && {error: true})}>

                        <FormGroup widths={"equal"}>

                            <Form.Field control={Input}
                                        type={"email"}
                                        id={"email"}
                                        label={"Email Address"}
                                        name="email"
                                        placeholder={"Registered email address"}
                                        onChange={handleChange}
                                        value={values.email}
                                        required
                                        {...(formErrors['email'] && {
                                            error: {
                                                content: formErrors['email'][0],
                                                pointing: 'below'
                                            }
                                        })}
                            />
                        </FormGroup>

                        <FormGroup widths={"equal"}>
                            <Form.Field control={Input}
                                        type={"password"}
                                        id={"password"}
                                        label={"Password"}
                                        name="password"
                                        placeholder={"Password"}
                                        onChange={handleChange}
                                        value={values.password}
                                        required
                                        {...(formErrors['password'] && {
                                            error: {
                                                content: formErrors['password'][0],
                                                pointing: 'below'
                                            }
                                        })}
                            />
                        </FormGroup>
                        <Form.Button content={"Submit"}/>
                    </Form>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default Login;