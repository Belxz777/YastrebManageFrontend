'use server'
import { cookies } from "next/headers";
import { host } from "./types";

async function getUserProjects(id: number): Promise<Array<project> | project | undefined> {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if (!jwt) {
        throw new Error('Invalid')
    }
    if (!id) {
throw new Error('Invalid')
    }
    const res = await fetch(`${host}all_user_projects/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}

async function getAllUserTask(id:number):Promise<Array<task> | task> {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    console.log(host,id)
    if(!id ){
        throw new Error('No task id provided')
    }
    const res = await fetch(`${host}all_user_task/${id}`);
    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}
async function getDepartmentTasks(id:number):Promise<Array<task> | task> {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    console.log(host,id)
    if(!id ){
        throw new Error('No task id provided')
    }
    const res = await fetch(`${host}get_all_department_tasks/${id}`);
    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}
async function getAllProjectTasks(id:number):Promise<Array<task> | task> {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    if(!id ){
        throw new Error('No project id provided')
    }
    const res = await fetch(`${host}task_for_project/${id}`);
    if(!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}
async function getAllProjectIssues(id:number):Promise<Array<problem> | problem> {
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    if(!id ){
        throw new Error('No project id provided')
    }
    const res = await fetch(`${host}issue_for_project/${id}`);
    if(!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
}
 async function getUserName(id:number):Promise<userData>{
    const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    if(!id ){
        throw new Error('No user id provided')
    }
    const res = await fetch(`${host}user/${id}`);
    if(!res.ok) {
        throw new Error('Failed to fetch data')

 }
 const receiveddata:userData = await res.json();
 return receiveddata
}
async function getUserByPrefixSurname(surname:string):Promise<any>{
const cookieStore = cookies();
    const jwt = cookieStore.get('jwt')?.value
    if(!jwt){
        throw new Error('No token provided')
    }
    if(!surname ){
        throw new Error('No user id provided')
    }
    const res = await fetch(`${host}userbyName/${surname}`);
    
 const receiveddata:userData = await res.json();

 return receiveddata;
}
async function getByPrefixProject(name:string):Promise<project[] | project | null> {
    if(!name ){
        throw new Error('No project name provided')
    }
    const res = await fetch(`${host}projectbyName/${name}`);
    
 const receiveddata = await res.json();

 return receiveddata;
}
async function getProjectTitle(id:number):Promise<project>{
    const cookieStore = cookies();
        const jwt = cookieStore.get('jwt')?.value
        if(!jwt){
            throw new Error('No token provided')
        }
        if(!id ){
            throw new Error('No user id provided')
        }
        const res = await fetch(`${host}project/${id}`);
        if(!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
    
     }
     const receiveddata:project= await res.json();
    
     return receiveddata;
    }
export  { getUserProjects,getAllUserTask,getAllProjectTasks,getUserName,getUserByPrefixSurname,getProjectTitle,getByPrefixProject,getAllProjectIssues,getDepartmentTasks};