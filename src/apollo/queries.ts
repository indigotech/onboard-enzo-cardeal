import { gql } from '@apollo/client';

export const listUsersQuery = gql`
  query ListUsers($pageInfo: PageInputType) {
    users(pageInfo: $pageInfo) {
      count
      pageInfo {
        offset
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        email
        name
      }
    }
  }
`;

export const userQuery = gql`
  query User($ID: ID!) {
    user(id: $ID) {
      name
      phone
      birthDate
      email
      role
    }
  }
`;
