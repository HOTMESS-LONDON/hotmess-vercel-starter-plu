import { NextResponse } from "next/server";
import schedule from "../../../data/schedule.json";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET() { return NextResponse.json(schedule); }
