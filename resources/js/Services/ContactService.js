import axios from 'axios';
import Contact from "../Models/Contact";

export default class ContactService {

    /**
     * @param query {string}
     * @returns {Promise<string|SpeechRecognitionResultList>|null}
     */
    static async searchContact(query) {

        if (!query) {
            return;
        }

        const response = await axios.get(`/api/contacts/search?query=${encodeURIComponent(query)}`);
        const {data} = await response;
        return data.results.map(contactData => new Contact(contactData));
    }

    /**
     * @param id {int}
     * @returns {Promise<Contact | Promise<Contact | never>>}
     */
    static async get(id) {

        const response = await axios.get(`/api/contacts/${id}`);
        const {data} = await response;
        const contact = ContactService.build(data);
        return contact;

        /*return axios.get(`/api/contacts/${id}`)
            .then(response => {
                return ContactService.build(response.data);
            }).catch(error => {
                console.error(error);
                throw error;
            });*/
    }

    static async all() {
        const response = await axios.get('api/contacts');
        return await response.data;
    }

    /**
     *
     * @param data {Object}
     * @returns {Contact}
     */
    static build(data) {
        return new Contact(data);
    }

    /**
     * @param contact {Contact}
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    static save(contact) {
        return contact.isANewContact ?
            this.#store(contact) :
            this.#update(contact);
    }

    /**
     * @param contact Contact
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(contact) {
        return axios.post('/api/contacts', contact)
            .then(response => response.data)
            .catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);

                throw response;
            });
    }

    /**
     * @param contact Contact
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(contact) {
        return axios.put('/api/contacts/' + contact.id, contact)
            .then(response => response.data)
            .catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);

                throw response;
            });
    }

}