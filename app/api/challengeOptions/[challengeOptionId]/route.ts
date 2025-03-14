import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const id = Number(params.challengeOptionId);
  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, id),
  });
  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const id = Number(params.challengeOptionId);
  const body = await req.json();
  const data = await db
    .update(challengeOptions)
    .set({ ...body })
    .where(eq(challengeOptions.id, id))
    .returning();
  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { challengeOptionId: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const id = Number(params.challengeOptionId);
  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, id))
    .returning();
  return NextResponse.json(data[0]);
}
