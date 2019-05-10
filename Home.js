import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text } from 'react-native';

const USER_QUERY = gql`
  {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export default function Home() {
  return (
    <Query query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return data.users.map(user => <Text>{user.email}</Text>);
      }}
    </Query>
  );
}
