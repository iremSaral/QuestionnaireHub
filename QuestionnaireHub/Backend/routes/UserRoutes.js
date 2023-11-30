//User İşlemleri
import express from "express";
import jwt from 'jsonwebtoken'
import userController from "../controllers/UserController.js";
const router = express.Router();

//Login App
router.post('/login', userController.login);

//Auth control
const verifyuser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.json({ Mess: "Login Now" });
    jwt.verify(token, "secret-key", (err, decoced) => {
        if (err) return res.json({ Mess: "Auth Error" });

        req.name = decoced.name;
        req.user_id = decoced.user_id;
        req.admin = decoced.admin;

        next();
    })
}
router.get('/', verifyuser, (req, res) => {
    return res.json({ status: true, name: req.name, user_id: req.user_id, admin: req.admin });
})


//Logout
router.get('/logout', userController.logout)

//User Add
router.post('/user/add', userController.addUser)

export default router;