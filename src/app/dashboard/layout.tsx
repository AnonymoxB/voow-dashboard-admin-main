import './../../../public/css/style.css';

import { ReactNode } from 'react'
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'
import { AuthProvider } from '@/context/AuthContext';


function layout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <div className="flex min-h-screen 2xl:max-w-7xl 2xl:mx-auto 2xl:border-x-2 2xl:border-indigo-50 ">
                <Sidebar />
                <main className="bg-indigo-50/60 w-full py-10 px-3 sm:px-10" >
                    <Topbar />
                    {children}
                </main>
            </div>
        </AuthProvider>
    )
}

export default layout