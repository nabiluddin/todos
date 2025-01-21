import { createEffect, createMemo } from "solid-js";
import { createContext, createSignal, ParentProps, useContext } from "solid-js";

type TaskContextType = [() => string, (value: string) => void];

const TaskContext = createContext<TaskContextType>();

export const TaskContextProvider = (props: ParentProps) => {
  const [taskId, setTaskId] = createSignal("");
  const memoizedTaskId = createMemo(() => taskId());
  createEffect(()=>{
    // console.log("taskId(): ", taskId());
  })
  return (
    <TaskContext.Provider value={[memoizedTaskId, setTaskId]}>
      {props.children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if(!context){
    throw new Error("task context not found.")
  }
  return context;
}
