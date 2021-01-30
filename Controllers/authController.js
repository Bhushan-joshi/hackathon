/**
 * TODO : add Your controller functions 
 */
exports.getLogin = (req, res, next) => {
    res.render('Auth/index', {
        path: 'auth/login',
        title: 'Agro',
        // Message: req.flash('loginError'),
        olddata: {
            email: '',
            password: '',
        }
    });
};

exports.buyerRegister=(req,res,next)=>{
    const {}=req.body;
}

exports.sellerRegister=()=>{}