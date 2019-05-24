import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Text, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const EVENTS_QUERY = gql`
  query eventQuery {
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

export default function Events() {
  const { loading, data, error } = useQuery(EVENTS_QUERY);
  if (loading || error) return null;
  return (
    <FlatList
      data={data.events}
      keyExtractor={({ id }) => id}
      renderItem={({ item: event }) => {
        return (
          <List.Item
            description={`${event.description} with ${
              event.people[0].firstName
            } ${event.people[0].lastName}`}
            title={event.title}
            left={props => <List.Icon {...props} icon="event" />}
            key={event.id}
          />
        );
      }}
    />
  );
}
