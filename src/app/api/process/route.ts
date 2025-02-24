import { VideoProcessor } from '@/lib/video-processor'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sourceUrl, targetBranding } = await req.json()
    const processor = new VideoProcessor()
    
    const job = await processor.processVideo(sourceUrl, targetBranding)
    
    return NextResponse.json({ 
      success: true, 
      jobId: job.id 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
