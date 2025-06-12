import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async ({ page = 1, limit = 10, sort, order }) => {
  try {
    const params = new URLSearchParams({
      _sort: sort || "id",
      _order: order || "desc",
    });
    const response = await axios.get(
      `${baseUrl}?_page=${page}&_limit=${limit}&${params}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const createTodos = async (newTodo) => {
  try {
    const response = await axios.post(baseUrl, {
      ...newTodo,
      completed: false,
      description: newTodo.description || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};
// Update Todos
export const updateTodos = async (id, newTodo) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, {
      ...newTodo,
      description: newTodo.description || "", // correct this reference
      userId: 1, // optional if your API needs it
    });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
// // Delete Todos
export const deleteTodos = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
