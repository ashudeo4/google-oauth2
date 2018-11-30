const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./config/passport')(passport);
const auth = require('./routes/auth');
const keys = require('./config/keys');
const User = require('./models/user');


mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Mongodb connected")
    })
    .catch(err => {
        console.log(err);

    });
const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'serc',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
const port = process.env.PORT || 3000;
app.use('/auth', auth);
app.get('/', (req, res) => {
    res.send('ok');
})



app.listen(port, () => {
    console.log(`Server has started on ${port}`);

})