import { AbsoluteFill, useVideoConfig, Sequence } from 'remotion'
import { BrandOverlay } from './BrandOverlay'
import { CaptionOverlay } from './CaptionOverlay'

export const BrandedVideo: React.FC<{
  videoSrc: string;
  branding: {
    logo: string;
    position: string;
    opacity: number;
  };
  captions: string[];
}> = ({ videoSrc, branding, captions }) => {
  const { fps, durationInFrames } = useVideoConfig()

  return (
    <AbsoluteFill>
      <video src={videoSrc} />
      <Sequence from={0} durationInFrames={durationInFrames}>
        <BrandOverlay {...branding} />
      </Sequence>
      <Sequence from={0} durationInFrames={durationInFrames}>
        <CaptionOverlay captions={captions} />
      </Sequence>
    </AbsoluteFill>
  )
}
