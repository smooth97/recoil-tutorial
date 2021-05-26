import React from "react";
import { useRecoilValue } from "recoil";
import { filteredTodoListState, todoListStatsState } from "../atoms/todos";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilter from "./TodoListFilter";

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <div>
      <TodoListFilter />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </div>
  );
};

export default TodoList;
