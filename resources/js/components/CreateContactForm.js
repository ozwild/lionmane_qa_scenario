import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Models/Contact'
import ContactForm from './ContactForm';

const CreateContactForm = (props) => {
    const contact = new Contact();
    const {onSave} = props;

    return (
        <ContactForm onSave={onSave} contact={contact}/>
    );

};

CreateContactForm.defaultProps = {
    onSave: () => {
    }
};

CreateContactForm.propTypes = {
    onSave: PropTypes.func
};

export default CreateContactForm;