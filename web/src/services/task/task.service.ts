import axios, { AxiosResponse } from "axios";

const urlBase = import.meta.env.VITE_API_TASK_BASE;
const urlTasksOperations = urlBase + import.meta.env.VITE_API_TASK_OPERATIONS;


export const getTasksByUserId = async (userId: string)=> {
    const result: AxiosResponse = await axios.get(`${urlTasksOperations}/${userId}`);
    if (result.status === 200) {
        return result.data;
    }
    return [];
}

export const deleteTask = async (id: string)=> {
    const result: AxiosResponse = await axios.delete(`${urlTasksOperations}/${id}`);
    if (result.status === 200) {
        return result.data;
    }
    return false;
}

export const createTask = async (task: any)=> {
    const result: AxiosResponse = await axios.post(`${urlTasksOperations}`, task);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
    return false;
}

export const updateTask = async (task: any, id: string)=> {
    const result: AxiosResponse = await axios.put(`${urlTasksOperations}/${id}`, task);
    if (result.status === 200 || result.status === 201) {
        return result.data;
    }
    return false;
}