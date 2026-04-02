// lib/auth.ts
export interface User {
    id: number
    name: string
    email: string
}

// Mock database
const users = [
    { id: 1, name: "Alice", email: "[EMAIL_ADDRESS]", password: "password123" },
    { id: 2, name: "Bob", email: "[EMAIL_ADDRESS]", password: "password456" }
]

export async function findUserByEmail(email: string) {
    return users.find(u => u.email === email) || null
}

export async function createUser(name: string, email: string, password: string) {
    const id = users.length + 1
    const newUser = { id, name, email, password }
    users.push(newUser)
    return newUser
}