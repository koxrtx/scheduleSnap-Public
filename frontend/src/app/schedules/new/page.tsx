'use client';

import { SubmitEvent } from 'react';

// RPC
import type { AppType } from '../../../../../backend/src/app.ts';
import { hc } from 'hono/client';

const client = hc<AppType>(
  process.env.NEXT_PUBLIC_API_URL!,
  {
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
      fetch(input, {
        ...init,
        credentials: "include",
      }),
  }
);

export default function NewSchedulePage() {
  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);


    const res = await client.api.v1.schedules.$post({
      json: {
        title: formData.get('title') as string,
        event_date: formData.get('event_date') as string,
        start_time: formData.get('start_time') as string,
        end_time: formData.get('end_time') as string,
      },
    });
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
    </main>
  );
}