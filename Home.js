import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Text, FlatList, View } from 'react-native';
import {
  Avatar,
  Headline,
  Card,
  Title,
  Paragraph,
  Button,
} from 'react-native-paper';
import CreateEvent from './CreateEvent';

const PEOPLE_QUERY = gql`
  {
    people {
      id
      firstName
      lastName
      description
      createdAt
      updatedAt
    }
  }
`;

export default function Home(props) {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const { loading, data, error } = useQuery(PEOPLE_QUERY);
  if (loading || error) return null;
  const nextPerson = data.people[0];
  return (
    <>
      <Headline
        style={{ textAlign: 'center', marginBottom: 30, marginTop: 30 }}
      >
        Up Next
      </Headline>
      <View>
        <Card>
          <Card.Content>
            <Title>{`${nextPerson.firstName} ${nextPerson.lastName}`}</Title>
            <Paragraph>{nextPerson.description}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button
              icon="event"
              style={{ textAlign: 'right' }}
              onPress={() => setOpenCreateEvent(true)}
            >
              Create Event
            </Button>
          </Card.Actions>
        </Card>
        <CreateEvent
          open={openCreateEvent}
          handleClose={() => setOpenCreateEvent(false)}
          history={props.history}
        />
      </View>
    </>
  );
}
