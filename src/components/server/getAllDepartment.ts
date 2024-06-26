import { host } from "./types";

async function allDepMembers(id: number): Promise<userData[] | null> {
try {
const response = await fetch(`${host}get_all_department_members/${id}`);
if (!response.ok) {
throw new Error(`HTTP error ${response.status}`);
}
const responseData = await response.json();
return responseData;
} catch (error) {
throw new Error("")
}
}
async function everyDepartment(): Promise<department[] |department | null> {
    try {
        const response = await fetch(`${host}get_all_departments`);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error)
        return null

    }
}
    

export {allDepMembers,everyDepartment}