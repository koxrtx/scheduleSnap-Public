import {
  pgTable,
  integer,
  timestamp,
  text,
  varchar,
  time,
  date
} from "drizzle-orm/pg-core"

import { users } from "./schema.js";

export const schedules = pgTable('schedules', {
  id:           integer('id')
                .primaryKey()
                .generatedAlwaysAsIdentity(),
  userId:       text('userId')
                .notNull()
                .references(() => users.id),
  title:        varchar('title', { length: 255 })
                .notNull(),
  event_date:   date('event_date')
                .notNull(),
  start_time:   time('start_time')
                .notNull(),
  end_time:     time('end_time')
                .notNull(),
  created_at:   timestamp('created_at', { mode: 'date' })
                .notNull()
                .defaultNow(),
  updated_at:   timestamp('updated_at', { mode: 'date' })
                .notNull()
                .defaultNow(),
});
