import crypto from 'crypto'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000)
}

export function replaceEmptyWithNull(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === '' ? null : value,
    ]),
  )
}

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) {
        reject(error)
      }

      resolve(hash.toString('hex').normalize())
    })
  })
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string
  salt: string
  hashedPassword: string
}) {
  const inputHashedPassword = await hashPassword(password, salt)

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, 'hex'),
    Buffer.from(hashedPassword, 'hex'),
  )
}

export function generateSalt() {
  return crypto.randomBytes(16).toString('hex').normalize()
}

export function generateRandomToken() {
  return crypto.randomBytes(32).toString('hex') // 64-character hex string
}
