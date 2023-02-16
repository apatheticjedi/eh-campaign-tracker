const { Schema, model } = require('mongoose');

// Schema for campaigns that includes comments
const campaignSchema = new Schema(
    {
        scenarios: [
            {
                type: String,
            }
        ],
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        status: {
            type: String
        },
        investigators: [
            {
                type: String
            }
        ],
        investStatus: [
            {
                type: String,
            }
        ],
        cities: {
            type: String
        },
        notes: {
            type: String
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;