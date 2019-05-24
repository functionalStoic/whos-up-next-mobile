import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const EVENTS_QUERY = gql`
  {
    events {
      id
      title
      description
      people {
        id
        firstName
        lastName
      }
    }
  }
`;

export default function Home() {
  const { loading, data, error } = useQuery(EVENTS_QUERY);
  if (loading || error) return null;
  return (
    <FlatList
      data={data.events}
      keyExtractor={({ id }) => id}
      renderItem={({ item: event }) => (
        <List.Item
          description={event.description}
          title={event.title}
          left={props => <List.Icon {...props} icon="event" />}
          key={event.id}
        />
      )}
    />
  );
}
