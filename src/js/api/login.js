const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
router.post('/', (req, res) => {

    req.app.get('client')
        .query('select password from users where email = $1::text', [req.body.email])
        .then(result => {
            if (result.rowCount != 1) {
                console.log('why');
                res.json({ success: false, error: "User does not exist" });
            } else {
                var correct_password = result.rows[0].password;
                if (correct_password == req.body.password) {
                    console.log(`${req.body.email} successfully logged in`);
                    res.json({ success: true, session: randomUUID() });
                } else {
                    console.log(`Password for ${req.body.email} is incorrect`);
                    res.json({ success: false, error: "Password incorrect" });
                }
            }

        })
        .catch(e => console.error(e.stack))
});

module.exports = router;