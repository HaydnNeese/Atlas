import axios from "axios";

export default {

    //get modals for a specific ID
    getModal: function (id) {
        return axios.get("/api/modal/" + id);
    },

    // need post for creating new notes (modals)
    addModal: function (id, data) {
        return axios.post("/api/modal/post", id, data);
    }

};