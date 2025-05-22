"use client";
import Button from "@/components/button/Button";
import Table from "@/components/table/Table";
import {
  CategoryTutorial,
  ResponseCategoryTutorial,
  ResponseCategoryTutorialShow,
} from "@/types/categoryTutorial";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createColumnHelper,ColumnDef } from "@tanstack/react-table";
import { getToken } from "@/utils/auth";
import {
  deleteCategoryTutorialService,
  getAllTutorialCategoryService,
  showCategoryTutorialService,
} from "@/services/categoryTutorialService";
import AddCategoryTutorial from "./addCategoryTutorial";
import Swal from "sweetalert2";
import EditCategoryTutorial from "./editCategoryTutorial";

export default function CategoryTutorial() {
  const [categoryTutorial, setCategoryTutorial] = useState([]);

  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [categoryTutorialDataShow, setCategoryTutorialDataShow] = useState({});
  const [showModal, setShowModal] = useState(false);

  const columnHelper = createColumnHelper<CategoryTutorial>();

  async function getAllCategoryTutorial() {
    const token: string = getToken() ?? "";
    const result: any = await getAllTutorialCategoryService(token);
    const { data }: { data: CategoryTutorial } = result;
    return data;
  }

  async function deleteCategoryBlog(id: number) {
    const token: string = getToken() ?? "";
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const result: any = await deleteCategoryTutorialService(id, token);
        return result;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result: any) => {
      if (result.isConfirmed && result.value.data.code == 200) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setIsLoading(false);
        setDisabled(false);
        refreshData();
      } else {
        setIsLoading(false);
        setDisabled(false);
      }
    });
  }

  async function refreshData() {
    const data: any = await getAllCategoryTutorial();
    setCategoryTutorial(data.data.items);
  }


  const categoryTutorialColumnDefs = useMemo<ColumnDef<CategoryTutorial>[]>(
    () => [
      columnHelper.accessor((row: any) => row.id, {
        id: "id",
        cell: (info: any) => info.getValue(),
        header: (info: any) => <span>#</span>,
      }),
      columnHelper.accessor((row: any) => row.title, {
        id: "title",
        cell: (info: any) => info.getValue(),
        header: (info: any) => <span>Title</span>,
      }),
      columnHelper.accessor((row: any) => row.description, {
        id: "description",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Description</span>,
      }),
      columnHelper.accessor((row: any) => row.lang, {
        id: "lang",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Languange</span>,
      }),
      columnHelper.accessor((row: any) => row, {
        id: "Action",
        cell: (info: any) => (
          <>
            <div className="flex justify-start">
              <Button
                variant="warning"
                marginRight="mr-2"
                isLoading={isLoading}
                disabled={disabled}
                onClick={() => showEditData(info.getValue().slug)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4"
                >
                  <path
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCategoryBlog(info.getValue().id)}
                isLoading={isLoading}
                disabled={disabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4"
                >
                  <path
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          </>
        ),
        header: () => <span>Action</span>,
      }),
    ],
    []
   );

  useEffect(() => {
    async function dataAllCategoryTutorial() {
      const data: any = await getAllCategoryTutorial();
      setCategoryTutorial(data.data.items);
    }
    dataAllCategoryTutorial();
    setIsPending(false);
  }, []);

  const showEditData = useCallback(
    async (slug: string) => {
      const token: string = getToken() ?? "";
      setShowModal(true);
      const result: any = await showCategoryTutorialService(slug, token);
      const { data }: { data: ResponseCategoryTutorialShow } = result;

      setCategoryTutorialDataShow(data.data.item);

      const modal: any = document.getElementById("modalEditCategoryTutorial");
      modal.showModal();
    },
    [categoryTutorialDataShow]
  );

  async function showModalAdd() {
    const modal: any = document.getElementById("modalAddCategoryTutorial");
    modal.showModal();
  }

  return (
    <>
      <div className="flex space-x-5 md:space-x-10 text-gray-500 items-center content-center justify-end text-base pt-8">
        <Button
          variant="primary"
          iconLeft={
            <svg
              className="h-5 w-5 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          }
          typeButton="button"
          onClick={showModalAdd}
        >
          Create New
        </Button>
      </div>

      <section className="">
        <div className="flex text-gray-500 text-base pt-8">
          {!isPending ? (
            <Table
              data={categoryTutorial}
              columns={categoryTutorialColumnDefs}
            ></Table>
          ) : (
            <span className="loading loading-bars loading-lg text-center"></span>
          )}
        </div>
      </section>

      {/* modal add */}
      <AddCategoryTutorial refreshData={refreshData}></AddCategoryTutorial>

      {showModal ? (
        <EditCategoryTutorial
          refreshData={refreshData}
          data={categoryTutorialDataShow}
        ></EditCategoryTutorial>
      ) : null}
    </>
  );
}
