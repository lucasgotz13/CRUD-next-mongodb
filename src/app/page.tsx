import Task from "@/models/Task";
import TaskComponent from "./components/Task";
import connectDB from "@/utils/mongoose";
import AddNewTask from "./components/AddNewTask";

async function loadTasks() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

export default async function HomePage() {
  const tasks = await loadTasks();

  return (
    <>
      <AddNewTask />
      <div className="flex flex-wrap items-center gap-5 mt-4">
        {tasks.map((task) => (
          <TaskComponent
            title={task.title}
            description={task.description}
            id={task._id}
            key={task._id}
          />
        ))}
      </div>
    </>
  );
}
