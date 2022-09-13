import { gql } from '@apollo/client';
import { UserItem } from '../users/users-model';

export interface MutationDataResponse {
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

export interface QueryDataResponse {
  users: {
    __typename: string,
    count: number,
    pageInfo: {
      __typename: string,
      hasNextPage: boolean,
      hasPreviousPage: boolean,
      offset: number
    },
    nodes: Array<never>
  }
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

export const listUsersQuerry = gql`
query ListUsers($pageInfo: PageInputType) {
  users(pageInfo: $pageInfo) {
    count
    pageInfo{
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