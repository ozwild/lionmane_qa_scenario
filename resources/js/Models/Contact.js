import ContactService from "../Services/ContactService";

export default class Contact {

    id;
    name = "";
    first_name = "";
    last_name = "";
    email = "";
    birth_date = "";
    telephone_1 = "";
    telephone_2 = "";
    telephone_3 = "";

    /**
     * @param data {Object}
     */
    constructor(data = {}) {
        Object.keys(data)
            .forEach(key => {
                const value = data[key];
                if (this.hasOwnProperty(key) && value) {
                    this[key] = value;
                }
            });
    }

    /**
     * @param data {Object}
     * @returns {Contact}
     */
    fill(data) {
        Object.keys(data)
            .forEach(key => {
                const value = data[key];
                if (this.hasOwnProperty(key) && value) {
                    this[key] = value;
                }
            });
        return this;
    }

    /**
     * @returns {boolean}
     */
    get isANewContact() {
        return !this.id;
    }

    /**
     * @returns {Promise<AxiosResponse<any>|never>}
     */
    save() {
        return ContactService.save(this)
            .then(userData => this.fill(userData));
    }

}