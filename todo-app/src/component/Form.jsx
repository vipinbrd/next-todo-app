'use client';

import { TaskStore } from "@/store/TaskContext";
import Link from "next/link";
import { useContext, useState } from "react";

export function Form() {
  const { state, dispatch } = useContext(TaskStore);

  const [task, setTask] = useState("");
  const [toast, setToast] = useState("");
  async function sendData(data){
    const req=await fetch("/api/task",{
      method:"POST",
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const res=await req.json();
    return res

  }

  async function formHandler(e) {
    e.preventDefault();

    if (task.trim() === "") return;
   const res= await sendData({name: task,status:"Incomplete" })

    dispatch({ type: "ADD", name: task,id:res.id });
    setTask("");
    setToast("Task added successfully");
    setTimeout(() => {
      setToast("");
    }, 2000);
  }
 console.log(state)
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Add Your Today's Goal</h1>

      {toast && (
        <p className="text-green-600 text-sm font-medium bg-green-100 p-2 rounded">
          {toast}
        </p>
      )}

      <form onSubmit={formHandler} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition">
  <Link href="/complete"> See Completed Task</Link>
 
</button>
    </div>
  );
}
