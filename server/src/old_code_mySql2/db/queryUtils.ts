import type { ResultSetHeader } from "mysql2";

import pool from "./connections";


//select
export async function SelectQuery<T>(
  queryString: string,
  params?: string[]
): Promise<Partial<T[]>> {
  const [results] = await pool.execute(queryString, params);
  return results as T[];
}

// insert / update / delete
export async function ModifyQuery<T>(
  queryString: string,
  params?: T[],
): Promise<ResultSetHeader> {
  const [results] = await pool.query(queryString, params);
  return results as ResultSetHeader;
}

// pool.beginTransaction







