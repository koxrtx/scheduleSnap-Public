// ログイン後のページ

'use client';
import { useSession } from '@hono/auth-js/react';
import { useRouter } from 'next/navigation';
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
      <div className="text-center flex flex-col items-center">
        <p>園からもらった予定表を</p>
        <p>カレンダーに登録しよう</p>
        <button className="mt-4 border-2 border-dashed border-black rounded-md px-6 py-3" onClick={() => {
        // ボタンがクリックされたときに実行する処理
          document.getElementById("schedule-image")?.click();
        }}
        >
      <span>
        予定表を読み込む
      </span>
    </button>
        <input
          type="file"
          id="schedule-image"
          name="schedule-image"
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        <LogoutButton />
      </div>
    </main>
  );
}
