"use client";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/button/Button";
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";


export default function Page() {
    const [content, setContent] = useState("");
      const [previewImage, setPreviewImage] = useState("");
         const [previewImage1, setPreviewImage1] = useState("");

        const [image, setImage] = useState("");
              const [image1, setImage1] = useState("");


  async function showPreviewImage(e: any) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }
   async function showPreviewImage1(e: any) {
    setPreviewImage1(URL.createObjectURL(e.target.files[0]));
    setImage1(e.target.files[0]);
  }



  return (
  <>
      <div className="flex text-gray-500 items-start content-start justify-start text-base pt-8">
     
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
                <h2 className="card-title">Add Paket</h2>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nama</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Paket.."
                    className="input input-bordered w-full"
                   
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Nama Deskripsi</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Deskripsi"
                    className="input input-bordered w-full"
                   
                  />
                </div>
             
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Icon</span>
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
                    <span className="label-text">SLUG</span>
                  </label>
                  {!!previewImage1 ? (
                    <img src={previewImage1} width="400" className="mb-2"></img>
                  ) : null}

                  <input
                    type="file"
                    placeholder="image"
                    className="file-input  w-full"
                    onChange={showPreviewImage1}
                  />
                </div>
           
                    <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Deskripsi</span>
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
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Harga</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Harga"
                    className="input input-bordered w-full"
                   
                  />
                </div>
                 <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Harga Promo</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Harga"
                    className="input input-bordered w-full"
                   
                  />
                </div>

               
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
      
          </div>

          <div className="flex text-gray-500 items-end content-end justify-end text-base">
            <Button variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </>
  )
 

}