const { Schema } = require('mongoose');

const investigatorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String
        },
        personalStory: {
            type: String
        },
        darkPact: {
            type: Boolean
        },
        promisePower: {
            type: Boolean
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = investigatorSchema;