import { DiscountType } from "@/lib/types/fetchTypes/discount";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../middleware";
import { Discount } from "@/models/Discount";

export async function POST(req: NextRequest) {
    const body:DiscountType = await req.json()
    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const [response, err] = await Discount.add(body)
    if (!response) return NextResponse.json({err}, {status: 500})
    return NextResponse.json(response)
}