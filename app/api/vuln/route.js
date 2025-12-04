import { NextResponse } from "next/server";

export async function POST(req) {
  let body;
  try {
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = { input: form.get("input") };
    }
  } catch (e) {
    body = { input: null };
  }

  return NextResponse.json({
    received: body.input,
    vulnerable: true
  });
}

