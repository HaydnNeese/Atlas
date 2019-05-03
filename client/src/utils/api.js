import axios from "axios";

export default {

    //get modals for a specific ID
    getModal: function (id) {
        // console.log('this is api.js id: ', id);
        // console.log(`/api/modal/${id}`);
        return axios.get("/api/modal/" + id);
    },
    // need post for creating new notes (modals)
    addModal: function (id,data) {
        // console.log("WE ARE AT THE POST ROUTE>>>>>>>");
        // console.log(`this is my ID being ${id}`);
        // console.log(`This is the TEST DATA ${data}`);
        
        return axios.post("/api/modal/" + id , data);
    }

    //make an edit modal and delete modal thing
};