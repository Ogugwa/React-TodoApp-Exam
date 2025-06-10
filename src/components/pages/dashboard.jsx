// import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  //   const query = useQuery({
  //     queryKey: ["todos"],
  //     queryFn:
  //   })

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="m-2 p-4 gap-4 flex flex-col items-center justify-center font-medium">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Deborah's Todo App</h1>
        <p className="text-base md:text-2xl lg:text-3xl">
          A modern task management app
        </p>
      </div>
    </div>
  );
}
// const getTodos = async () => {
//   // const response= await fetch()
//   // Include the link to the fake api call inside the fetch
// };
export default Dashboard;
