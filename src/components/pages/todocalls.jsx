import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await axios.get(
      `${baseUrl}?_page=${page} &_limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// export const createTodos = async(id) => {
//      try {
//     const response = await axios.post(baseUrl),{
//         ...getTodos,
//         description: todo.desciption || " ",
//     };
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     throw error;
//   }
// }
// // Delete Todos
