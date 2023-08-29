import { DiscountType } from "@/lib/types/fetchTypes/discount";
import { prisma } from "@/prisma/db";
import { DiscountDirectory } from "@prisma/client";




export class Discount {

    static async getDiscounts(): Promise<[DiscountDirectory[]|null, string]> {
        try {
            const discounts = await prisma.discountDirectory.findMany({
                where: {
                    expireDate: {
                        gte: new Date()
                    }
                }
            })
            
            return [discounts, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async add(updateInfo: DiscountType): Promise<[DiscountDirectory|null, string]> {
        try {
            const discounts = await prisma.discountDirectory.create({
                data: updateInfo,
            })
            
            return [discounts, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async update(discountid: number, updateInfo: DiscountType): Promise<[DiscountDirectory|null, string]> {
        try {
            const discounts = await prisma.discountDirectory.update({
                where: {discountdirectoryid: discountid},
                data: updateInfo,
            })
            
            return [discounts, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async delete(discountid: number): Promise<[DiscountDirectory|null, string]> {
        try {
            const discounts = await prisma.discountDirectory.delete({
                where: {discountdirectoryid: discountid},
            })
            
            return [discounts, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}