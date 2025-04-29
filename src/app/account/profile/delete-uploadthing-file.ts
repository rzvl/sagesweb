'use server'

import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function deleteUploadthingFile(fileKey: string) {
  try {
    await utapi.deleteFiles(fileKey)
    return { success: true }
  } catch (err) {
    console.error('Failed to delete UploadThing file:', err)
    return { error: 'Could not delete file' }
  }
}
