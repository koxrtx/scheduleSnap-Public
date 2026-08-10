// ログイン後のページ
'use client';

import { useRouter } from 'next/navigation';
// 画面が表示された後に、この処理を実行する」ためのReactの機能
import { useEffect } from "react";
import LogoutButton from '@/components/LogoutButton';

import type { AppType } from '../../../../backend/src/index.ts';
import { hc } from 'hono/client'

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

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
        {/* hiddenでボタンを非表示にしてる CRUD処理設計できたらその後復活 */}
        <button className="hidden mt-4 border-2 border-dashed border-black rounded-md px-6 py-3" onClick={() => {
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
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const res = await client.api.v1.image.upload.$post({
              form: {
                file,
              },
            });
            if (res.ok) {
              const data = await res.json();
              console.log(data.message);
            }
          }}

        />
        <LogoutButton />
      </div>
    </main>
  );
}
