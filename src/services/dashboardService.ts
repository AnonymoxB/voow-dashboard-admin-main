import { BASE_URL } from "@/utils/baseUrl";

export async function getCountDashboardData(token:string = "") {
    try {
        const response = await fetch(BASE_URL("admin/dashboard/count"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}