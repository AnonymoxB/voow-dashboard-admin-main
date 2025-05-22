"use client"
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import Blog from "./blog";
import CategoryBlog from "./categoryBlog";

export default function Page() {
  const [openTab, setOpenTab] = useState(2);
  const { user } = useAuth();


  useEffect(() => { }, [user]);

  return (
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
              }} className={"tab tab-bordered" + (openTab === 2 ? "" : "tab-active")}>Blog</a>
            </div>

            <div className={(openTab === 1 ? "block" : "hidden")}>
              <CategoryBlog></CategoryBlog>
            </div>
            <div className={(openTab === 2 ? "block" : "hidden")}>
              <Blog></Blog>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
