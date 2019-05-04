import axios from "axios";

export default {
    getModal: function (id) {
        return axios.get("/api/modal/" + id);
    },
    addModal: function (id,data) {
        return axios.post("/api/modal/" + id , data);
    },
    delete: function(id) {
        return axios.delete("/api/modal/" + id);
      },
};