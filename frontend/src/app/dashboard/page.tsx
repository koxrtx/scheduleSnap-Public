// ログイン後のページ

'use client';
import { useRouter } from 'next/navigation';
// 画面が表示された後に、この処理を実行する」ためのReactの機能
import { useEffect } from "react";
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth-check`,
        {
          credentials: "include"
        }
      );
      if (!res.ok) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

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
