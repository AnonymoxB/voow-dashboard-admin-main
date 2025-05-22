import { BASE_URL } from "@/utils/baseUrl";

export async function getListTransaction(token:string,limit:number = 0) {
    try {
        const response = await fetch(BASE_URL("admin/transaction?limit="+limit), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        });

        const data = await response.json();

        return { data, response };

    } catch (error) {
        return error;
    }
}