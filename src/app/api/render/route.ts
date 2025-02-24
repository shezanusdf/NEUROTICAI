import { renderMedia, getRenderProgress } from '@remotion/renderer'
import { getBrandingForAccount } from '@/lib/supabase/client'

export async function POST(req: Request) {
  const { videoId, accountId } = await req.json()
  
  const branding = await getBrandingForAccount(accountId)
  const compositionId = 'BrandedVideo'
  
  const renderId = await renderMedia({
    composition: {
      id: compositionId,
      height: 1920,
      width: 1080,
      fps: 30,
      durationInFrames: 300,
      props: {
        videoSrc: `videos/${videoId}.mp4`,
        branding,
        captions: [] // Add captions here
      }
    },
    codec: 'h264',
    outputLocation: `output/${videoId}-${accountId}.mp4`,
  })
  
  return Response.json({ renderId })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const renderId = searchParams.get('renderId')
  
  if (!renderId) {
    return Response.json({ error: 'No renderId provided' }, { status: 400 })
  }
  
  const progress = await getRenderProgress(renderId)
  return Response.json({ progress })
}
