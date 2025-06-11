import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data; // Returns the array of todos
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Re-throw so React Query can catch it
  }
};

// Get a single todo by ID
export const getTodo = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/todos`, {
      ...todo,
      description: todo.description || "", // Add description field
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id, todo) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
      ...todo,
      description: todo.description || "", // Add description field
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
    return id; // Return the ID of the deleted todo
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
