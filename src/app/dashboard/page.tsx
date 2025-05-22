"use client";
import BadgeTransaction from "@/components/BadgeTransaction";
import Button from "@/components/button/Button";
import Card from "@/components/card/Card";
import { useAuth } from "@/context/AuthContext";
import { getCountDashboardData } from "@/services/dashboardService";
import { getListTransaction } from "@/services/transactionService";
import { Count, GetCountDashboardResponse } from "@/types/dashboard";
import { IGetTransaction, Transaction } from "@/types/transaction";
import { getToken } from "@/utils/auth";
import { formatCurrencyToIDR, truncateText } from "@/utils/text";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState<Count>();
  const [transaction, setTransaction] = useState<Array<Transaction>>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {}, [user]);

  async function refreshData() {
    const data: any = await getCountDataAPI();
    setCount(data);
  }

  async function getCountDataAPI() {
    const token: string = (await getToken()) ?? "";
    const countData: any = await getCountDashboardData(token);
    const { data }: { data: GetCountDashboardResponse } = countData;
    return data.data.count;
  }

  async function getNewTransaction() {
    const token: string = (await getToken()) ?? "";
    const transactionData: any = await getListTransaction(token, 5);
    const { data }: { data: IGetTransaction } = transactionData;
    return data.data.items;
  }

  useEffect(() => {
    async function countData() {
      const dataCount: any = await getCountDataAPI();
      setCount(dataCount);
    }
    countData();

    async function getAllTransactionData() {
      setIsPending(true);
      const transactionData: any = await getNewTransaction(); 
      setTransaction(transactionData);
      setIsPending(false);
    }
    getAllTransactionData();
  }, []);

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

      <div className="flex flex-row mt-10">
        <div className="basis-1/4 mr-2">
          <Card
            title="Users"
            subtitle={count?.user ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            }
          ></Card>
        </div>
        <div className="basis-1/4 mr-2">
          <Card
            title="Transaction"
            subtitle={count?.transaction ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            }
          ></Card>
        </div>
        <div className="basis-1/4 mr-2">
          <Card
            title="Blog"
            subtitle={count?.blog ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            }
          ></Card>
        </div>
        <div className="basis-1/4">
          <Card
            title="Tutorial"
            subtitle={count?.tutorial ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            }
          ></Card>
        </div>
      </div>
      <div className="flex flex-row mt-2">
        <div className="basis-1/4 mr-2">
          <Card
            title="Template"
            subtitle={count?.template ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                />
              </svg>
            }
          ></Card>
        </div>
        <div className="basis-1/4 mr-2">
          <Card
            title="Faq"
            subtitle={count?.faq ?? 0}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            }
          ></Card>
        </div>
      </div>
      <section className="">
        <div className="bg-rose-100/70 mt-7 rounded-xl px-5 sm:px-10 pt-4 pb-4 relative">
          <div className="text-rose-400 font-semibold text-lg">
            Welcome, {user?.name ?? "Admin"}
          </div>
        </div>
      </section>
      <section className="">
        <section className="">
          <div className="invoice-table-row invoice-table-header bg-white mt-7 rounded-xl px-5 sm:px-10 pt-4 pb-4 relative shadow">
            <div className="text-black-400 font-semibold text-md">
              5 New Transaction
            </div>
          </div>
        </section>

        <div className="invoice-table-row invoice-table-header bg-white mt-3 rounded-xl px-10  py-4 flex items-center gap-x-3 text-sm font-semibold  text-gray-600">
          <div className="text-left">Invoice</div>
          <div className="text-left">Client name</div>
          <div className="text-center">Email</div>
          <div className="text-center ">date</div>
          <div className="text-right">Total</div>
          <div className="flex-1  text-center">Status</div>
        </div>
        {/* /Table Header */}
        {/* Table Body */}
        <div className="bg-white mt-5 rounded-xl text-sm  text-gray-500 divide-y divide-indigo-50 overflow-x-auto  shadow">
          {!!transaction
            ? transaction.map((item: Transaction) => (
                <>
                  <div className="invoice-table-row flex items-center gap-x-3 px-10 py-4">
                    <div className="text-left">
                      {truncateText(item.invoice, 10)}
                    </div>
                    <div className="text-left">{item.name}</div>
                    <div className="text-center">{item.email}</div>
                    <div className="text-center">2019/12/20</div>
                    <div className="text-right">
                      {formatCurrencyToIDR(item.price_total)}
                    </div>
                    <div className="text-center ">
                      <BadgeTransaction status={item.status as "Pending" | "Success" | "Failed" | undefined}>
                        {item.status}
                      </BadgeTransaction>
                    </div>
                  </div>
                </>
              ))
            : "....."}
        </div>
        {/* /Table Body */}
      </section>
      {/* /Invoice List Table */}
    </>
  );
}
