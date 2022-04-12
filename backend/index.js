
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let products = {
    list:
        [
            { id: "6135512060", name: 'Natthanon', surname: 'Narit', major: "CoE", GPA: 3.50 },
        ]
}
require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.route('/products')
    .get((req, res) => res.json(products))
    .post((req, res) => {
        console.log(req.body)
        let newProducts = {}
        newProducts.id = (products.list.length) ? products.list[products.list.length - 1].id + 1 : 1
        newProducts.name = req.body.name
        newProducts.surname = req.body.surname
        newProducts.major = req.body.major
        newProducts.GPA = req.body.GPA
        products = { list: [...products.list, newProducts] }
        res.json(products)
    })

router.route('/products/:products_id') //params
    .get((req, res) => {
        let id = products.list.findIndex((item) => (+item.id === +req.params.products_id))

        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(products.list[id])
        }


    })
    .put((req, res) => {
        let id = products.list.findIndex((item) => (+item.id === +req.params.products_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            products.list[id].name = req.body.name
            products.list[id].surname = req.body.surname
            products.list[id].major = req.body.major
            products.list[id].GPA = req.body.GPA
            res.json(products)
        }


    })
    .delete((req, res) => {

        let id = products.list.findIndex((item) => (+item.id === +req.params.products_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            products.list = products.list.filter((item) => +item.id !== +req.params.products_id)
            res.json(products)
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

router.post("/register", async (req, res) => {
    try {
        const SALT_ROUND = 10;
        const { name, surname, username, email, password, phone } = req.body;
        if (!name || !username || !email || !password || !phone)
            return res.json({ message: "Cannot register with empty string" });
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" });

        let id = users.users.length
            ? users.users[users.users.length - 1].id + 1
            : 1;
        hash = await bcrypt.hash(password, SALT_ROUND);
        users.users.push({ id, username, password: hash, email });
        res.status(200).json({ message: "Register success" });
    } catch {
        res.status(422).json({ message: "Cannot register" });
    }
});

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
app.listen(port, () => console.log(`Server is running on port ...${port}`))

