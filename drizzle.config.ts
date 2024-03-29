import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schema.ts',
  out: './src/drizzle',
  driver: 'expo',
} satisfies Config;
