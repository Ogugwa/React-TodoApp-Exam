import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async () => {
  try {
    const getResponse = await axios.get(baseUrl);
    return getResponse.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const postTodos = async(id) => {
     try {
    const postResponse = await axios.post(baseUrl),{
        ...getTodos,
        description: todo.desciption || " ",
    };
    return postResponse.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}
