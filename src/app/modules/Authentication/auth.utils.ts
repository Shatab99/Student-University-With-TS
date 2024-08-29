import jwt from 'jsonwebtoken'

export const createToken = (payload: { id: string, role: string }, secret: string, expiresIn: string) => jwt.sign(payload, secret, { expiresIn })
