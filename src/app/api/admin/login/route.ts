import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredUsername || !configuredPassword) {
    return NextResponse.json({ error: "Admin não configurado" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (
    body?.username !== configuredUsername ||
    body?.password !== configuredPassword
  ) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = await createAdminSessionToken(configuredUsername, configuredPassword);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}