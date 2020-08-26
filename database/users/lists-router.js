const router = require("express").Router();
const Users = require("./users-model");
const axios = require("axios");
const FormData = require("form-data");

async function getRecs(prefs) {
    try {
      const formData = new FormData();
  
      formData.append("Flavors/Effects", prefs);
  
      const recResponse = await axios.post(
          ///change me!!! using med cabinet 8 app
        "https://medcabinet-ds.herokuapp.com/recommend",
        formData,
        {
          // You need to use `getHeaders()` in Node.js because Axios doesn't
          // automatically set the multipart form boundary in Node.
          headers: formData.getHeaders(),
        }
      );
      const recommendations = recResponse.data;
  
      return recommendations;
    } catch (err) {
      return err.message;
    }
  }

router.get("/data", (req, res) => {
    try {
        let id = req.decodedJwt.subject;
        let user = req.decodedJwt.username;
        res.status(200).json({
            message: res,
          });
    await Users.getRecs("I am the very model of a modern major general")

}