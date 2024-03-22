import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import Task from "@/models/Task"

export async function GET() {
    connectDB()

    const tasks = await Task.find()

    return NextResponse.json(tasks)
}

export async function POST(request: any) {
    connectDB()
    const {title, description} = await request.json()
    console.log(title, description)

    const result = await Task.create({
        title: title,
        description: description
    })
    return NextResponse.json({message: "Objeto creado", payload: result})
}