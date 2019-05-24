import React, { useState } from 'react';
import { FAB, Portal, Modal } from 'react-native-paper';
import CreatePerson from './CreatePerson';

export default function MyFAB() {
  const [open, setOpen] = useState(false);
  const [openCreatePerson, setOpenCreatePerson] = useState(false);

  return (
    <Portal>
      <FAB.Group
        fabStyle={{ zIndex: 999 }}
        open={open}
        icon={open ? 'close' : 'add'}
        actions={[
          {
            icon: 'event',
            label: 'Add Event',
            onPress: () => console.log('Pressed notifications'),
          },
          {
            icon: 'people',
            label: 'Add People',
            onPress: () => setOpenCreatePerson(true),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
      <CreatePerson
        open={openCreatePerson}
        handleClose={() => setOpenCreatePerson(false)}
      />
    </Portal>
  );
}
