"use client";
import { showTutorialService, updateTutorialService } from "@/services/tutorialService";
import { ShowResponseTutorial, Tutorial } from "@/types/tutorial";
import { getToken } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import NotFound from "./not-found";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { CategoryTutorial } from "@/types/categoryTutorial";
import { Editor } from "@tinymce/tinymce-react";
import { getAllTutorialCategoryService } from "@/services/categoryTutorialService";
import Swal from "sweetalert2";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const [categoryTutorial, setCategoryTutorial] = useState<
    Array<CategoryTutorial>
  >([]);
  const [notFound, setNotFound] = useState(false);
  const [loadingData, setIsLoadingData] = useState(true);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [linkYoutube, setLinkYoutube] = useState("");
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

  async function updateTutorial() {
    setDisabled(true);
    setIsLoading(true);
    const category_id = categoryId;
    const link_youtube = linkYoutube;
    const token: string = getToken() ?? "";
    const result: any = await updateTutorialService(
      { id,category_id, title, content, image, link_youtube, status, lang },
      token
    );

    if (result.data.code == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });
      router.push("/dashboard/tutorial");
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
    async function getDataShowTutorial() {
      const token: any = getToken();
      const result: any = await showTutorialService(token, params.slug);
      const { data }: { data: ShowResponseTutorial } = result;
      if (data.code == 200) {
        if (data.data == null) {
          setNotFound(true);
        } else {
          setId(data.data.item.id.toString());
          setTitle(data.data.item.title);
          setStatus(data.data.item.status);
          setCategoryId(data.data.item.tutorial_category_id.toString());
          setLinkYoutube(data.data.item.link_youtube);
          setLang(data.data.item.lang);
          setContent(data.data.item.content);
          setPreviewImage(data.data.item.image);
        }
      }

      setIsLoadingData(false);
    }

    async function categoryTutorialData() {
      const token: any = getToken();
      const data: any = await getAllTutorialCategoryService(token);
      setCategoryTutorial(data.data.data.items);
    }

    categoryTutorialData();
    getDataShowTutorial();
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
          onClick={() => router.push("/dashboard/tutorial")}
        >
          Back
        </Button>
      </div>
      <section className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTutorial()
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
            <div className="card w-full bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Edit Tutorial</h2>

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
                    {!!categoryTutorial
                      ? categoryTutorial.map((item: CategoryTutorial) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))
                      : null}
                  </select>
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Link Youtube</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch...."
                    className="input input-bordered w-full"
                    value={linkYoutube}
                    onChange={(e) => setLinkYoutube(e.target.value)}
                  />
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
              Update
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
