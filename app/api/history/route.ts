
import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const { userId } = await auth()
        if(!userId) {
            return NextResponse.json({
                error: "Unauthorised"
            }, {
                status: 401
            })
        }

        const images = await prisma.imageHistory.findMany({
            where: {userId},
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({
            images
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Server error"
        }, {
            status: 500
        })
    }
} 