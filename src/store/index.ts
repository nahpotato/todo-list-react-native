import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Task } from '~/database/schema';

type Status = 'initial' | 'loading' | 'success' | 'failure';
interface TaskState {
  status: Status;
  tasks: Task[];
  error?: unknown;
}

export const useStore = create<TaskState>()(
  immer(
    devtools((): TaskState => {
      return {
        status: 'initial',
        tasks: [],
        error: undefined,
      };
    }),
  ),
);
