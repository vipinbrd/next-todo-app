'use client';

import { TaskStore } from "@/store/TaskContext";
import { useContext } from "react";

export function Tasks() {
  const { state, dispatch } = useContext(TaskStore);
  function deleteHandler(id){
     
    fetch(`/api/task/${id}`,{
      method:"DELETE",
    }).then((res)=>{
 dispatch({ type: "DELETE", id: id })
    })

   
  }

  function MarkAsCompletehandler(id){
dispatch({ type: "CHANGE", id: id })


  }
  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white shadow-md rounded-xl space-y-4">
      {state.length <= 0 && (
        <p className="text-gray-500 text-center font-medium">
          No Task For Today
        </p>
      )}

      {state.length > 0 && (
        <ul className="space-y-4">
          {state.map((ele) => (
            <li
              key={ele.id}
              className="flex justify-between items-center p-3 border rounded-lg hover:shadow transition"
            >
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    ele.status === "Complete" ? "line-through text-green-500" : ""
                  }`}
                >
                  {ele.name}
                </h2>
                <p className="text-sm text-gray-500">Status: {ele.status}</p>
              </div>

              <div className="flex gap-2">
                {ele.status !== "Complete" && (
                  <button
                    onClick={() => MarkAsCompletehandler(ele.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
                  >
                    Mark Complete
                  </button>
                )}
                <button
                  onClick={() => deleteHandler(ele.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
