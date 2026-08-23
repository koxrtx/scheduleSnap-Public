'use client';

import { SubmitEvent, useState } from 'react';

type Schedule = {
  id: number;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
};

export default function NewSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
      {
        method: 'POST',
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
      }
    );

    const newSchedule = await res.json();

    setSchedules((currentSchedules) => [
      ...currentSchedules,
      newSchedule[0],
    ]);
  }

  return (
    <main className="min-h-screen pt-20 px-4">
      <form onSubmit={onSubmit}>
        <div className="mx-auto max-w-5xl border border-black rounded-md p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="title"
              placeholder="タイトル"
              className="border border-black rounded-md px-3 py-2 flex-1"
            />

            <input
              type="date"
              name="event_date"
              className="border border-black rounded-md px-3 py-2"
            />

            <input
              type="time"
              name="start_time"
              defaultValue="13:00"
              className="border border-black rounded-md px-3 py-2"
            />

            <span>〜</span>

            <input
              type="time"
              name="end_time"
              defaultValue="14:00"
              className="border border-black rounded-md px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 mx-auto block border border-black rounded-md px-6 py-2"
        >
          登録する
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-6">
          登録したスケジュール
        </h2>

        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="w-full max-w-md border border-black rounded-md p-4 mb-4"
          >
            <p className="font-bold">{schedule.title}</p>
            <p>{schedule.event_date}</p>
            <p>
              {schedule.start_time}〜{schedule.end_time}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}