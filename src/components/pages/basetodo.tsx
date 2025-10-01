import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTodos, createTodos, updateTodos, deleteTodos } from "./todocalls";
import type { Todo } from "./todocalls"; 
import { useState, type FormEvent } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

// ✅ Define type for new todos (no `id`)
type NewTodo = Omit<Todo, "id">;

function BaseTodo() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "not_completed">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ✅ Fetch todos
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos", page],
    queryFn: () => getTodos({ page, limit, sort: "createdAt", order: "desc" }),
    placeholderData: [], // helps avoid undefined state
  });

  // ✅ Create Todo
  const createMutation = useMutation<Todo, Error, Omit<Todo, "id">>({
  mutationFn: createTodos,
  onSuccess: (createdTodo) => {
    queryClient.setQueryData<Todo[]>(["todos", 1], (old = []) => [
      createdTodo,
      ...old,
    ]);
    setPage(1);
    setTitle("");
    setDescription("");
  },
});


  // ✅ Update Todo
  const toggleMutation = useMutation<
    Todo,
    Error,
    { id: number; updatedTodo: Todo }
  >({
    mutationFn: ({ id, updatedTodo }) => updateTodos(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ✅ Delete Todo
  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: deleteTodos,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Todo[]>(["todos", page], (old = []) =>
        old.filter((todo) => todo.id !== deletedId)
      );
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTodo: NewTodo = {
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    try {
      await createMutation.mutateAsync(newTodo);
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  // ✅ Toggle complete
  const handleToggleComplete = async (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    toggleMutation.mutate({ id: todo.id!, updatedTodo });

    try {
      const updated = await updateTodos(todo.id!, updatedTodo);
      queryClient.setQueryData<Todo[]>(["todos", page], (oldData = []) =>
        oldData.map((t) => (t.id === todo.id ? updated : t))
      );
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  // ✅ Delete
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // ✅ Filter
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "not_completed") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center m-4 p-4 font-medium">
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Deborah's Todo App</h1>
        <p className="text-base md:text-xl lg:text-2xl text-gray-400">
          A modern task management app
        </p>
      </div>

      {/* Form */}
      <form
        className="w-full max-w-2xl border p-4 shadow-md rounded mb-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-2">
          {editTodo ? "Edit Todo" : "Add New Todo"}
        </h2>
        <div className="grid md:grid-cols-2 gap-2">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              {createMutation.isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Search */}
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {(["all", "not_completed", "completed"] as const).map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "All"
              : f === "not_completed"
              ? "Not Completed"
              : "Completed"}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <section className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`border shadow p-4 rounded ${
                todo.completed ? "bg-green-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                />
              </div>
              <p className="text-sm text-gray-700 mt-2">
                {todo.description || "No description"}
              </p>
              <p
                className={`mt-2 font-medium ${
                  todo.completed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                Status: {todo.completed ? "Completed" : "Not Completed"}
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <FiEdit
                  className="cursor-pointer text-blue-600"
                  onClick={() => {
                    setEditTodo(todo);
                    setTitle(todo.title);
                    setDescription(todo.description || "");
                  }}
                />
                <MdDelete
                  className="cursor-pointer text-blue-600"
                  onClick={() => handleDelete(todo.id!)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 w-full max-w-xl">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={todos.length < limit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-400 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BaseTodo;
