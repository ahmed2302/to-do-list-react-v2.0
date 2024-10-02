import { createContext, useContext, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
import { TodosReducer } from "../Reducer/TodosReducer";

const TodoContext = createContext("");

// const initial = [
//   {
//     id: uuidv4(),
//     title: "شراء مستلزمات المنزل",
//     body: "شراء الخضروات والفواكه والأدوات المنزلية من السوق.",
//     isComplete: false,
//   },
//   {
//     id: uuidv4(),
//     title: "الذهاب إلى الطبيب",
//     body: "موعد مع طبيب الأسنان الساعة 3 مساءً.",
//     isComplete: true,
//   },
//   {
//     id: uuidv4(),
//     title: "إتمام مشروع العمل",
//     body: "إكمال المهام المتبقية من المشروع وتقديم التقرير النهائي.",
//     isComplete: false,
//   },
//   {
//     id: uuidv4(),
//     title: "ممارسة الرياضة",
//     body: "الذهاب إلى الجيم لمدة ساعة لممارسة التمارين الرياضية.",
//     isComplete: true,
//   },
//   {
//     id: uuidv4(),
//     title: "الاجتماع مع الفريق",
//     body: "الاجتماع مع فريق العمل لمناقشة الخطط المستقبلية.",
//     isComplete: false,
//   },
// ];

export default function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(
    TodosReducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
      }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(TodoContext);
};
