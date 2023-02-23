import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query campaigns($username: String) {
    campaigns(username: $username) {
      _id
      username
      createdAt
      status
      scenarios
      investigators
      investStatus
      cities
      notes
    }
  }
`;

export const QUERY_CAMPAIGN = gql`
  query campaign($id: ID!) {
    campaign(_id: $id) {
      _id
      username
      createdAt
      status
      scenarios
      investigators
      investStatus
      cities
      notes
    }
  }
`;

export const QUERY_ME = gql`
{ 
  me {
    _id
    username
    email
    campaigns {
      _id
      createdAt
      status
      scenarios
      investigators
      investStatus
      cities
      notes
    }
  }
}
`;