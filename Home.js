import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

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
  const { loading, data, error } = useQuery(USER_QUERY);
  if (loading || error) return null;
  return (
    <FlatList
      style={{ zIndex: 1 }}
      data={data.users}
      keyExtractor={({ id }) => id}
      renderItem={({ item: user }) => (
        <List.Item
          description="Item description"
          title={user.email}
          left={props => <List.Icon {...props} icon="person" />}
          key={user.id}
        />
      )}
    />
  );
}
