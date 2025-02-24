import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { motion } from 'framer-motion'

export const BrandOverlay: React.FC<{
  logo: string;
  position: string;
  opacity: number;
}> = ({ logo, position, opacity }) => {
  const frame = useCurrentFrame()
  const fadeIn = interpolate(frame, [0, 30], [0, opacity])
  
  return (
    <AbsoluteFill>
      <motion.img 
        src={logo}
        style={{
          position: 'absolute',
          ...getPositionStyles(position),
          opacity: fadeIn,
          width: '20%',
          height: 'auto'
        }}
      />
    </AbsoluteFill>
  )
}

const getPositionStyles = (position: string) => {
  const positions = {
    'top-left': { top: 20, left: 20 },
    'top-right': { top: 20, right: 20 },
    'bottom-left': { bottom: 20, left: 20 },
    'bottom-right': { bottom: 20, right: 20 }
  }
  return positions[position] || positions['bottom-right']
}
