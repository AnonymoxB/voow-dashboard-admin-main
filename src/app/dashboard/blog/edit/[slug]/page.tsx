"use client";
import { getToken } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import NotFound from "./not-found";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import { showBlogService, updateBlogService } from "@/services/blogService";
import { ShowResponseBlog } from "@/types/blog";
import { getAllCategoryBlogService } from "@/services/categoryBlogService";
import { CategoryBlog } from "@/types/categoryBlog";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const [categoryBlog, setCategoryBlog] = useState<
    Array<CategoryBlog>
  >([]);
  const [notFound, setNotFound] = useState(false);
  const [loadingData, setIsLoadingData] = useState(true);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [lang, setLang] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  async function showPreviewImage(e: any) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

  async function updateBlog() {
    setDisabled(true);
    setIsLoading(true);
    const category_id = categoryId;
    const token: string = getToken() ?? "";
    const result: any = await updateBlogService(
      { id,category_id, title, content, image, status, lang },
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
          text: JSON.stringify(result.data.data),
        });
      }
    }
    setDisabled(false);
    setIsLoading(false);
  }

  useEffect(() => {
    async function getDataShowBlog() {
      const token: any = getToken();
      const result: any = await showBlogService(token, params.slug);
      const { data }: { data: ShowResponseBlog } = result;
      if (data.code == 200) {
        if (data.data == null) {
          setNotFound(true);
        } else {
          setId(data.data.item.id.toString());
          setTitle(data.data.item.title);
          setStatus(data.data.item.status);
          setCategoryId(data.data.item.blog_category_id.toString());
          setLang(data.data.item.lang);
          setContent(data.data.item.content);
          setPreviewImage(data.data.item.image);
        }
      }else{
        if (data.data == null) {
            setNotFound(true);
        }
      }

      setIsLoadingData(false);
    }

    async function categoryBlogData() {
      const token: any = getToken();
      const data: any = await getAllCategoryBlogService(token);
      setCategoryBlog(data.data.data.items);
    }

    categoryBlogData();
    getDataShowBlog();
  }, []);
 
  return notFound ? (
    <NotFound />
  ) : loadingData ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
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
            updateBlog()
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
            <div className="card w-full bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Edit Blog</h2>

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
                    {!!categoryBlog
                      ? categoryBlog.map((item: CategoryBlog) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))
                      : null}
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
                      value={content}
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
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex text-gray-500 items-end content-end justify-end text-base">
            <Button variant="primary" isLoading={isLoading} disabled={disabled}>
              Update
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
