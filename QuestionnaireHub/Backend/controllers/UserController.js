
import db from '../DataBase.js'
import jwt from 'jsonwebtoken'

const login = (req, res) => {
    const que = "SELECT * FROM users WHERE email = ? AND password = ?";
    const { email, password } = req.body;
    db.query(que, [email, password], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length > 0) {

            const name = data[0].name;
            const user_id = data[0].user_id;
            const admin = data[0].admin;

            const token = jwt.sign({ name, user_id, admin }, "secret-key", { expiresIn: '1d' });
            res.cookie("token", token);
            return res.json({ status: true, user_id: user_id, admin: admin });
        } else {
            return res.json({ Mess: "Invalid email or password" });
        }
    });
}

//Logout
const logout = (req, res) => {
    res.clearCookie('token')
    return res.json({ Mess: true })
}

//Add user
const addUser = (req, res) => {
    const que = "INSERT INTO users (`name`,`surname`,`phone`,`email`,`password`) VALUES (? )"
    const values = [
        req.body.name,
        req.body.surname,
        req.body.phone,
        req.body.email,
        req.body.password
    ]
    db.query(que, [values], (err, data) => {
        if (err) return res.json({ Mess: 'No Added' });
        else return res.json({ status: true });
    })
}

export default { login, logout, addUser }