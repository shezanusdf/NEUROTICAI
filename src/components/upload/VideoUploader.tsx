'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { addToQueue } from '@/lib/queue'

export const VideoUploader = ({ accountId }: { accountId: string }) => {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('video', file)
    formData.append('accountId', accountId)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const { videoId } = await res.json()
      await addToQueue(videoId, accountId)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button disabled={uploading}>
        <Upload className="w-4 h-4 mr-2" />
        {uploading ? 'Uploading...' : 'Upload Video'}
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleUpload}
        />
      </Button>
      {uploading && <Progress value={progress} />}
    </div>
  )
}
