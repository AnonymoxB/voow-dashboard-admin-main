"use client"
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Blog from "./paket";
import CategoryBlog from "./categorypaket";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function Page() {

  const [openTab, setOpenTab] = useState(2);
  const { user } = useAuth();
  const router = useRouter();

  const [paket, setpaket] = useState([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/paket');
        const data = await res.json();
        setpaket(data);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => { }, [user]);


  return (
   <>
       <div>
         <section>
           <div className="card w-50 bg-base-100 shadow-xl mt-5">
             <div className="card-body">
               <div className="tabs">
                 <a onClick={e => {
                   e.preventDefault();
                   setOpenTab(1)
                 }} className={"tab tab-bordered" + (openTab === 1 ? "" : "tab-active")}>Category Blog</a>
                 <a onClick={e => {
                   e.preventDefault();
                   setOpenTab(2)
                 }} className={"tab tab-bordered" + (openTab === 2 ? "" : "tab-active")}>Paket</a>
               </div>

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
          onClick={() => router.push("/dashboard/paket/add")}
        >
          Create New
        </Button>
      </div>
   
              <div className={(openTab === 1 ? "block" : "hidden")}>
                  <div className="relative overflow-x-auto">
                   
                    <table className="table table-zebra table-sm shadow">
                      <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>
               </div>
               <div className={(openTab === 2 ? "block" : "hidden")}>
                  <div className="relative overflow-x-auto">
                     {loading ? (
                      <p>Membuat Data</p>
                    ): (
                       <table className="table table-zebra table-sm shadow">
                          <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Nama Deskripsi</th>
                                <th>Deskripsi</th>
                                <th>Harga</th>
                                <th>Harga Promo</th>
                                <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paket.map((paket, index) => (
                              <tr key={paket.id}>
                                <td>{index + 1}</td>
                                <td>{paket.name}</td>
                                <td>{paket.name_desc}</td>
                                <td>{paket.description}</td>
                                <td>{paket.price}</td>
                                <td>{paket.promo_price}</td>
                                <td>
                                  <button className="btn btn-primary">Edit</button>
                                   <button className="btn btn-warning">Hapus</button>
                                </td>
                             
                              </tr>
                             ))}
                          </tbody>
                        </table>
                    )}
                       
                      </div>
                  </div>
             </div>
           </div>
         </section>
       </div>
   
   
 

     
   
    </>
  );
}
