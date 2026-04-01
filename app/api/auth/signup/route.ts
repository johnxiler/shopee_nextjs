import { NextResponse } from "next/server"

let users: any[] = []

export async function POST(req: Request) {
    const body = await req.json()

    const newUser = {
        id: Date.now(),
        name: body.name,
        email: body.email,
        password: body.password
    }

    users.push(newUser)

    return NextResponse.json({ message: "User created" })
}