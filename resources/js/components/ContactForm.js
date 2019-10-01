import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Header, Message, Container} from "semantic-ui-react";
import useForm from './useForm';
import Contact from '../Models/Contact'

const ContactForm = ({contact, onSave}) => {

    const [status, setStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const isANewContactForm = contact.isANewContact;
    const {values, handleChange, handleSubmit, setValues} = useForm({
        initialValues: contact,
        onSubmit({values}) {
            setStatus("loading");
            setFormErrors({});
            const contact = new Contact(values);
            contact.save()
                .then(response => {
                    setStatus("success");
                    setValues(response);
                    if (onSave) {
                        onSave(contact);
                    }
                })
                .catch(error => {
                    setStatus("error");
                    setFormErrors(error.errors);
                });
        }
    });

    useEffect(() => setValues(contact), [contact.id]);

    return (
        <Container text>
            <Header as={"h2"}>{!values.id ? "New Contact" : values.name}</Header>
            <Form onSubmit={handleSubmit}
                  {...(status === "loading" && {loading: true})}
                  {...(status === "success" && {success: true})}
                  {...(status === "error" && {error: true})}>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Input}
                                id={"first_name"}
                                label={"Nombre"}
                                name="first_name"
                                placeholder={"First Name"}
                                onChange={handleChange}
                                value={values.first_name}
                                pattern="[a-zA-Z]+"
                                onInvalid={(e) => {
                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('Please enter letters only')
                                    }else{
                                        e.target.setCustomValidity("")
                                    }
                                }}
                                required
                                {...(formErrors['first_name'] && {
                                    error: {
                                        content: formErrors['first_name'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                    <Form.Field control={Input}
                                id={"last_name"}
                                label={"Apellido"}
                                name="last_name"
                                placeholder={"Last Name"}
                                onChange={handleChange}
                                value={values.last_name}
                                pattern="[a-zA-Z]+"
                                onInvalid={(e) => {
                                    if (e.target.validity.patternMismatch) {
                                        e.target.setCustomValidity('Please enter letters only')
                                    }else{
                                        e.target.setCustomValidity("")
                                    }
                                }}
                                required
                                {...(formErrors['last_name'] && {
                                    error: {
                                        content: formErrors['last_name'][0],
                                        pointing: 'below'
                                    }
                                })}
                    />

                </FormGroup>

                <FormGroup widths={"equal"}>

                    <Form.Field control={Input}
                                id={"email"}
                                label={"Email"}
                                name="email"
                                placeholder={"Email Address"}
                                onChange={handleChange}
                                value={values.email}
                                required
                                {...(formErrors['email'] && {
                                    error: {
                                        content: formErrors['email'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                </FormGroup>

                <FormGroup>
                    <Form.Field control={Input}
                                id={"telephone_1"}
                                label={"Teléfono 1"}
                                name="telephone_1"
                                placeholder={"Phone Number 1"}
                                onChange={handleChange}
                                value={values.telephone_1}
                                {...(formErrors['telephone_1'] && {
                                    error: {
                                        content: formErrors['telephone_1'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                    <Form.Field control={Input}
                                id={"telephone_2"}
                                label={"Teléfono 2 (Opcional)"}
                                name="telephone_2"
                                placeholder={"Phone Number 2"}
                                onChange={handleChange}
                                value={values.telephone_2}
                                {...(formErrors['telephone_2'] && {
                                    error: {
                                        content: formErrors['telephone_2'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                    <Form.Field control={Input}
                                id={"telephone_3"}
                                label={"Teléfono 3 (Opcional)"}
                                name="telephone_3"
                                placeholder={"Phone Number 3"}
                                onChange={handleChange}
                                value={values.telephone_3}
                                {...(formErrors['telephone_3'] && {
                                    error: {
                                        content: formErrors['telephone_3'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                </FormGroup>
                <FormGroup>
                    <Form.Field control={Input}
                                id={"birth_date"}
                                label={"Fecha de Nacimiento"}
                                name="birth_date"
                                placeholder={"Date of birth"}
                                onChange={handleChange}
                                value={values.birth_date}
                                {...(formErrors['birth_date'] && {
                                    error: {
                                        content: formErrors['birth_date'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                </FormGroup>
                <Message
                    success
                    header="Success!"
                    content={`The contact has been ${isANewContactForm ? "created" : "updated"}`}
                />
                <div style={{textAlign: 'center'}}>
                    <Form.Button content={"Submit"}/>
                </div>
            </Form>
        </Container>
    )
};

ContactForm.defaultProps = {
    contact: new Contact(),
    onSave: () => {
    }
};

ContactForm.propTypes = {
    contact: PropTypes.object.isRequired,
    onSave: PropTypes.func
};

export default ContactForm;