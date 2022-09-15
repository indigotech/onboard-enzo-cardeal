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

export interface UsersListQueryDataResponse {
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

export interface UserQueryDataResponse {
  user: {
    __typename: string;
    birthDate: string;
    email: string;
    name: string;
    phone: string;
    role: string;
  };
}
