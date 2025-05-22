"use client";

import { login } from "@/services/userService";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      setIsLoading(true);
      const result: any = await login({ email, password });
      if (result?.data.code != 200) {
        setError(result?.data.message);
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        setToken(result.data.data.token);
      }
    } catch (error) {
      console.error("error : " + error);
    }
  }

  return (
    <div>
      {!!error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        method="POST"
      >
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full px-4 py-2 flex items-center justify-center rounded-md flex items-center space-x-24 rounded mt-5 bg-indigo-100 text-indigo-500 hover:bg-indigo-200"
          disabled={isLoading}
        >
          <span className="items-center">
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Masuk"
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
