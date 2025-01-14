"use client"

import Profile from "../components/Profile";
import Auth0CodeForm from '@/components/Auth0Form';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <a href="/api/auth/login">Login</a>
        <br/>
        <a href="/api/auth/logout">Logout</a>

        <Auth0CodeForm />
        <Profile />
      </main>
    </div>
  );
}
