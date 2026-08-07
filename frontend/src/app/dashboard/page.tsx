// ログイン後のページ

"use client";
import { useSession } from "@hono/auth-js/react";
import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  // カメラ起動あたりで使う？
  // 使わないなら削除
  // useEffect(() => {
    // if (session) {
      // router.push("/dashboard");
    // }
  // }, [session, router]);

  return (
    <main className="min-h-screen flex justify-center pt-20">
      <div className="text-center">
        <LogoutButton />
      </div>
    </main>
  );
}
