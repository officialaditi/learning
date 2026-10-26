import Task from "../component/Task";

const HomeScreen = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="w-full font-bold text-2xl bg-blue-700 text-white text-center p-4">
        Task Manager
      </h1>
      <Task />
    </div>
  );
};
export default HomeScreen;
