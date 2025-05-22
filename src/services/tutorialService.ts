import { ITutorial } from "@/types/tutorial";
import { BASE_URL } from "@/utils/baseUrl";

export async function getAllTutorialService(token: string) {
  try {
    const response = await fetch(BASE_URL("admin/tutorial"), {
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


export async function showTutorialService(token: string,slug:string) {
  try {
    const response = await fetch(BASE_URL("admin/tutorial/show/"+slug), {
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

export async function storeTutorialService(body: ITutorial, token: string) {
  try {

    var formdata = new FormData();
    formdata.append("category_id", body.category_id);
    formdata.append("title", body.title);
    formdata.append("content", body.content);
    formdata.append("image", body.image ?? "");
    formdata.append("link_youtube", body.link_youtube ?? "");
    formdata.append("status", body.status ?? "");
    formdata.append("lang", body.lang ?? "");

    const response = await fetch(BASE_URL("admin/tutorial/store"), {
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


export async function updateTutorialService(body: ITutorial, token: string) {
  try {
    var formdata = new FormData();
    formdata.append("id", body.id ?? "");
    formdata.append("category_id", body.category_id);
    formdata.append("title", body.title);
    formdata.append("content", body.content);
    formdata.append("image", body.image ?? "");
    formdata.append("link_youtube", body.link_youtube ?? "");
    formdata.append("status", body.status ?? "");
    formdata.append("lang", body.lang ?? "");

    const response = await fetch(BASE_URL("admin/tutorial/update"), {
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

export async function deleteTutorialService(id: number, token: string) {
  try {
    const response = await fetch(BASE_URL("admin/tutorial/delete"), {
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
