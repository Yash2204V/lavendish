const express = require("express");
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isloggedowner = require('../middlewares/isLoggedOwner');
const { registerOwner, loginOwner, logoutOwner } = require("../controllers/authControllerOwner");

router.post('/register', registerOwner);

router.post('/login', loginOwner);

router.get('/logout', logoutOwner);

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("owner-login", { error, isAdmin: true , loggedin: false});
});

router.route('/admin')
    .post((req, res) => {
        let success = req.flash("success");
        res.render("createproducts", {success, isAdmin: true});
    })
    .get(isloggedowner, (req, res) => {
        let success = req.flash("success");
        res.render("createproducts", {success, isAdmin: true});
    })

router.get("/myaccount", isloggedowner, async (req, res)=>{

    let owner = await ownerModel
    .findOne({email: req.owner.email})
    .populate("products");
    let success = req.flash("success");
    res.render("admin", {owner, success, isAdmin: true});
})


module.exports = router;