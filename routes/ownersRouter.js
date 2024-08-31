const express = require("express");
const router = express.Router();
const isloggedowner = require('../middlewares/isLoggedOwner');
const { registerOwner, loginOwner, logoutOwner } = require("../controllers/authControllerOwner");

router.post('/register', registerOwner);

router.post('/login', loginOwner);

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", { error, isAdmin: true , loggedin: false});
});

router.get('/logout', logoutOwner);

router.route('/admin')
    .post((req, res) => {
        let success = req.flash("success");
        res.render("createproducts", {success, loggedin: true, isAdmin: true});
    })
    .get(isloggedowner, (req, res) => {
        let success = req.flash("success");
        res.render("createproducts", {success, loggedin: true, isAdmin: true});
    })

router.get("/myaccount", (req, res)=>{
    res.render("admin", {loggedin: true, isAdmin: true});
})


module.exports = router;