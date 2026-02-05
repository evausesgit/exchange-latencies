import { NextResponse } from "next/server";
import { initDb, getDb } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  await initDb();
  const { name } = await params;
  const db = getDb();
  const { rows } = await db`SELECT * FROM posts WHERE name = ${name}`;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  await initDb();
  const { name } = await params;
  const db = getDb();
  const { content } = await request.json();

  await db`
    INSERT INTO posts (name, content, created_at, updated_at)
    VALUES (${name}, ${content}, NOW(), NOW())
    ON CONFLICT (name) DO UPDATE SET content = ${content}, updated_at = NOW()
  `;

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  await initDb();
  const { name } = await params;
  const db = getDb();
  const { rowCount } = await db`DELETE FROM posts WHERE name = ${name}`;

  if (rowCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
