import { DiscountType } from "@/lib/types/fetchTypes/discount"
import Discount from "@/models/Discount"
import { NextRequest, NextResponse } from "next/server"
import { apiMiddleware } from "../../middleware"


export async function PUT(req: NextRequest, {params}: {params: {discountid: string}}) {
    const { discountid } = params
    const body:DiscountType = await req.json()
    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const [response, err] = await Discount.update(parseInt(discountid), body)
    if (!response) return NextResponse.json({err}, {status: 500})
    return NextResponse.json(response)
}

export async function DELETE(req: NextRequest, {params}: {params: {discountid: string}}) {
    const { discountid } = params
    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const [response, err] = await Discount.delete(parseInt(discountid))
    if (!response) return NextResponse.json({err}, {status: 500})
    return NextResponse.json(response)
}