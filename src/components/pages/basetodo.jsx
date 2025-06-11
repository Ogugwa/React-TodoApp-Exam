// import { useQuery } from "@tanstack/react-query";

// const { isPending, isError, data, error } = useQuery({
//   queryKey: ["todos"],
//   queryFn: fetchTodoList,
// });

function BaseTodo() {
  return (
    <div className="flex flex-col justify-center items-center m-4 p-4 font-medium">
      <div className="flex flex-col justify-center items-center font-medium p-2 gap-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Deborah's Todo App</h1>
        <p className="text-center text-base md:text-xl lg:text-2xl text-gray-400">
          A modern task management app
        </p>
      </div>
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
