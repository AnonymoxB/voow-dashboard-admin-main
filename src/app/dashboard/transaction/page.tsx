"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import Table from "@/components/table/Table";
import { useRouter } from "next/navigation";
import { IGetTransaction, Transaction } from "@/types/transaction";
import { getToken } from "@/utils/auth";
import { getListTransaction } from "@/services/transactionService";
import Button from "@/components/button/Button";
import { formatCurrencyToIDR, truncateText } from "@/utils/text";
import BadgeTransaction from "@/components/BadgeTransaction";

export default function Page() {
  const [transaction, setTransaction] = useState<Array<Transaction>>([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function getListTransactions() {
    const token: string = getToken() ?? "";
    const transactionData: any = await getListTransaction(token,0);
    console.log(transactionData)
    const { data }: { data: IGetTransaction } = transactionData;
    return data.data.items;
  }

  async function refreshData() {
    setIsPending(true);
    const transactionData: any = await getListTransactions();
    setTransaction(transactionData);
    setIsPending(false);
  }

  useEffect(() => {
    async function getAllTransactionData() {
      setIsPending(true);
      const transactionData: any = await getListTransactions();
      setTransaction(transactionData);
      setIsPending(false);
    }
    getAllTransactionData();
  }, []);

  const columnHelper = createColumnHelper<Transaction>();

  const transactionColumnDefs = useMemo<ColumnDef<Transaction>[]>(
    () => [
      columnHelper.accessor((row: any) => row.invoice, {
        id: "Invoice",
        cell: (info: any) => truncateText( info.getValue(),5),
        header: (info: any) => <span>#</span>,
      }),
      columnHelper.accessor((row: any) => row.name, {
        id: "name",
        cell: (info: any) => info.getValue(),
        header: (info: any) => <span>Name</span>,
      }),
      columnHelper.accessor((row: any) => row.email, {
        id: "email",
        cell: (info: any) => <span>{truncateText( info.getValue(),5)}</span>,
        header: () => <span>Email</span>,
      }),
      columnHelper.accessor((row: any) => row.phone_number, {
        id: "phone_number",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Phone Number</span>,
      }),
      columnHelper.accessor((row: any) => row.package.name, {
        id: "package",
        cell: (info: any) => <span>{info.getValue()}</span>,
        header: () => <span>Package</span>,
      }),
      columnHelper.accessor((row: any) => row.status, {
        id: "status",
        cell: (info: any) => (
          <BadgeTransaction status={info.getValue()}>
            {" "}
            {info.getValue()}{" "}
          </BadgeTransaction>
        ),
        header: () => <span>Status</span>,
      }),
      columnHelper.accessor((row: any) => row.price_total, {
        id: "price_total",
        cell: (info: any) => (
          <span>{formatCurrencyToIDR(info.getValue())}</span>
        ),
        header: () => <span>Total Price</span>,
      }),
      columnHelper.accessor((row: any) => row.invoice_url, {
        id: "invoice",
        cell: (info: any) => (
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
            typeButton="button"
            onClick={()=> {
              window.open(
                info.getValue(),
                '_blank' // <- This is what makes it open in a new window.
              );
            }}
          >
            See Invoice
          </Button>
        ),
        header: () => <span>Invoice</span>,
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
            <div className="card-title">Data Transactions</div>
            <div className="flex text-gray-500 text-base pt-8">
              {!isPending ? (
                <Table
                  data={transaction}
                  columns={transactionColumnDefs}
                ></Table>
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
