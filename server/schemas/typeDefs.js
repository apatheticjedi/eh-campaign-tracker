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
        scenarios: String
        status: String
        investigators: [String]
        investStatus: String
        cities: String
        notes: String
        
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
        addCampaign(username: String!, createdAt: String, scenarios: String!, status: String!, investigators: [String], investStatus: String!, cities: String, notes: String): Campaign
        editCampaign(_id: ID!, scenarios: String!, status: String!, investigators: [String], investStatus: String!, cities: String, notes: String): Campaign
        deleteCampaign(_id: ID!): User

    }

`;

module.exports = typeDefs;