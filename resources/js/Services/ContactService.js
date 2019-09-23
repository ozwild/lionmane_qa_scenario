import axios from 'axios';
import AuthService from './AuthService';
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
        const {token} = AuthService;
        const response = await axios.get(`/api/contacts/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const {data} = await response;
        return ContactService.build(data);
    }

    static async all(page = 1) {
        const {token} = AuthService;
        const response = await axios.get('api/contacts?page=' + page, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
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
        const result = contact.isANewContact ?
            this.#store(contact) :
            this.#update(contact);

        result
            .then(response => response.data)
            .catch(error => {
                const response = error.response.data;
                response.messages = Object.values(response.errors)
                    .reduce((reduction, errorMessages) => {
                        return reduction.concat(errorMessages);
                    }, []);

                throw response;
            });

        return result;
    }

    /**
     * @param contact Contact
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #store(contact) {
        const {token} = AuthService;
        return axios.post('/api/contacts', contact, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    /**
     * @param contact Contact
     * @returns {Promise<AxiosResponse<any> | never>}
     */
    static #update(contact) {
        const {token} = AuthService;
        return axios.put('/api/contacts/' + contact.id, contact, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    static delete(contact) {
        const {token} = AuthService;
        return axios.delete('/api/contacts/' + contact.id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    static undelete(contact) {
        const {token} = AuthService;
        return axios.post('/api/contacts/' + contact.id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

}