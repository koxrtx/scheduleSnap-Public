import {
  pgTable,
  integer,
  timestamp,
  text,
  varchar
} from "drizzle-orm/pg-core"

import { users } from "./schema.js";

export const keyword_settings = pgTable('keyword_settings', {
  id:           integer('id')
                .primaryKey()
                .generatedAlwaysAsIdentity(),
  userId:       text('userId')
                .notNull()
                .references(() => users.id),
  keyword:      varchar('keyword', { length: 255 })
                .notNull(),
  created_at:   timestamp('created_at', { mode: 'date' })
                .notNull()
                .defaultNow(),
  updated_at:   timestamp('updated_at', { mode: 'date' })
                .notNull()
                .defaultNow(),
});
