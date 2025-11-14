import { Pool} from "pg"

if (!process.env.PG_CONNECTION_STRING) {
  // It's crucial to check for the environment variable before connecting
  throw new Error("PG_CONNECTION_STRING is not set in environment variables");
}

// Create a pool of database clients to efficiently manage connections
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

export default pool;
