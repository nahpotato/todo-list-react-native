import { taskRepository } from '~/repositories';
import { useStore as store } from '~/store';

export async function loadTasks() {
  store.setState({ status: 'loading' });

  try {
    for await (const tasks of taskRepository.getTasks())
      store.setState({ status: 'success', tasks: [...tasks] });
  } catch (error: unknown) {
    store.setState({ status: 'failure', error });
  }
}

export async function addTask(description: string) {
  await taskRepository.addTask(description);
}

export async function updateTask(id: number, description: string) {
  const task = await taskRepository.getTaskById(id);

  if (task !== undefined) {
    await taskRepository.updateTask({ ...task, description });
  }
}

export async function toggleTask(id: number) {
  const task = await taskRepository.getTaskById(id);

  if (task !== undefined) {
    const completed = !task.completed;
    await taskRepository.updateTask({ ...task, completed });
  }
}

export async function deleteTask(id: number) {
  await taskRepository.deleteTask(id);
}
