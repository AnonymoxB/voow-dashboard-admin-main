import { ICategoryBlogStore } from "@/types/categoryBlog";
import { BASE_URL } from "@/utils/baseUrl";


export async function getAllCategoryBlogService(token:string){
    try {
        const response = await fetch(BASE_URL("admin/blog/category"), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}


export async function storeCategoryBlogService(body:ICategoryBlogStore, token:string){
    try {
        const response = await fetch(BASE_URL("admin/blog/category/store"), {
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


export async function deleteCategoryBlogService(id:number, token:string){
    try {
        const response = await fetch(BASE_URL("admin/blog/category/delete"), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
            body: JSON.stringify({id:id})
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}


export async function showCategoryBlogService(slug:string, token:string){
    try {
        const response = await fetch(BASE_URL("admin/blog/category/show/"+slug), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}


export async function updateCategoryBlogService(body:ICategoryBlogStore, token:string){
    try {
        const response = await fetch(BASE_URL("admin/blog/category/update"), {
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
