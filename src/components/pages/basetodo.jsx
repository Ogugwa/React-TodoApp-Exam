// import { useQuery } from "@tanstack/react-query";
// import { useForm, SubmitHandler } from "react-hook-form";

// const { isPending, isError, data, error } = useQuery({
//   queryKey: ["todos"],
//   queryFn: fetchTodoList,
// });

function BaseTodo() {
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center items-center m-4 p-4 font-medium">
      <div className="flex flex-col justify-center items-center font-medium p-2 gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Deborah's Todo App</h1>
        <p className="text-center text-base md:text-xl lg:text-2xl text-gray-400">
          A modern task management app
        </p>
      </div>
      {/* The form for adding new task */}
      <section className=" w-full justify-center mt-2 items-center border-2 border-red-500">
        <form className="flex flex-col font-medium shadow-md p-4">
          <h2 className="text-xl mb-2">Add New Todo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-md mb-2">Title</label>
              <input
                type="text"
                placeholder="Add title....."
                className="shadow-md border rounded w-full p-2"
              />
            </div>
            <div>
              <label className="block text-md mb-2">Description</label>
              <input
                type="text"
                placeholder="Add description....."
                className="shadow-md border rounded w-full p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="border rounded-md bg-blue-700 hover:bg-blue-500 p-2 px-4"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* This is the todo div container */}
      <section className="flex  justify-center items-center shadow-md">
        <div className="grid grid-cols-3 grid-rows-3"></div>
      </section>
      <div className="flex flex-col justify-center items-center"></div>
      {/* This is the div for the buttons for pagination */}
      <div className="flex w-[70%] justify-between items-center p-6  border-red-500 border-2  ">
        <button className="w-28 h-10 border bg-blue-600 hover:bg-blue-400 rounded-lg text-xl">
          Previous
        </button>
        <button className="w-28 h-10 border bg-blue-600 hover:bg-blue-400 rounded-lg text-xl">
          Next
        </button>
      </div>
    </div>
  );
}
export default BaseTodo;
