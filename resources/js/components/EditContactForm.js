import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import useDataProvider from './useDataProvider';
import ContactService from "../Services/ContactService";
import Contact from "../Models/Contact";

const EditContactForm = ({onSave, match}) => {
    const {contactId} = match.params;
    const [{model, isLoading, isError}] = useDataProvider(ContactService, contactId, new Contact());

    return (
        <ContactForm onSave={onSave} contact={model} isLoading={isLoading} isError={isError}/>
    );

};

EditContactForm.defaultProps = {
    onSave: () => {
    }
};

EditContactForm.propTypes = {
    onSave: PropTypes.func
};

export default EditContactForm;