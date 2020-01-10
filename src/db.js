const mongoose = require('mongoose');

// --== Config ==--
let connect = "mongodb://localhost/login"

mongoose.set('useFindAndModify', false);
mongoose.connect(connect, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("db conectado"))
.catch(err => console.log(err)) 