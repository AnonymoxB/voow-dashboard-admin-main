'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import CategoryTutorial from './categoryTutorial';
import Tutorial from './tutorial';

export default function Page() {
    const [openTab, setOpenTab] = useState(2);
    const { user } = useAuth();


    useEffect(() => {  }, [user]);
  return (
    <div>
      <section>
        <div className="card w-50 bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <div className="tabs">
              <a onClick={e => {
                e.preventDefault();
                setOpenTab(1)
              }} className={"tab tab-bordered" + (openTab === 1 ? "" : "tab-active")}>Category Tutorial</a>
              <a onClick={e => {
                e.preventDefault();
                setOpenTab(2)
              }} className={"tab tab-bordered" + (openTab === 2 ? "" : "tab-active")}>Tutorial</a>
            </div>

            <div className={(openTab === 1 ? "block" : "hidden")}>
               <CategoryTutorial></CategoryTutorial>
            </div>
            <div className={(openTab === 2 ? "block" : "hidden")}>
                <Tutorial></Tutorial>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
