import { Ilogin } from "@/types/user";
import clearCookie from "@/utils/auth";
import { BASE_URL } from "@/utils/baseUrl";

export async function login(body: Ilogin) {
    try {
        const response = await fetch(BASE_URL("auth/admin/login"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return { data, response };

    } catch (error) {
        return error;
    }
}

export async function logoutUser(token: string) {
    try {
        const response = await fetch(BASE_URL("auth/admin/logout"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        });

        const data = await response.json();

        clearCookie();

        return { data, response };

    } catch (error) {
        return error;
    }

}


export async function getProfileAPI(token: string) {
    try {
        const response = await fetch(BASE_URL("admin/profile/my"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        });

        const data = await response.json();

        return { data, response };

    } catch (error) {
        return error;
    }
}


//for dashboard function
export async function getListUsers(token:string) {
    try {
        const response = await fetch(BASE_URL("admin/user"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        });

        const data = await response.json();

        return { data, response };

    } catch (error) {
        return error;
    }
}