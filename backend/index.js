
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let queues = {
    list:
        [
            { id: 1, name: 'Natthanon Narit', phone: 'xxx-xxx-xxxx', license: "1xx xxxx" },
        ]
}
require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.route('/queues')
    .get((req, res) => res.json(queues))
    .post((req, res) => {
        console.log(req.body)
        let newQueue = {}
        newQueue.id = (queues.list.length) ? queues.list[queues.list.length - 1].id + 1 : 1
        newQueue.name = req.body.name
        newQueue.phone = req.body.phone
        newQueue.license = req.body.license
        queues = { list: [...queues.list, newQueue] }
        res.json(queues)
    })

router.route('/queues/:queue_id') //params
    .get((req, res) => {
        let id = queues.list.findIndex((item) => (+item.id === +req.params.queue_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(queues.list[id])
        }
    })
    .put((req, res) => {
        let id = queues.list.findIndex((item) => (+item.id === +req.params.queue_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            queues.list[id].name = req.body.name
            queues.list[id].phone = req.body.phone
            queues.list[id].license = req.body.license
            res.json(queues)
        }


    })
    .delete((req, res) => {
        let id = queues.list.findIndex((item) => (+item.id === +req.params.queue_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            queues.list = queues.list.filter((item) => +item.id !== +req.params.queue_id)
            res.json(queues)
        }
    })

router.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        console.log("Login: ", req.body, user, err, info);
        if (err) return next(err);
        if (user) {
            if (req.body.remember == true) {
                time_exp = "7d";
            } else time_exp = "1d";
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: time_exp,
            });
            var decoded = jwt.decode(token);
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200;
            return res.json({ user, token });
        } else return res.status(422).json(info);
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })
            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))