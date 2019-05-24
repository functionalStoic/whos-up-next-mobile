import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const PEOPLE_QUERY = gql`
  query peopleQuery {
    people {
      id
      firstName
      description
      category {
        title
      }
    }
  }
`;

export default function People() {
  const { loading, data, error } = useQuery(PEOPLE_QUERY);
  if (loading || error) return null;
  return (
    <FlatList
      data={data.people}
      keyExtractor={({ id }) => id}
      renderItem={({ item: person }) => (
        <List.Item
          description={person.description}
          title={person.firstName}
          left={props => <List.Icon {...props} icon="person" />}
          key={person.id}
        />
      )}
    />
  );
}
