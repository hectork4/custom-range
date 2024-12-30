import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    min: 0, 
    max: 100 
  });
}