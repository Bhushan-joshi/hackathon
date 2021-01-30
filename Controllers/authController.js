const User = require('../Models/User');
const crypto =require('bcrypt');

exports.getLogin = (req, res, next) => {
    res.render('Auth/index', {
        title: 'Agro',
        Error:null,
        olddata: {
            email: '',
            password: '',
        }
    });
};

exports.buyerRegister = (req, res, next) => {
    const { FName, LName, password, conPassword, Email } = req.body;
    if (password===conPassword) {
        console.log('password missmatch');
        return res.render('Auth/index', {
            title: 'Agro',
            Error:'password field must match',
            olddata: {
                email: Email,
                password: password,
                conpassword:conPassword,
                FName:FName,
                LName:LName,
            }
        });
    }
    User.findOne({ Email: Email }).then(user => {
        if (user) {
            console.log('mail taken');
            return res.render('Auth/index', {
                title: 'Agro',
                Error:'User exist with Email. Try with another Email!',
                olddata: {
                    email: Email,
                    password: password,
                    conpassword:conPassword,
                    FName:FName,
                    LName:LName,
                }
            });
        }
        //hashing password and storing it in database
        crypto.genSalt(13).then(salt => {
            crypto.hash(password, salt).then(hashPassword => {
                const newUser = new User({
                    firstName:FName,
                    lastName:LName,
                    Email: Email,
                    Password: hashPassword,
                    // Cart: { items: [] }  
                });
                newUser.save().then((user) => {
                    console.log('user:',user);
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

exports.sellerRegister = () => { }