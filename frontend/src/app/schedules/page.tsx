'use client';

import { useEffect, useState } from 'react';

type Schedule = {
  id: number;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
};

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    async function fetchSchedules() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/schedules`,
        {
          credentials: 'include',
        }
      );

      const data = await res.json();

      setSchedules(data);
    }

    fetchSchedules();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center pt-20">
      <h1 className="text-2xl font-bold mb-6">スケジュール一覧</h1>

      {schedules.map((schedule) => (
        <div
        key={schedule.id}
        className="w-full max-w-md border border-black rounded-md p-4 mb-4">
          <p className="font-bold">{schedule.title}</p>
          <p>{schedule.event_date}</p>
          <p>
            {schedule.start_time}〜{schedule.end_time}
          </p>
        </div>
      ))}
    </main>
  );
}