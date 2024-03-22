import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import Task from "@/models/Task";


export async function GET(request: any, {params}: {params: any}) {
    connectDB()
    const {id} = params
    try {
        const result = await Task.findOne({_id: id})
        return NextResponse.json({
            message: "Obteniendo tarea",
            payload: result
        })
        
    } catch (err) {
        console.log("Task wasn't found: ",err)   
        return NextResponse.json({message: "ERROR"}, {status: 404})
    }
}

export async function PUT(request: any, {params}: {params: any}) {
    connectDB()
    const {id} = params
    const data = await request.json()

    try {
        const result = await Task.updateOne({_id: id}, data)
        return NextResponse.json({
            message: "Task updated",
            payload: result
        })
        
    } catch (err) {
        console.log("Task wasn't found: ",err)   
        return NextResponse.json({message: "ERROR"}, {status: 404})
    }
}

export async function DELETE(request: any, {params}: {params: any}) {
    connectDB()
    const {id} = params
    try {
        const result = await Task.deleteOne({_id: id})
        return NextResponse.json({
            message: "Deleted task",
            payload: result
        })
        
    } catch (err) {
        console.log("Task wasn't found: ",err)   
        return NextResponse.json({message: "ERROR"}, {status: 404})
    }
}