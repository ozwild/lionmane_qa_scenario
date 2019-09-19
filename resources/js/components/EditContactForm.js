import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import useDataProvider from './useDataProvider';
import ContactService from "../Services/ContactService";
import Contact from "../Models/Contact";

const EditContactForm = ({contactId, onSave}) => {

    const [{model, isLoading, isError}] = useDataProvider(ContactService, contactId, new Contact());

    return (
        <ContactForm onSave={onSave} contact={model} isLoading={isLoading} isError={isError}/>
    );

};

EditContactForm.defaultProps = {
    contactId: null,
    onSave: () => {
    }
};

EditContactForm.propTypes = {
    contactId: PropTypes.number.isRequired,
    onSave: PropTypes.func
};

export default EditContactForm;