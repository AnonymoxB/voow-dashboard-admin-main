"use client";
import Button from "@/components/button/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
import { CategoryBlog, ResponseCategoryBlog } from "@/types/categoryBlog";
import { getAllCategoryBlogService } from "@/services/categoryBlogService";
import { storeBlogService } from "@/services/blogService";

export default function Page() {
  const router = useRouter();
  const [categoryBlog, setCategoryBlog] = useState<
    Array<CategoryBlog>
  >([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [lang, setLang] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function getCategoryBlog() {
    const token: string = getToken() ?? "";
    const result: any = await getAllCategoryBlogService(token);
    const { data }: { data: ResponseCategoryBlog } = result;

    return data;
  }

  async function submitBlog() {
    setDisabled(true);
    setIsLoading(true);
    const category_id = categoryId;
    const token: string = getToken() ?? "";
    const result: any = await storeBlogService(
      { category_id, title, content, image, status, lang },
      token
    );

    if (result.data.code == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });
      router.push("/dashboard/blog");
    } else {
      if (result.data.code == 400) {
        Swal.fire({
          icon: "error",
          title: result.data.message,
          text: JSON.stringify(result.data.data) ,
        });
      }
    }
    setDisabled(false);
    setIsLoading(false);
  }

  async function showPreviewImage(e: any) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    async function categoryBlogData() {
      const data: any = await getCategoryBlog();
      setCategoryBlog(data.data.items);
    }

    categoryBlogData();
  }, []);

  return (
    <>
      <div className="flex text-gray-500 items-start content-start justify-start text-base pt-8">
        <Button
          variant="success"
          typeButton="button"
          onClick={() => router.push("/dashboard/blog")}
        >
          Back
        </Button>
      </div>
      <section className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitBlog();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
            <div className="card w-full bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Add Blog</h2>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title.."
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="" selected>
                      --PILIH--
                    </option>
                    {!!categoryBlog ? (
                      categoryBlog.map((item: CategoryBlog) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))
                    ) : (
                      <option selected>--PILIH--</option>
                    )}
                  </select>
                </div>


                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  {!!previewImage ? (
                    <img src={previewImage} width="400" className="mb-2"></img>
                  ) : null}

                  <input
                    type="file"
                    placeholder="image"
                    className="file-input  w-full"
                    onChange={showPreviewImage}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option selected>--SELECT STATUS--</option>
                    <option value="Draft">Draft</option>
                    <option value="Publish">Publish</option>
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Languange</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  >
                    <option value="" selected>
                      --SELECT LANGUANGE--
                    </option>
                    <option value="ID">Indonesia</option>
                    <option value="EN">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
            <div className="card w-full bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <div className="mt-1">
                    <Editor
                      apiKey="onoa2njtjxid5g67eaomumymv2e5ip282ibr6kkx6tiadd0l"
                      onEditorChange={(newText: any) => setContent(newText)}
                      init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-gray-500 items-end content-end justify-end text-base">
            <Button variant="primary" isLoading={isLoading} disabled={disabled}>
              Submit
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
