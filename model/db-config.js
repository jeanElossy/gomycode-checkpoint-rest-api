const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/node-api-rest',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },

    (err) => {
        !err ? console.log(`mongoDB connected`) : console.log(`mongoDB disconnected ${err}`)
    }
)

