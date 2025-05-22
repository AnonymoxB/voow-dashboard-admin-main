"use client";
import Button from "@/components/button/Button";
import { getListUsers } from "@/services/userService";
import { IListUserResponseData, Users } from "@/types/user";
import { getToken } from "@/utils/auth";
import React, { useEffect, useMemo, useState } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import Table from "@/components/table/Table";
import { useRouter } from "next/navigation";

export default function Page() {
  const [users, setUsers] = useState<Array<Users>>([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function getListUserData() {
    const token: string = getToken() ?? "";
    const userData: any = await getListUsers(token);
    const { data }: { data: IListUserResponseData } = userData;
    return data.data.items;
  }

  async function refreshData() {
    setIsPending(true);
    const userData: any = await getListUserData();
    setUsers(userData);
    setIsPending(false);
  }

  useEffect(() => {
    async function getAllUserData() {
      setIsPending(true);
      const userData: any = await getListUserData();
      setUsers(userData);
      setIsPending(false);
    }
    getAllUserData();
  }, []);

  const columnHelper = createColumnHelper<Users>();

  const usersColumnDefs = useMemo<ColumnDef<Users>[]>(
    () => [
      columnHelper.accessor((row: any) => row.id, {
        id: "id",
        cell: (info: any) => info.getValue(),
        header: (info: any) => <span>#</span>,
      }),
      columnHelper.accessor((row: any) => row.name, {
        id: "name",
        cell: (info: any) => info.getValue(),
        header: (info: any) => <span>Name</span>,
      }),
      columnHelper.accessor((row: any) => row.email, {
        id: "email",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Email</span>,
      }),
      columnHelper.accessor((row: any) => row.phone_number, {
        id: "phone_number",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Phone Number</span>,
      }),
      columnHelper.accessor((row: any) => row, {
        id: "Action",
        cell: (info: any) => (
          <>
            <div className="flex justify-start">
              <Button variant="warning" marginRight="mr-2">
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
              <Button variant="success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
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

  return (
    <>
      <div className="flex space-x-5 md:space-x-10 text-gray-500 items-center content-center justify-end text-base pt-8">
        <Button
          variant="primary"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          }
          typeButton="button"
          onClick={refreshData}
        >
          Refresh
        </Button>
      </div>

      <section className="">
        <div className="card w-50 bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <div className="card-title">Data Users</div>
            <div className="flex text-gray-500 text-base pt-8">
              {!isPending ? (
                <Table data={users} columns={usersColumnDefs}></Table>
              ) : (
                <span className="loading loading-bars loading-lg text-center"></span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
