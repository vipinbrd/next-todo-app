import { Form } from "@/component/Form";
import { Tasks } from "@/component/Tasks";

export default function Home (){


  return  <>
   <h1 className="text-2xl text-center font-bold text-red-800">Todo App</h1>
   <Form/>
   <Tasks/>
  
  </>
}