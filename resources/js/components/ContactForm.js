import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Header, Message, Container} from "semantic-ui-react";
import useForm from './useForm';
import Contact from '../Models/Contact'
import ContactService from "../Services/ContactService";

const ContactForm = (props) => {
    const contact = !props.contactId ? new Contact() : ContactService.get(props.contactId);
    const {...initialValues} = contact;
    const isANewContactForm = contact.isANewContact;
    const [status, setStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const {values, handleChange, handleSubmit, setValues} = useForm({
        initialValues: initialValues,
        onSubmit({values}) {
            setStatus("loading");
            const contact = new Contact(values);
            contact.save()
                .then(response => {
                    setTimeout(() => setStatus("success"), 3000);
                    setValues(response);
                    if (props.onSave) {
                        props.onSave(contact);
                    }
                })
                .catch(error => {
                    setStatus("error");
                    setFormErrors(error.errors);
                });
        }
    });

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
                                label={"First Name"}
                                name="first_name"
                                placeholder={"First Name"}
                                onChange={handleChange}
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
                                label={"Last Name"}
                                name="last_name"
                                placeholder={"Last Name"}
                                onChange={handleChange}
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
                                required
                                {...(formErrors['email'] && {
                                    error: {
                                        content: formErrors['email'][0],
                                        pointing: 'below'
                                    }
                                })}/>

                    <Form.Field control={Input}
                                id={"birth_date"}
                                label={"Birth Date"}
                                name="birth_date"
                                placeholder={"Date of birth"}
                                onChange={handleChange}
                                {...(formErrors['birth_date'] && {
                                    error: {
                                        content: formErrors['birth_date'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                </FormGroup>

                <FormGroup>
                    <Form.Field control={Input}
                                id={"telephone_1"}
                                label={"Phone Number"}
                                name="telephone_1"
                                placeholder={"Phone Number 1"}
                                onChange={handleChange}
                                required
                                {...(formErrors['telephone_1'] && {
                                    error: {
                                        content: formErrors['telephone_1'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                    <Form.Field control={Input}
                                id={"telephone_2"}
                                label={"Phone Number"}
                                name="telephone_2"
                                placeholder={"Phone Number 2"}
                                onChange={handleChange}
                                required
                                {...(formErrors['telephone_2'] && {
                                    error: {
                                        content: formErrors['telephone_2'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                    <Form.Field control={Input}
                                id={"telephone_3"}
                                label={"Phone Number"}
                                name="telephone_3"
                                placeholder={"Phone Number 3"}
                                onChange={handleChange}
                                required
                                {...(formErrors['telephone_3'] && {
                                    error: {
                                        content: formErrors['telephone_3'][0],
                                        pointing: 'below'
                                    }
                                })}/>
                </FormGroup>
                <Message
                    success
                    header="Success!"
                    content={`The contact has been ${isANewContactForm ? "created" : "updated"}`}
                />
                <Form.Button content={"Submit"}/>
            </Form>
        </Container>
    )
};

/*class ContactForm extends Component {

    constructor(props) {
        super(props);
        const contact = !this.props.contactId ? new Contact() : await ContactService.get(props.contact);
        this.state = {
            contact: new Contact()
        };
    }

    componentDidMount() {
        this.props.contactId && ContactService.get(this.props.contactId)
            .then(contact => {
                this.setState({contact});
            });
    }

    render() {
        const {onSave} = this.props;
        const {contact} = this.state;
        console.log(contact);
        return (
            <_ContactForm onSave={onSave} contact={contact}/>
        );
    }
}*/

ContactForm.defaultProps = {
    contactId: null,
    onSave: () => {
    }
};

ContactForm.propTypes = {
    contactId: PropTypes.number,
    onSave: PropTypes.func
};

export default ContactForm;