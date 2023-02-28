const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        campaigns: [Campaign]
    }
    type Campaign {
        _id: ID
        createdAt: String
        status: String
        scenarios: [String]
        scenarioCount: Int
        investigators: [Investigator]
        cities: String
        notes: String
    }

    type Investigator {
        _id: ID
        name: String!
        status: String
        personalStory: String
        darkPact: Boolean
        promisePower: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        campaigns: [Campaign]
        campaign(_id: ID!): Campaign
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCampaign(username: String!, createdAt: String, scenarios: [String], status: String, investigators: [String], cities: [String], notes: String): Campaign
        addInvestigator(campaignId: ID!, name: String!, status: String, personalStory: String, darkPact: Boolean, promisePower: Boolean): Campaign
        addScenario(campaignId: ID!, scenario: String): Campaign
        editCampaign(_id: ID!, scenarios: [String], status: String, investigators: [String], cities: [String], notes: String): Campaign
        deleteCampaign(_id: ID!): User
    }
`;

module.exports = typeDefs;