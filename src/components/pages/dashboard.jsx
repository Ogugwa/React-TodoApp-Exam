import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./apicall";
import { useState } from "react";

function Dashboard() {
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 6;

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Calculate pagination values
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos?.slice(indexOfFirstTodo, indexOfLastTodo) || [];
  const totalPages = todos ? Math.ceil(todos.length / todosPerPage) : 0;

  // Add new todo mutation
  const addMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
        userId: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setNewTodoTitle("");
      setNewTodoDescription("");
      setEditingId(null);
      setCurrentPage(1);
    },
  });

  // Toggle todo completion status
  const toggleMutation = useMutation({
    mutationFn: (todo) =>
      updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed,
      }),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries(["todos"]);
      const previousTodos = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (old) =>
        old?.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        )
      );
      return { previousTodos };
    },
    onError: (err, updatedTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });

  // Edit todo
  const editMutation = useMutation({
    mutationFn: (todo) =>
      updateTodo(todo.id, {
        title: editTitle,
        description: editDescription,
        completed: todo.completed,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setEditingId(null);
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      if (currentTodos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    },
  });

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    addMutation.mutate();
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleEditSubmit = (todo) => {
    if (!editTitle.trim()) return;
    editMutation.mutate(todo);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) return <div>Loading todos...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Deborah's Todo App
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600">
            A modern task management app
          </p>
        </div>

        {/* Todo Form */}
        <form
          onSubmit={handleAddTodo}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                placeholder="Task Title..."
                className="w-full p-2 border rounded"
                required
                disabled={addMutation.isPending}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                placeholder="Task description..."
                className="w-full p-2 border rounded"
                disabled={addMutation.isPending}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={addMutation.isPending || !newTodoTitle.trim()}
          >
            {addMutation.isPending ? "Adding..." : "Add"}
          </button>
        </form>

        {/* Todo Cards Grid */}
        <div className="mb-8">
          {currentTodos.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                    todo.completed ? "border-green-500" : "border-blue-500"
                  }`}
                >
                  <div className="p-4">
                    {editingId === todo.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-2 border rounded"
                          required
                        />
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEditSubmit(todo)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className={`font-medium ${
                              todo.completed ? "line-through text-gray-500" : ""
                            }`}
                          >
                            {todo.title}
                          </h3>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleMutation.mutate(todo)}
                            className="h-5 w-5"
                          />
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {todo.description || "No description"}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => startEditing(todo)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMutation.mutate(todo.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center w-full mt-4 bg-white p-4 rounded-lg shadow">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded text-white ${
                currentPage === 1
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded text-white ${
                currentPage === totalPages
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
