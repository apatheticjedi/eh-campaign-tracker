import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
          token
          user {
            email
            password
            username  
          }
        }
    }`;

export const ADD_CAMPAIGN = gql`
    mutation addCampaign($status: String, $scenarios: String, $investigators: String, $cities: String, $notes: String)
    {
        addCampaign(status: $status, scenarios: $scenarios, investigators: $investigators, cities: $cities, notes: $notes) {
            _id
            createdAt
            status
            scenarios
            investigators
            cities
            notes
        }
    }`;

