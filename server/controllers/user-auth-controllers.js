import issueJwt from "../lib/jwtUtils.js";
import { genPassword, validatePassword } from "../lib/passwordUtils.js";
import { OAuth2Client } from "google-auth-library";
import pool from "../dbConnecion/connection.js";
import transporter from "../lib/emailerUtils.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const userAuthControllers = {};

// ---------- Querying user by email ---------- //
const user = async (email) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        return rows;
    } catch (error) {
        console.log(error);
    }
};

// ---------- Generating Name Initials ----------//
const getInitials = (name, lastName) => {
    const initials = name.charAt(0) + lastName.charAt(0);
    return initials.toUpperCase();
};


// ---------- Sign In Authentication ----------//
userAuthControllers.logInPost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const rows = await user(email);

        if (!rows[0]) {
            res.json({ userExist: false });
        } else if (rows[0].isverified) {
            const isPasswordValid = validatePassword(password, rows[0].hash, rows[0].salt);

            if (isPasswordValid) {
                const issuedToken = issueJwt(rows[0].id);
                res.json({ isAuth: true, token: issuedToken.token });
            } else {
                res.json({ wrongPassword: true });
            }
        } else {
            res.json({ hasToVerify: true });
        }
    } catch (error) {
        res.json({ err: true });
    }
};

// ---------- Sign Up Authentication ----------//
userAuthControllers.signUpPost = async (req, res) => {
    try {
        const { username, lastname, email, password } = req.body;
        const nameInitials = getInitials(username, lastname);
        const rows = await user(email);
        console.log('it gets here')
        console.log(rows);

        if (rows[0]) {
            res.json({ userExist: true });
        } else if (!rows[0]) {
            const generatedPassword = genPassword(password);
            console.log(generatedPassword)

            const { rows } = await pool.query("WITH data AS (INSERT INTO credits VALUES ($1, $2, $3, $4)) INSERT" +
                " INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [uuidv4(), username, email, "500.00", generatedPassword.salt, generatedPassword.hash, false, lastname, nameInitials]);
                    console.log(rows, 'line 142');
            if (rows[0]) {
                let mailOptions = {
                    from: "cristofercuevasperez72@gmail.com",
                    to: email,
                    subject: "Verify your account",
                    text: "Click the following link to verify your account",
                    html: `Click here to verify you. <a href=http://localhost:3000/verify/${rows[0].id}>Click me</a>`,
                };

                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        res.json({ err: true });
                        console.log(err, 'line 156')
                    } else {
                        res.json({ hasToVerify: true });
                    }
                });
            }
        }
    } catch (error) {
        res.json({ err: true });
        console.log(error)
    }
};

userAuthControllers.getVerificationId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (rows[0]) {
            if (rows[0].isverified) {
                const issuedToken = issueJwt(rows[0].id);
                res.json({ isAuth: true, token: issuedToken.token });
            } else {
                await pool.query("UPDATE users SET isverified = 'true' WHERE id = $1", [rows[0].id]);

                res.redirect(`http://localhost:3001/verify/${id}`);
            }
        } else {
            res.send("<h1>Wrong Verification</h1>");
        }
    } catch (error) {
        console.log(error);
    }
};

userAuthControllers.getAuth = (req, res) => {
    res.json({ isAuth: true });
};

userAuthControllers.authFailed = (req, res) => {
    res.json({ isAuth: false });
};

export default userAuthControllers;
