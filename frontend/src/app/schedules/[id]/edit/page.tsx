'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Schedule = {
  id: number;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
};

export default function EditSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules/${id}`,
        {
          credentials: 'include',
        },
      );

      const data = await res.json();

      setSchedule(data);
    }

    fetchSchedule();
  }, [id]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.get('title') as string,
          event_date: formData.get('event_date') as string,
          start_time: formData.get('start_time') as string,
          end_time: formData.get('end_time') as string,
        }),
      },
    );

    const updatedSchedule = await res.json();

    console.log('更新結果:', updatedSchedule);
    router.push('/schedules');
  }

  if (!schedule) {
    return <p>読み込み中...</p>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center pt-20">
      <h1 className="text-2xl font-bold mb-6">スケジュール編集</h1>

      <form onSubmit={onSubmit} className="w-full max-w-md">
        {/* タイトル */}
        <input
          type="text"
          name="title"
          defaultValue={schedule.title}
          className="w-full border border-black rounded-md px-3 py-2 mb-4"
        />

        {/* 日付 */}
        <input
          type="date"
          name="event_date"
          defaultValue={schedule.event_date}
          className="w-full border border-black rounded-md px-3 py-2 mb-4"
        />

        {/* ★開始時間 */}
        <input
          type="time"
          name="start_time"
          defaultValue={schedule.start_time}
          className="w-full border border-black rounded-md px-3 py-2 mb-4"
        />

        {/* 終了時間 */}
        <input
          type="time"
          name="end_time"
          defaultValue={schedule.end_time}
          className="w-full border border-black rounded-md px-3 py-2 mb-4"
        />

        {/* 更新ボタン */}
        <button
          type="submit"
          className="mx-auto block border border-black rounded-md px-6 py-2"
        >
          更新する
        </button>
      </form>
    </main>
  );
}
