import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

//  Define the shape of a Todo
 export interface Todo {
  id?: number;
  title: string;
  completed?: boolean;
  description?: string;
  userId?: number;
}

//  Define the options for fetching todos
interface GetTodosParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

// get Todos
export const getTodos = async ({
  page = 1,
  limit = 10,
  sort,
  order,
}: GetTodosParams): Promise<Todo[]> => {
  try {
    const params = new URLSearchParams({
      _sort: sort || "id",
      _order: order || "desc",
    });
    const response = await axios.get<Todo[]>(
      `${baseUrl}?_page=${page}&_limit=${limit}&${params}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

//  Create Todos
export const createTodos = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(baseUrl, {
      ...newTodo,
      completed: false,
      description: newTodo.description || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};


//  Update Todos
export const updateTodos = async (
  id: number,
  newTodo: Todo
): Promise<Todo> => {
  try {
    const response = await axios.put<Todo>(`${baseUrl}/${id}`, {
      ...newTodo,
      description: newTodo.description || "",
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete Todos
export const deleteTodos = async (id: number): Promise<number> => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
