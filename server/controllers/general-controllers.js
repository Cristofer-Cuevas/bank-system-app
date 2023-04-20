const generalControllers = {};
import pool from "../dbConnecion/connection.js";
import transporter from "../lib/emailerUtils.js";

generalControllers.getUsers = async (req, res) => {
    try {
        const { id, name, last_name, name_initials } = req.user;

        const { rows } = await pool.query("SELECT id, name, last_name, name_initials FROM users WHERE name != $1 AND isverified = $2", [name, true]);

        const { rows: transactions } = await pool.query("SELECT name, amount, date, increment FROM transactions WHERE id = $1 ORDER BY date DESC", [id]);

        const { rows: credit } = await pool.query("SELECT credit FROM credits WHERE name = $1", [name]);

        res.json({ isAuth: true, users: rows, requester: { name: name + " " + last_name, name_initials, credit: credit[0].credit }, transactions: transactions });
    } catch (error) {
        console.log(error);
    }
};

generalControllers.transferPost = async (req, res) => {
    try {
        const { id: recipientId, amount } = req.body;
        const { id: senderId, email, name: senderName } = req.user;

        if (isNaN(amount)) {
            res.json({ isTransferCompleted: false });
        } else {
            const { rows: users } = await pool.query("WITH RECURSIVE users AS (SELECT email, name, credit FROM credits WHERE id = $1 UNION ALL SELECT email, name, credit from credits WHERE id = $2) SELECT * FROM users", [recipientId, senderId]);
            if (!users[0] || !users[1]) {
                res.json({ userExist: false });
            } else {
                const result = Number(users[1].credit) - Number(amount);
                // ---------- If "result" if a negative number the user doesn't have enough credit to make the transaction ---------- //
                if (Math.sign(result) === -1 || Math.sign(amount) === 0) {
                    res.json({ hasEnoughCredit: false });
                } else {
                    const { rows: sender } = await pool.query("WITH credit AS (UPDATE credits SET credit = credit + $1 WHERE id = $2) UPDATE credits SET credit = credit - $1 WHERE id = $3 RETURNING credit, name", [amount, recipientId, senderId]);

                    const date = new Date();
                    const formattedDate = date.toLocaleString("en-US", {
                        weekday: "long",
                        hourCycle: "h24",
                        hour: "2-digit",
                        minute: "2-digit",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    });

                    const { rows: bill } = await pool.query("INSERT INTO transactions VALUES ($1, $2, $3, $4, $5), ($6, $7, $3, $4, $8) RETURNING name, date, amount, increment ", [senderId, users[0].name, formattedDate, amount, false, recipientId, senderName, true]);

                    res.json({ hasEnoughCredit: true, isTransferCompleted: true, credit: sender[0].credit, transaction: bill[0] });
                    if (sender[0]) {
                        transporter.sendMail({
                            from: "programmerxs07@gmail.com",
                            to: email,
                            subject: "Transaction has been successfully completed",
                            html: `<p>You have transfered $${amount} to ${users[0].name}. Your current credit now is ${sender[0].credit}`,
                        });
                        transporter.sendMail({
                            from: "programmerxs07@gmail.com",
                            to: users[0].email,
                            subject: "Transaction has been successfully completed",
                            html: `<p>${sender[0].name} have transfered you $${amount}.`,
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default generalControllers;
