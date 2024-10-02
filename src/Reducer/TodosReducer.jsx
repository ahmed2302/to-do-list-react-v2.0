import { v4 as uuidv4 } from "uuid";

export function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "addTodo": {
      const { todoInput } = action.payload;
      // if (!todoInput.title.trim()) return [];

      const newTodo = {
        id: uuidv4(),
        title: todoInput.title,
        body: todoInput.body,
        isComplete: false,
      };

      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "deleteTodo": {
      const { todo } = action.payload;
      const updatedTodos = currentTodos.filter((t) => t.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "editTodo": {
      const { todo } = action.payload;
      const updatedTodos = currentTodos.map((t) =>
        t.id === todo.id ? { ...t, title: todo.title, body: todo.body } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "switchState": {
      const { todo } = action.payload;
      const updatedTodos = currentTodos.map((t) =>
        t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    default: {
      throw new Error("Unknown Action: " + action.type);
    }
  }
}
