'use client'
import { getProfileAPI, logoutUser } from "@/services/userService";
import { IAdminData, IGetProfileResponseData } from "@/types/user";
import clearCookie from "@/utils/auth";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
    isLoading: boolean;
    user: IAdminData | null;
    authToken?: string;
    login: (userID: string, password: string) => void;
    logout: () => void;
    getProfile: () => void;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

function AuthProvider({ children }: any) {

    const router = useRouter();
    const [user, setUser] = useState<IAdminData | null>(null);
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        getProfile();
    }, [])

    async function logout() {
        const token = getToken();
        if (token) {
            await logoutUser(token);
        }
        setUser(null);
        setAuthToken('');
        clearCookie();
        router.push('/login');
    }

    async function getProfile() {
        const token = getToken();
        if (token) {
            setAuthToken(token);
            const user: any = await getProfileAPI(token);
            const { data }: { data: IGetProfileResponseData } = user;
            if (data.code == 200) {
                setUser(data?.data?.admin);
            } else {
                alert('SESI TELAH HABIS, SILAHKAN LOGIN KEMBALI')
                logout();
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            authToken,
            getProfile,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }; 