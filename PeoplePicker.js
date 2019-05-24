import React, { useState } from 'react';
import { Picker } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PEOPLE_QUERY = gql`
  query peopleQuery {
    people {
      id
      firstName
      lastName
      description
      category {
        title
      }
    }
  }
`;

export default function PeoplePicker({ handleChange }) {
  const [pickerValue, setPickerValue] = useState();
  const { loading, data, error } = useQuery(PEOPLE_QUERY);
  if (loading || error) return null;
  return (
    <Picker
      mode="dropdown"
      selectedValue={pickerValue}
      style={{ height: 50, width: '100%', marginBottom: 20 }}
      onValueChange={(itemValue, itemIndex) => {
        handleChange(itemValue);
        setPickerValue(itemValue);
      }}
    >
      <Picker.Item label="Select an person..." value="0" />
      {data.people.map(person => {
        return (
          <Picker.Item
            key={person.id}
            label={`${person.firstName} ${person.lastName}`}
            value={person.id}
          />
        );
      })}
    </Picker>
  );
}
