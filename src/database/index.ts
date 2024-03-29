import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';

const expo = openDatabaseSync('db.sqlite');
export default drizzle(expo);
