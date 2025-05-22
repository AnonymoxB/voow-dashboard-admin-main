
import { DeleteFaq, DetailFaq, Ifaq } from "@/types/faq";
import { BASE_URL } from "@/utils/baseUrl";

export async function storeFaq(body:Ifaq,token:string = ""){
    try {
        const response = await fetch(BASE_URL("admin/faq/store"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
            body: JSON.stringify(body)
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}

export async function getAllFaq(token:string = "") {
    try {
        const response = await fetch(BASE_URL("admin/faq?limit=200"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}

export async function deleteFaq(body:DeleteFaq,token:string = "") {
    try {
        const response = await fetch(BASE_URL("admin/faq/delete"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
            body: JSON.stringify(body)

        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}

export async function getDetailFaq(body:DetailFaq,token:string) {
    try {
        const response = await fetch(BASE_URL("admin/faq/show/"+body.id), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}

export async function updateFaq(body:Ifaq,token:string = ""){
    try {
        const response = await fetch(BASE_URL("admin/faq/update"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
            body: JSON.stringify(body)
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}
