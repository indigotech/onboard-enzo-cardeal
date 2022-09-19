import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($data: LoginInputType!) {
    login(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const createUserMutation = gql`
  mutation CreateUser($data: UserInputType!) {
    createUser(data: $data) {
      id
      email
      role
    }
  }
`;
