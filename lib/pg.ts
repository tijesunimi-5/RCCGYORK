import { Pool} from "pg"

if (!process.env.DATABASE_URL) {
  // It's crucial to check for the environment variable before connecting
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Create a pool of database clients to efficiently manage connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
