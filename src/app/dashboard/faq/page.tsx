"use client";
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import {
  deleteFaq,
  getAllFaq,
  getDetailFaq,
  storeFaq,
  updateFaq,
} from "@/services/faqServicel";
import { getToken } from "@/utils/auth";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { DataRow } from "@/types/faq";
import Badge from "@/components/Badge";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/table/Table";
import { ColumnDef } from '@tanstack/react-table';

export default function Page() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [lang, setLang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [faq, setFaq] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editLang, setEditLang] = useState("");
  const [editId, setEditId] = useState("");
  const [editStatus, setEditStatus] = useState("");

  async function submitFaq() {
    setIsLoading(true);
    setDisabled(true);
    const token: string = getToken() ?? "";
    const result: any = await storeFaq({ question, answer, lang }, token);
    if (result.data.code == 400) {
      Swal.fire({
        icon: "error",
        title: result.data.data.message,
        text: "All Field Required!",
      });
    }
    if (result.data.code == 500) {
      Swal.fire({
        icon: "error",
        title: "Something Error",
        text: "Contact Admin For Information!",
      });
    }
    if (result.data.code == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });
      setShowAddModal(false);
      setAnswer("");
      setQuestion("");
      setLang("");
      refreshData();
    }

    setIsLoading(false);
    setDisabled(false);
  }

  async function getFaq() {
    const token: string = getToken() ?? "";
    const result: any = await getAllFaq(token);
    return result?.data?.data?.items;
  }

  async function selectDeleteFaq(id: BigInteger) {
    var id = id;
    const token: string = getToken() ?? "";
    setIsLoading(true);
    setDisabled(true);
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
        const faqDelete = await deleteFaq({ id }, token);
        return faqDelete;
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

  async function showFaq(id: BigInteger) {
    setIsLoading(true);
    setDisabled(true);
    const token: string = getToken() ?? "";
    const detailFaq: any = await getDetailFaq({ id }, token);
    setEditQuestion(detailFaq.data.data.faq.question);
    setEditAnswer(detailFaq.data.data.faq.answer);
    setEditLang(detailFaq.data.data.faq.lang);
    setEditId(detailFaq.data.data.faq.id);
    setEditStatus(detailFaq.data.data.faq.status);
    setShowEditModal(true);
    setIsLoading(false);
    setDisabled(false);
  }

  async function faqUpdate() {
    setIsLoading(true);
    setDisabled(true);
    const token: string = getToken() ?? "";
    const id: string = editId;
    const question: string = editQuestion;
    const answer: string = editAnswer;
    const lang: string = editLang;
    const status: string = editStatus;
    const result: any = await updateFaq(
      { id, question, answer, lang, status },
      token
    );
    if (result.data.code == 400) {
      Swal.fire({
        icon: "error",
        title: result.data.data.message,
        text: "All Field Required!",
      });
    }
    if (result.data.code == 500) {
      Swal.fire({
        icon: "error",
        title: "Something Error",
        text: "Contact Admin For Information!",
      });
    }
    if (result.data.code == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: result.data.message,
      });
      setShowEditModal(false);
      setEditAnswer("");
      setEditQuestion("");
      setEditLang("");
      setEditId("");
      refreshData();
    }

    setIsLoading(false);
    setDisabled(false);
  }

  async function refreshData() {
    const dataFaq = await getFaq();
    setFaq(dataFaq);
  }

  useEffect(() => {
    async function dataAllFaq() {
      const dataFaq = await getFaq();
      setFaq(dataFaq);
    }
    dataAllFaq();

    const timeout = setTimeout(() => {
      setIsPending(false);
    });
    return () => clearTimeout(timeout);
  }, []);

  const columnHelper = createColumnHelper<DataRow>();


  const faqColumnDefs = useMemo<ColumnDef<DataRow>[]>(
    () => [
      columnHelper.accessor((row:any) => row.id, {
        id: "id",
        cell: (info:any) => info.getValue(),
        header: () => <span>#</span>,
      }),
      columnHelper.accessor((row:any) => row.question, {
        id: "question",
        cell: (info:any) => info.getValue(),
        header: () => <span>Question</span>,
      }),
      columnHelper.accessor((row:any) => row.answer, {
        id: "answer",
        cell: (info:any) => <span>{info.getValue()}</span>,
        header: () => <span>Answer</span>,
      }),
      columnHelper.accessor((row:any) => row.lang, {
        id: "lang",
        cell: (info:any) => <span>{info.getValue()}</span>,
        header: () => <span>Languange</span>,
      }),
      columnHelper.accessor((row:any) => row.status, {
        id: "status",
        cell: (info:any) => (
          <Badge status={info.getValue()}>{info.getValue()}</Badge>
        ),
        header: () => <span>Status</span>,
      }),
      columnHelper.accessor((row:any) => row.id, {
        id: "Action",
        cell: (info:any) => (
          <>
            <div className="flex flex-nowrap">
              <div>
                <Button
                  variant="warning"
                  marginRight="mr-1"
                  disabled={disabled}
                  isLoading={isLoading}
                  onClick={() => showFaq(info.getValue())}
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
              </div>
              <div>
                <Button
                  variant="danger"
                  disabled={disabled}
                  isLoading={isLoading}
                  onClick={() => selectDeleteFaq(info.getValue())}
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
            </div>
          </>
        ),
        header: () => <span>Action</span>,
      }),
    ],
    []
   );

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
          onClick={() => setShowAddModal(true)}
        >
          Create New
        </Button>
      </div>

      <section className="">
        <div className="card w-50 bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <div className="card-title">Data FAQ</div>
            <div className="flex text-gray-500 text-base pt-8">
              {!isPending ? (
                <Table data={faq} columns={faqColumnDefs}></Table>
              ) : (
                <span className="loading loading-bars loading-lg text-center"></span>
              )}
            </div>
          </div>
        </div>
      </section>

      {showAddModal ? (
        <>
          <Modal
            title="Tambah Faq"
            buttonUp={
              <Button variant="danger" onClick={() => setShowAddModal(false)}>
                x
              </Button>
            }
            buttonLeft={
              <Button
                variant="danger"
                onClick={() => setShowAddModal(false)}
                marginRight="mr-2"
              >
                Close
              </Button>
            }
            buttonRight={
              <Button
                variant="primary"
                disabled={disabled}
                isLoading={isLoading}
                onClick={submitFaq}
              >
                Save Changes
              </Button>
            }
          >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Question
            </label>
            <textarea
              id="message"
              rows={4}
              className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></textarea>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Answer
            </label>
            <textarea
              id="message"
              rows={4}
              className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            ></textarea>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Languange
            </label>
            <select
              id="countries"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">--SELECT LANGUANGE--</option>
              <option value="ID">Indonesia</option>
              <option value="EN">English</option>
            </select>
          </Modal>
        </>
      ) : null}

      {showEditModal ? (
        <>
          <Modal
            title="Edit Faq"
            buttonUp={
              <Button variant="danger" onClick={() => setShowEditModal(false)}>
                x
              </Button>
            }
            buttonLeft={
              <Button
                variant="danger"
                onClick={() => setShowEditModal(false)}
                marginRight="mr-2"
              >
                Close
              </Button>
            }
            buttonRight={
              <Button
                variant="primary"
                disabled={disabled}
                isLoading={isLoading}
                onClick={faqUpdate}
              >
                Update Changes
              </Button>
            }
          >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Question
            </label>
            <textarea
              id="message"
              rows={4}
              className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Question"
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              required
            ></textarea>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Answer
            </label>
            <textarea
              id="message"
              rows={4}
              className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Answer"
              value={editAnswer}
              onChange={(e) => setEditAnswer(e.target.value)}
              required
            ></textarea>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Languange
            </label>
            <select
              id="countries"
              value={editLang}
              onChange={(e) => setEditLang(e.target.value)}
              className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">--SELECT LANGUANGE--</option>
              <option value="ID">Indonesia</option>
              <option value="EN">English</option>
            </select>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Status
            </label>
            <select
              id="countries"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">--SELECT STATUS--</option>
              <option value="Draft">Draft</option>
              <option value="Publish">Publish</option>
            </select>
          </Modal>
        </>
      ) : null}
    </>
  );
}
