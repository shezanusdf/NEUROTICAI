export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  redis: {
    url: process.env.REDIS_URL!,
  },
  storage: {
    videoBucket: 'videos',
    outputBucket: 'processed-videos',
  },
  remotion: {
    serveUrl: process.env.REMOTION_SERVE_URL!,
    compositionId: 'BrandedVideo',
    dimensions: {
      width: 1080,
      height: 1920,
      fps: 30,
    },
  },
}
