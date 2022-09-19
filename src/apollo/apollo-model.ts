import { gql } from '@apollo/client';

export interface LoginMutationDataResponse {
  login: {
    __typename: string;
    token: string;
    user: {
      __typename: string;
      id: string;
    };
  };
}

export interface AddUserMutationDataResponse {
  login: {
    __typename: string;
    id: string;
    email: string;
    role: string;
  };
}

export interface ErrorResponse {
  message: string;
}

export interface QueryDataResponse {
  users: {
    __typename: string;
    count: number;
    pageInfo: {
      __typename: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      offset: number;
    };
    nodes: Array<never>;
  };
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

export const createUserMutation = gql`
  mutation CreateUser($data: UserInputType!) {
    createUser(data: $data) {
      id
      email
      role
    }
  }
`;

export const listUsersQuerry = gql`
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
