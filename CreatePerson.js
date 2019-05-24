import * as React from 'react';
import { Modal, Portal, TextInput, Headline, Button } from 'react-native-paper';
import { Text, Picker, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CategoryPicker from './CategoryPicker';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const formSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.number()
    .min(1)
    .required('Category is required'),
});

const CREATE_PERSON = gql`
  mutation CreatePerson(
    $firstName: String!
    $lastName: String!
    $description: String!
    $category: ID!
  ) {
    createPerson(
      firstName: $firstName
      lastName: $lastName
      description: $description
      category: $category
    ) {
      person {
        id
      }
    }
  }
`;

export default function CreatePerson({ open, handleClose }) {
  const [createPerson, { error, data }] = useMutation(CREATE_PERSON, {
    refetchQueries: ['peopleQuery'],
  });

  return (
    <Portal>
      <Modal
        contentContainerStyle={{
          justifyContent: 'flex-start',
          height: '100%',
          backgroundColor: '#FFFFFF',
        }}
        visible={open}
      >
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            description: '',
            category: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values, formikActions) => {
            createPerson({ variables: values });
            handleClose();
          }}
        >
          {props => (
            <View style={{ padding: 20 }}>
              <Headline style={{ paddingBottom: 20 }}>Add Person</Headline>
              <TextInput
                style={{ backgroundColor: '#ffffff', marginBottom: 10 }}
                label="First Name"
                value={props.touched.firstName && props.values.firstName}
                error={props.errors.firstName}
                onChangeText={props.handleChange('firstName')}
                onBlur={props.handleBlur('firstName')}
              />
              <TextInput
                style={{ backgroundColor: '#ffffff', marginBottom: 10 }}
                label="Last Name"
                error={props.touched.lastName && props.errors.lastName}
                value={props.values.lastName}
                onChangeText={props.handleChange('lastName')}
                onBlur={props.handleBlur('lastName')}
              />
              <TextInput
                style={{ backgroundColor: '#ffffff', marginBottom: 10 }}
                label="Description"
                error={props.touched.description && props.errors.description}
                value={props.values.description}
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
              />
              <CategoryPicker handleChange={props.handleChange('category')} />
              <Button
                icon="save"
                mode="outlined"
                style={{ marginBottom: 20 }}
                onPress={props.handleSubmit}
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              >
                Submit
              </Button>
              <Button icon="close" mode="contained" onPress={handleClose}>
                Cancel
              </Button>
            </View>
          )}
        </Formik>
      </Modal>
    </Portal>
  );
}
