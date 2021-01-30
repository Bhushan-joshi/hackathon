const User = require('../Models/User');
const crypto = require('bcrypt');

exports.getIndex = (req, res, next) => {
    res.render('Auth/index', {
        title: 'Agro',
        Error: null,
        olddata: {
            email: '',
            password: '',
        }
    });
};

exports.buyerRegister = (req, res, next) => {
    const { FName, LName, password, conPassword, Email } = req.body;
    if (password === conPassword) {
        console.log('password missmatch');
        return res.render('Auth/index', {
            title: 'Agro',
            Error: 'password field must match',
            olddata: {
                email: Email,
                password: password,
                conpassword: conPassword,
                FName: FName,
                LName: LName,
            }
        });
    }
    User.findOne({ Email: Email }).then(user => {
        if (user) {
            console.log('mail taken');
            return res.render('Auth/index', {
                title: 'Agro',
                Error: 'User exist with Email. Try with another Email!',
                olddata: {
                    email: Email,
                    password: password,
                    conpassword: conPassword,
                    FName: FName,
                    LName: LName,
                }
            });
        }
        //hashing password and storing it in database
        crypto.genSalt(13).then(salt => {
            crypto.hash(password, salt).then(hashPassword => {
                const newUser = new User({
                    firstName: FName,
                    lastName: LName,
                    Email: Email,
                    Password: hashPassword,
                    Cart: { items: [] }
                });
                newUser.save().then((user) => {
                    console.log('user:', user);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
}

exports.sellerRegister = () => {
    const { FName, LName, password, conPassword, Email } = req.body;
    if (password === conPassword) {
        console.log('password missmatch');
        return res.render('Auth/index', {
            title: 'Agro',
            Error: 'password field must match',
            olddata: {
                email: Email,
                password: password,
                conpassword: conPassword,
                FName: FName,
                LName: LName,
            }
        });
    }
    User.findOne({ Email: Email }).then(user => {
        if (user) {
            console.log('mail taken');
            return res.render('Auth/index', {
                title: 'Agro',
                Error: 'User exist with Email. Try with another Email!',
                olddata: {
                    email: Email,
                    password: password,
                    conpassword: conPassword,
                    FName: FName,
                    LName: LName,
                }
            });
        }
        //hashing password and storing it in database
        crypto.genSalt(13).then(salt => {
            crypto.hash(password, salt).then(hashPassword => {
                const newUser = new User({
                    firstName: FName,
                    lastName: LName,
                    Email: Email,
                    Password: hashPassword,
                    Cart: { items: [] }
                });
                newUser.save().then((user) => {
                    console.log('user:', user);
                });
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
}

exports.getLogin = (req, res, next) => {
    res.render('Auth/login', {
        title: 'Agro',
        Error: null,
        olddata: {
            email: '',
            password: '',
        }
    });
}

exports.postLogin = (req, res, next) => {
    const password = req.body.password;
    User.findOne({ Email: req.body.email }).then(user => {
        if (!user) {
            return res.status(422).render('Auth/login', {
                title: 'Agro',
                Error: 'No Email id Found',
                olddata: {
                    email:  req.body.email,
                    password:  req.body.password,
                }
            });
        }
        crypto.compare(password, user.Password).then(domatch => {
            if (domatch) {
                req.session.user = user;
                req.session.isLoggedin = true;
                req.session.save(err => {
                    if (err) { console.log(err); }
                    req.flash('successlogin', 'Login Successfully!');
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Invalid Email or Password!');
                res.redirect('/auth/login');
            }
        }).catch(err => {
            if (err) { console.log(err); }
        });
    });
};
