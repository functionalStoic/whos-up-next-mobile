import * as React from 'react';
import { Modal, Portal, TextInput, Headline, Button } from 'react-native-paper';
import { Text, Picker, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PeoplePicker from './PeoplePicker';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $people: [GenericIdInput!]
  ) {
    createEvent(title: $title, description: $description, people: $people) {
      event {
        id
      }
    }
  }
`;

function CreateEvent({ open, handleClose, history }) {
  const [createEvent, { error, data }] = useMutation(CREATE_EVENT, {
    refetchQueries: ['eventQuery'],
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
            title: '',
            description: '',
          }}
          validationSchema={formSchema}
          onSubmit={(values, formikActions) => {
            createEvent({
              variables: { ...values, people: [{ id: values.people }] },
            });
            handleClose();
            history.push('/events');
          }}
        >
          {props => (
            <View style={{ padding: 20 }}>
              <Headline style={{ paddingBottom: 20 }}>Add Event</Headline>
              <TextInput
                style={{ backgroundColor: '#ffffff', marginBottom: 10 }}
                label="Title"
                value={props.touched.title && props.values.title}
                error={props.errors.title}
                onChangeText={props.handleChange('title')}
                onBlur={props.handleBlur('title')}
              />
              <TextInput
                style={{ backgroundColor: '#ffffff', marginBottom: 10 }}
                label="Description"
                error={props.touched.description && props.errors.description}
                value={props.values.description}
                onChangeText={props.handleChange('description')}
                onBlur={props.handleBlur('description')}
              />

              <PeoplePicker handleChange={props.handleChange('people')} />
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

export default CreateEvent;
