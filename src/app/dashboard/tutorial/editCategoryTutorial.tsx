"use client";
import Button from "@/components/button/Button";
import Modal from "@/components/Modal";
import { updateCategoryTutorialService } from "@/services/categoryTutorialService";
import { getToken } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface EditCategoryBlogProps {
  refreshData?: () => void;
  data: any;
}

export default function EditCategoryTutorial({
  refreshData,
  data,
}: EditCategoryBlogProps) {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setLang(data.lang);
  }, [data]);

  async function updateEditCategoryTutorial() {
    setIsloading(true);
    setDisabled(true);
    const token: string = getToken() ?? "";
    const result: any = await updateCategoryTutorialService(
      { id, title, description, lang },
      token
    );

    if (result.data.code == 200) {

      const modal:any = document.getElementById("modalEditCategoryTutorial")
      modal.close();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });

      if(refreshData!=undefined){
        refreshData();

      }
      setIsloading(false);
      setDisabled(false);
      setTitle("");
      setDescription("");
      setLang("");
    } else {

      const modal:any = document.getElementById("modalEditCategoryTutorial")
      modal.close();
      
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: result.data.message,
      });

      if(refreshData!=undefined){
        refreshData();

      }
      setIsloading(false);
      setDisabled(false);
      setTitle("");
      setDescription("");
      setLang("");
    }
  }

  return (
    <Modal id="modalEditCategoryTutorial" title="Edit Category Tutorial">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateEditCategoryTutorial();
        }}
        method="POST"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input block input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-control w-full block">
          <label className="label">
            <span className="label-text">Languange</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            required
          >
            <option selected value="">
              --SELECT LANGUANGE--
            </option>
            <option value="ID">Indonesia</option>
            <option value="EN">English</option>
          </select>
        </div>

        <div className="grid justify-items-end mt-5">
          <Button variant="primary" isLoading={isLoading} disabled={disabled}>
            Update
          </Button>
        </div>
      </form>
    </Modal>
  );
}
