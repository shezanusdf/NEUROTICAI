import Bull from 'bull'
import { VideoProcessor } from './video-processor'

export const videoQueue = new Bull('video-processing', {
  redis: process.env.REDIS_URL
})

videoQueue.process(async (job) => {
  const { sourceUrl, accountId } = job.data
  const processor = new VideoProcessor()
  
  try {
    const result = await processor.processVideo(sourceUrl, accountId)
    return result
  } catch (error) {
    console.error('Video processing failed:', error)
    throw error
  }
})

export const addToQueue = async (sourceUrl: string, accountId: string) => {
  const job = await videoQueue.add({
    sourceUrl,
    accountId
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  })
  
  return job.id
}
