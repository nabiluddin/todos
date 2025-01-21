import { query } from "@solidjs/router";
import { useUserContext } from "../context/User";
import { AxiosApi } from "../services/axiosApi";
import { TaskType } from "../types/task";
import { TaskStatus } from "../types/taskStatus";

export const getUserTasks = query(async () => {
  const [user] = useUserContext();
  try {
    const { data } = await AxiosApi.get(`/users/${user()?.id}/tasks`);
    return data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}, "userTasks")

export const getTaskDetails = query(async (id: string): Promise<TaskType | undefined> => {
  try {
    if (!id) return undefined;
    const { data } = await AxiosApi.get(`/tasks/${id}`);
    return data.data
  } catch (error) {
    console.log(error);
    return undefined;
  }
}, "taskById")

export const getTaskStatus = query(async (): Promise<TaskStatus[] | undefined> => {
  try {
    const { data } = await AxiosApi.get("/task-status");
    return data.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}, "taskStatus")