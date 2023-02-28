const { Schema, model } = require('mongoose');
const investigatorSchema = require('./Investigator');

// Schema for campaigns that includes comments
const campaignSchema = new Schema(
    {
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
        scenarios: [
            {
                type: String,
            }
        ],
        investigators: [investigatorSchema],
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

campaignSchema.virtual('scenarioCount').get(function() {
    return this.scenarios.length;
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;