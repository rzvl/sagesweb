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

/**
 * Web Crypto API
 * @returns a random six digit number like 510820
 */
export async function generateRandomSixDigitNumber() {
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  return (randomBuffer[0] % 900000) + 100000
}

/**
 * Web Crypto API
 * alternative for: crypto.randomBytes(512).toString("hex").normalize()
 * @param size number of bytes to generate
 * @returns a random hex string of the given size (512 bytes => 1024 characters)
 */
export function generateRandomHex(size: number) {
  const array = new Uint8Array(size)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Web Crypto API
 * @param input a hex string to be hashed
 * @returns a base64 url encoded hash of the input
 * ex: 'DuBkKpLrTVw_qKlYohKInf849KBeHhDLOuMyq1EfGog'
 */
export async function hashString(input: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // Convert to Base64 URL Encoding
  return btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
