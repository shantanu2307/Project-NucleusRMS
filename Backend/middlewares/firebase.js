var admin = require('firebase-admin');

var serviceAccount = require("./key.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FB_URI
});
const verifyToken = async function (req, res, next) {
    try {

        const key = req.headers.authorization;
        const {
            uid
        } = await admin.auth().verifyIdToken(key)
        req.uid = uid
        next()
    } catch (error) {
        //console.log(error)
        res.send({
            message: "Authentication problem",
            error
        }).status(400)
    }


}
module.exports = {
    verifyToken
}