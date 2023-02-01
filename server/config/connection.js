const mongoose = require('mongoose');

// connect to localhost if not deployed on heroku
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eh-campaign-tracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;