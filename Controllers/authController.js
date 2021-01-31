const User = require('../Models/User');
const crypto = require('bcrypt');

exports.getIndex = (req, res, next) => {
    if (req.user) {
        return res.redirect(307,'/app')
    }
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
    if (password !== conPassword) {
        console.log('password missmatch');
        return res.render('Auth/index', {
            title: 'Agro',
            Error: 'password field must match',
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
                    res.redirect('/login');
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

exports.sellerRegister = (req,res) => {;
    const { FName, LName, password, conPassword, Email,aadhaar } = req.body;
    if (password !== conPassword) {
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
                    isBuyer:false,
                    aadhaar:aadhaar,
                    Cart: { items: [] }
                });
                newUser.save().then((user) => {
                    res.redirect('/login');
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
    if (req.user) {
        return res.redirect(307,'/app')
    }
    res.render('Auth/login', {
        title: 'Agro',
        Error: null,
    });
}

exports.postLogin = (req, res, next) => {
    const password = req.body.password;
    User.findOne({ Email: req.body.Email }).then(user => {
        if (!user) {
            return res.status(422).render('Auth/login', {
                title: 'Agro',
                Error: 'Wrong Email or Password!',
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
                    res.redirect('/app');
                });
            } else {
                res.redirect('/auth/login',{
                    title: 'Agro',
                    Error: 'Wrong Email or Password!',
                    olddata: {
                        email:  req.body.email,
                        password:  req.body.password,
                    }
                });
            }
        }).catch(err => {
            if (err) { console.log(err); }
        });
    });
};


exports.postLogout=(req,res,next)=>{
        req.session.destroy();
        res.redirect('/login');
        next();
};