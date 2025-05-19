'use client'
import { createContext, useEffect, useReducer}  from "react"

export const TaskStore=createContext([]);

export function TaskProvider({children}){
    function  reducer(state,action){
        if(action.type=="ADD"){
            return [...state,{id:action.id,name:action.name,status:"Incomplete"}]
        }
        else if(action.type=="DELETE"){
             return state.filter((ele)=>{
                return ele.id!==action.id
             })
        }
        else if(action.type=="CHANGE"){
            return state.map((ele)=>{
                if(ele.id==action.id){
                    return {...ele,status:"Complete"}
                }
                return ele;
            })
        }
        else if(action.type=="REPLACE"){
            return action.payload;
        }
         else return state
    }
 
    async  function fetchData(){
        const res= await fetch("/api/task")
        const response=await res.json();
         dispatch({
            type:"REPLACE",
            payload:response.map(({_id,...rest})=>{
                return {...rest,id:_id}
            })
         })
     
    }
    useEffect(()=>{
        fetchData();
    },[])
   const[state,dispatch] =useReducer(reducer,[])


   return <TaskStore.Provider value={{state,dispatch}}>{children}</TaskStore.Provider>

}