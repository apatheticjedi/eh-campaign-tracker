const mongoose = require('mongoose');

// connect to localhost if not deployed on heroku
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/eh-campaign-tracker',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;