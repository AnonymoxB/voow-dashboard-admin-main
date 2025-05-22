import { IBlog } from "@/types/blog";
import { BASE_URL } from "@/utils/baseUrl";

export async function getAllBlogService(token: string) {
  try {
    const response = await fetch(BASE_URL("admin/blog"), {
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


export async function showBlogService(token: string,slug:string) {
  try {
    const response = await fetch(BASE_URL("admin/blog/show/"+slug), {
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

export async function storeBlogService(body: IBlog, token: string) {
  try {

    var formdata = new FormData();
    formdata.append("category_id", body.category_id);
    formdata.append("title", body.title);
    formdata.append("content", body.content);
    formdata.append("image", body.image ?? "");
    formdata.append("status", body.status ?? "");
    formdata.append("lang", body.lang ?? "");

    const response = await fetch(BASE_URL("admin/blog/store"), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formdata,
    });

    const data = await response.json();

    return { data, response };
  } catch (error) {
    return error;
  }
}


export async function updateBlogService(body: IBlog, token: string) {
  try {
    var formdata = new FormData();
    formdata.append("id", body.id ?? "");
    formdata.append("category_id", body.category_id);
    formdata.append("title", body.title);
    formdata.append("content", body.content);
    formdata.append("image", body.image ?? "");
    formdata.append("status", body.status ?? "");
    formdata.append("lang", body.lang ?? "");

    const response = await fetch(BASE_URL("admin/blog/update"), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formdata,
    });

    const data = await response.json();

    return { data, response };
  } catch (error) {
    return error;
  }
}

export async function deleteBlogService(id: number, token: string) {
  try {
    const response = await fetch(BASE_URL("admin/blog/delete"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await response.json();

    return { data, response };
  } catch (error) {
    return error;
  }
}
