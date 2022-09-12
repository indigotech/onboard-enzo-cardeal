import { gql } from '@apollo/client';

export interface DataResponse {
  login: {
    __typename: string;
    token: string;
    user: {
      __typename: string;
      id: string;
    };
  };
}

export interface ErrorResponse {
  message: string;
}

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
