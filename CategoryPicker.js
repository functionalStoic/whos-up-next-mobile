import React, { useState } from 'react';
import { Picker } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CATEGORY_QUERY = gql`
  {
    categories {
      id
      title
      description
    }
  }
`;

export default function CategoryPicker({ handleChange }) {
  const [pickerValue, setPickerValue] = useState();
  const { loading, data, error } = useQuery(CATEGORY_QUERY);
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
      <Picker.Item label="Please select an option..." value="0" />
      {data.categories.map(category => {
        return (
          <Picker.Item
            key={category.id}
            label={category.title}
            value={category.id}
          />
        );
      })}
    </Picker>
  );
}
