"use client";

import Button from "@/components/button/Button";
import Modal from "@/components/Modal";
import { storeCategoryBlogService } from "@/services/categoryBlogService";
import { getToken } from "@/utils/auth";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface AddCategoryBlogProps {
  refreshData?: () => void;
}

export default function AddCategoryBlog({ refreshData }: AddCategoryBlogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lang, setLang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  async function sumbitCategoryBlog() {
    setIsLoading(true);
    setDisabled(true);
    const token: string = getToken() ?? "";
    const result: any = await storeCategoryBlogService(
      { title, description, lang },
      token
    );

    if (result.data.code == 200) {
      setIsLoading(false);
      const modal: any = document.getElementById("modalAddCategoryBlog");
      if (modal !== null) {
        modal.close();
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });

      if (refreshData !== undefined) {
        refreshData();
      } else {
        console.error("refreshData is not defined");
      }
      
    } else {
      const modal: any = document.getElementById("modalAddCategoryBlog");
      if (modal !== null) {
        modal.close();
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.data.message,
      });
    }
  }

  return (
    <Modal id="modalAddCategoryBlog" title="Add Category Blog">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sumbitCategoryBlog();
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
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
