import axios from "axios";

export default {

    //get modals for a specific ID
    getModal: function (id) {
        return axios.get("/api/modal/" + id);
    }
};