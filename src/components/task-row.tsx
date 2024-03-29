import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Checkbox,
  IconButton,
  Menu,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import type { Task } from '~/database/schema';

interface TaskRowProps {
  onEdit?(): void;
  onDelete?(): void;
  onToggled?(): void;
  task: Task;
}

export default function TaskRow(props: TaskRowProps) {
  const { task, onToggled, onEdit, onDelete } = props;

  const [menuVisible, setMenuVisible] = useState(false);

  function handleEdit() {
    setMenuVisible(false);
    onEdit?.();
  }

  function handleDelete() {
    setMenuVisible(false);
    onDelete?.();
  }

  return (
    <TouchableRipple onPress={onToggled}>
      <View style={styles.container}>
        <Checkbox status={task.completed ? 'checked' : 'unchecked'} />

        <Text
          variant="bodyLarge"
          style={[
            styles.label,
            {
              textDecorationLine: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1.0,
            },
          ]}
        >
          {task.description}
        </Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <IconButton
              icon="more-vert"
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item title="Editar" onPress={handleEdit} />
          <Menu.Item title="Eliminar" onPress={handleDelete} />
        </Menu>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    columnGap: 16,
  },
  label: { flex: 1 },
  menuButton: { margin: 0 },
});
