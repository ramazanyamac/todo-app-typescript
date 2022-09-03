<script setup lang="ts">
import { ref } from "vue-demi";
import { useTodoStore } from "./store/todo";

// ref
const taskName = ref("");

// store
const todoStore = useTodoStore();

function createTask(): void {
  todoStore.addTask(taskName.value);
  taskName.value = "";
}

function deleteTask(id: string): void {
  todoStore.deleteTask(id);
}

function updateTask(id: string): void {
  todoStore.updateTask(id);
}
</script>

<template>
  <div
    class="container max-w-screen-lg mr-auto ml-auto rounded-md shadow-2xl bg-white p-8 mt-10"
  >
    <h1 class="font-medium leading-tight text-5xl mt-0 mb-4 text-blue-600">
      All Tasks
    </h1>

    <form @submit.prevent="createTask" class="form">
      <div class="mb-6">
        <input
          type="text"
          placeholder="Add new task"
          v-model="taskName"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p
          class="mt-2 text-sm text-red-600 dark:text-red-500"
          v-show="!todoStore.tasks.length"
        >
          Nothing to do
        </p>
      </div>
    </form>

    <ul
      class="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400"
      v-show="todoStore.tasks.length"
    >
      <li
        class="flex items-center space-x-3"
        v-for="todo in todoStore.tasks"
        :key="todo.id"
      >
        <!-- Checkbox  -->
        <div class="flex items-center mb-4 gap-3">
          <input
            type="checkbox"
            :id="todo.id"
            :checked="todo.done"
            @change="updateTask(todo.id)"
            class="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            :for="todo.id"
            :class="todo.done && 'line-through'"
            class="text-md font-medium text-gray-900 dark:text-gray-300"
            >{{ todo.name }}</label
          >
          <button
            @click.prevent="deleteTask(todo.id)"
            type="button"
            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.66667 3.33333L6.25 1H9.75L10.3333 3.33333M15 3.33333H2.16667L3.33333 17.3333H12.6667L13.8333 3.33333H1H15ZM8 6.83333V13.8333V6.83333ZM10.9167 6.83333L10.3333 13.8333L10.9167 6.83333ZM5.08333 6.83333L5.66667 13.8333L5.08333 6.83333Z"
                stroke="#FF0000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
$primary-color: #ea5959;
$gray-color: #f3f3f3;
$base-color: #525252;
$white-color: #fff;
$border: 8px;

.custom-checkbox {
  $block: &;

  cursor: pointer;
  display: flex;
  align-items: center;

  &__input {
    position: absolute;
    width: 1.375em;
    height: 1.375em;
    opacity: 0;
    cursor: pointer;

    &:checked + #{$block}__icon .tick {
      stroke-dashoffset: 0;
    }
  }

  &__icon {
    width: 1.375em;
    height: 1.375em;
    flex-shrink: 0;
    overflow: visible;

    .tick {
      stroke-dasharray: 20px;
      stroke-dashoffset: 20px;
      transition: stroke-dashoffset 0.2s ease-out;
    }
  }

  &__label {
    margin-left: 0.5em;

    &--done {
      text-decoration: line-through;
    }
  }
}

.task-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  .task-item {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__button {
      outline: none;
      cursor: pointer;
      background: transparent;
      border: none;
    }
  }
}
</style>
