import { use, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useLocalStorage } from "../useLocalStorage";

const Task = () => {
  const [addTask, setAddTask] = useState("");

  const [task, setTask] = useLocalStorage("task", []);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // this is also right way we are create hook but

  //   const [task, setTask] = useState(() => {
  //     const savedTask = localStorage.getItem("task");
  //     return savedTask ? JSON.parse(savedTask) : []
  //   });

  //   useEffect(() => {
  //     console.log("useEffect rune");
  //     localStorage.setItem("task", JSON.stringify(task));
  //   }, [task]);

  const addTaskHandler = () => {
    if (!addTask.trim("")) {
      alert("Input cannot be empty");
      return;
    }
    setTask([{ id: Date.now(), task: addTask, isCompleted: false }, ...task]);

    setAddTask("");
  };

  const toggleTaskHandler = (id) => {
    setTask((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const startEditHandler = (t) => {
    setEditId(t.id);
    setEditText(t.task);
  };
  const saveEditHandler = (id) => {
    if (!editText.trim()) return;
    setTask((prev) =>
      prev.map((t) => (t.id === id ? { ...t, task: editText.trim() } : t)),
    );
    setEditId(null);
  };

  const deleteTaskHandler = (id) => {
    setTask(task.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className=" w-3xl flex items-center justify-between mt-5 py-3 px-4 mb-5">
        <input
          type="text"
          placeholder="Enter Task"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
          className="border-slate-300 border w-xl py-4 px-5 rounded-4xl text-xl text-slate-700"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTaskHandler();
          }}
        />
        <button
          onClick={addTaskHandler}
          className="bg-blue-600 text-white text-2xl rounded-3xl px-4 py-2"
        >
          + Add Task
        </button>
      </div>
      {task.map((t) => (
        <div className=" p-6 border-0 rounded-xl mb-5 bg-white shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-6 h-6 "
              checked={t.isCompleted}
              onChange={() => toggleTaskHandler(t.id)}
            />
            {editId === t.id ? (
              <input
                type="text"
                placeholder="Enter Task"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditHandler(t.id);
                  if (e.key === "Escape") setEditId(null);
                }}
                autoFocus
                className="border-slate-300 border w-xl py-4 px-5 rounded-xl text-xl text-slate-700"
              />
            ) : (
              <h1
                className={`font-semibold text-2xl ${t.isCompleted ? "line-through" : ""}`}
              >
                {t.task}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-3 hover:cursor-pointer">
            <FaEdit size={25} onClick={() => startEditHandler(t)} />
            <RiDeleteBin6Fill
              size={25}
              onClick={() => deleteTaskHandler(t.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Task;
