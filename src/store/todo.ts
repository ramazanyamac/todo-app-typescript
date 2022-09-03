import { defineStore } from "pinia";
import { Task } from "../models/task";
import { generateID } from "../utils";

interface TodoState {
  tasks: Task[];
  loading: boolean;
}

export const useTodoStore = defineStore({
  id: "todo",
  state: (): TodoState => ({
    tasks: [],
    loading: false,
  }),
  persist: {
    paths: ["tasks"],
  },
  actions: {
    async addTask(name: string): Promise<void> {
      this.tasks.push({ name, done: false, id: generateID() });
    },
    async deleteTask(id: string): Promise<void> {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    async updateTask(id: string): Promise<void> {
      const task = this.tasks.find((task) => task.id === id);

      if (task) {
        task.done = !task.done;
      }
    },
  },
});
