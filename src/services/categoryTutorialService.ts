import { ICategoryTutorialStore } from "@/types/categoryTutorial";
import { BASE_URL } from "@/utils/baseUrl";

export async function getAllTutorialCategoryService(token: string) {
  try {
    const response = await fetch(BASE_URL("admin/tutorial/category"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    return { data, response };
  } catch (error) {
    return error;
  }
}



export async function storeCategoryTutorialService(body:ICategoryTutorialStore, token:string){
    try {
        const response = await fetch(BASE_URL("admin/tutorial/category/store"), {
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


export async function deleteCategoryTutorialService(id:number, token:string){
    try {
        const response = await fetch(BASE_URL("admin/tutorial/category/delete"), {
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


export async function showCategoryTutorialService(slug:string, token:string){
    try {
        const response = await fetch(BASE_URL("admin/tutorial/category/show/"+slug), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization' : 'Bearer '+token },
        });

        const data = await response.json();
       
        return { data, response };

    } catch (error) {
        return error;
    }
}


export async function updateCategoryTutorialService(body:ICategoryTutorialStore, token:string){
    try {
        const response = await fetch(BASE_URL("admin/tutorial/category/update"), {
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
