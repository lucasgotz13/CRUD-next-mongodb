import {connect, connection} from "mongoose";

const conn: {isConnected: Boolean | number} = {
    isConnected: false
}

export default async function connectDB() {
    if (conn.isConnected) return;

    const db = await connect(process.env.MONGODB_URI || "")
    console.log(db.connection.db.databaseName)
    conn.isConnected = db.connections[0].readyState
}

connection.on("connected", () => {
    console.log("MongoDB is connected")
})

connection.on("error", (err) => {
    console.log("Mongoose connection error:", err)
})
