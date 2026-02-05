import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const db = getDb();
  const { rows } = await db`SELECT * FROM posts ORDER BY updated_at DESC`;
  return NextResponse.json({ blobs: rows });
}

export async function POST(request: Request) {
  await initDb();
  const db = getDb();
  const { name } = await request.json();
  const sanitized = name.replace(/[^a-zA-Z0-9-_]/g, "");

  if (!sanitized) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  await db`
    INSERT INTO posts (name, content, created_at, updated_at)
    VALUES (${sanitized}, '', NOW(), NOW())
    ON CONFLICT (name) DO NOTHING
  `;

  return NextResponse.json({ name: sanitized });
}
