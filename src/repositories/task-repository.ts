import { eq } from 'drizzle-orm';

import db from '~/database';
import { type Task, tasks } from '~/database/schema';

let notifyListeners: () => void;

export async function* getTasks() {
  yield await db.select().from(tasks);

  while (true) {
    await new Promise<void>((resolve) => (notifyListeners = resolve));
    yield await db.select().from(tasks);
  }
}

export async function getTaskById(id: number) {
  const result = await db.select().from(tasks).where(eq(tasks.id, id));
  return result.length > 0 ? result[0] : undefined;
}

export async function addTask(description: string) {
  await db.insert(tasks).values({ description });
  notifyListeners();
}

export async function updateTask({ id, ...values }: Task) {
  await db.update(tasks).set(values).where(eq(tasks.id, id));
  notifyListeners();
}

export async function deleteTask(id: number) {
  await db.delete(tasks).where(eq(tasks.id, id));
  notifyListeners();
}
