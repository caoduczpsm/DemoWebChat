const User = require('../models/User');
const { dynamooseToObject, multipleDynamooseToObject } = require('../util/mongoose');

class siteController {
    // GET /
    index(req, res, next) {
        res.render('home');
    }

    async login(req, res, next) {
        if (req.session.isLoggin) {
            const { email, password } = req.body;

            const user = await User.get({ "email": email });

            const id = user._id;

            const token = jwt.sign({ id }, 'ncaoduc@tma.com.vn', {
                expiresIn: "30d",
            });

            if (user && (user.password === password)) {
                // res.json({
                //     email: user.email,
                //     _id: user._id,
                //     name: user.name,
                //     isAdmin: user.isAdmin,
                //     pic: user.pic,
                //     token: token
                // });
                res.render('home');

            } else {
                res.status(401);
                throw new Error("Invalid Email or Password");
            }
            return;
        }
        res.render('login');
    }

    register(req, res, next) {
        res.render('register');
    }

}

module.exports = new siteController();
