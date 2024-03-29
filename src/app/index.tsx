import { useEffect, useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  SectionList,
} from 'react-native';
import { AnimatedFAB, Appbar, Portal, Text } from 'react-native-paper';

import { EmptyView, ErrorView, LoadingView, TaskRow } from '~/components';
import { Task } from '~/database/schema';
import { TaskFormDialog } from '~/dialogs';
import { useStore } from '~/store';
import {
  addTask,
  deleteTask,
  loadTasks,
  toggleTask,
  updateTask,
} from '~/store/actions';

export default function Page() {
  const status = useStore((state) => state.status);
  const tasks = useStore((state) => state.tasks);
  const error = useStore((state) => state.error);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [appbarElevated, setAppbarElevated] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(true);

  const [creationDialogVisible, setCreationDialogVisible] = useState(false);

  const [editionDialogVisible, setEditionDialogVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    loadTasks();
  }, []);

  function getSections() {
    const sections = [];

    const pendingTasks = tasks.filter((task) => !task.completed);
    if (pendingTasks.length > 0) {
      sections.push({ title: 'Pendientes', data: pendingTasks });
    }

    const completedTasks = tasks.filter((task) => task.completed);
    if (completedTasks.length > 0) {
      sections.push({ title: 'Completadas', data: completedTasks });
    }

    return sections;
  }

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollPosition(e.nativeEvent.contentOffset.y);

    const scrollAtTop = Math.floor(e.nativeEvent.contentOffset.y) <= 0;
    setAppbarElevated(!scrollAtTop);

    const scrollDelta = scrollPosition - e.nativeEvent.contentOffset.y;
    if (Math.abs(scrollDelta) > 5) {
      setFabExpanded(scrollAtTop || Math.floor(scrollDelta) > 0);
    }
  }

  function handleTaskRowEdit(task: Task) {
    setSelectedTask(task);
    setEditionDialogVisible(true);
  }

  function handleEditionDialogDismiss() {
    setEditionDialogVisible(false);
    setSelectedTask(undefined);
  }

  return (
    <>
      <Appbar.Header elevated={appbarElevated}>
        <Appbar.Content title="Lista de tareas" />
      </Appbar.Header>

      {status === 'loading' && <LoadingView />}
      {status === 'success' && tasks.length <= 0 && <EmptyView />}
      {status === 'failure' && <ErrorView error={error} />}

      {status === 'success' && tasks.length > 0 && (
        <SectionList
          sections={getSections()}
          keyExtractor={(item) => `${item.id}`}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          renderSectionHeader={({ section }) => (
            <Text variant="labelLarge" style={styles.sectionHeader}>
              {section.title}
            </Text>
          )}
          renderItem={({ item }) => (
            <TaskRow
              task={item}
              onEdit={() => handleTaskRowEdit(item)}
              onDelete={() => deleteTask(item.id)}
              onToggled={() => toggleTask(item.id)}
            />
          )}
        />
      )}

      <AnimatedFAB
        icon="add-task"
        label="Nueva tarea"
        style={styles.fab}
        extended={fabExpanded}
        onPress={() => setCreationDialogVisible(true)}
      />

      <Portal>
        <TaskFormDialog
          formType="creation"
          visible={creationDialogVisible}
          onDismiss={() => setCreationDialogVisible(false)}
          onSave={addTask}
        />
        {selectedTask && (
          <TaskFormDialog
            formType="edition"
            visible={editionDialogVisible}
            onDismiss={handleEditionDialogDismiss}
            task={selectedTask}
            onSave={(description) => updateTask(selectedTask.id, description)}
          />
        )}
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { paddingVertical: 8, paddingHorizontal: 16 },
  fab: { bottom: 16, right: 16 },
});
