import axios from "axios";

const instance = () => 
    axios.create({
        timeout: 1000,
        headers: {Authorization: localStorage.getItem("token")}
    });

export default {
    //get modals for a specific ID
    getModal: function(id) {
        console.log('this is api.js id: ', id);
        return instance().get("/api/modal/" + id);
    }, 
    //post for adding modals
    addModal: function(id, data) {
        return instance().post("/api/modal/post/", id, data);
    }
};


