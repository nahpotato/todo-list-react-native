import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, TextInput } from 'react-native-paper';

import type { Task } from '~/database/schema';

interface BaseProps {
  visible: boolean;
  onDismiss(): void;
  onSave(description: string): void;
}

interface CreationProps {
  formType: 'creation';
}

interface EditionProps {
  formType: 'edition';
  task: Task;
}

type TaskFormDialogProps = BaseProps & (CreationProps | EditionProps);

export default function TaskFormDialog(props: TaskFormDialogProps) {
  const { visible, formType, onDismiss, onSave } = props;

  const [description, setDescription] = useState(
    formType === 'edition' ? props.task.description : '',
  );

  function handleDismiss() {
    if (formType === 'creation') setDescription('');
    onDismiss();
  }

  function handleSave() {
    if (formType === 'creation') setDescription('');
    onSave(description);
    onDismiss();
  }

  return (
    <Dialog visible={visible} onDismiss={handleDismiss}>
      <Dialog.Icon icon="task-alt" />

      <Dialog.Title style={styles.title}>
        {{ creation: 'Nueva tarea', edition: 'Editar tarea' }[formType]}
      </Dialog.Title>

      <Dialog.Content>
        <TextInput
          autoFocus
          mode="outlined"
          placeholder="Tarea sin nombre"
          value={description}
          onChangeText={setDescription}
          style={styles.textInput}
        />
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={handleDismiss}>Cancelar</Button>
        <Button onPress={handleSave} disabled={description.length <= 0}>
          Guardar
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  title: { textAlign: 'center' },
  textInput: { backgroundColor: 'transparent' },
});
