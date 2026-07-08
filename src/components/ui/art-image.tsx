import { Link } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './lamp-tooltip'

import './art-image.css'

interface ArtImageProps {
  src: string
  alt: string
  className?: string
}

// An artwork image with a © usage marker. The badge links to the usage policy;
// the lantern tooltip previews the terms on hover/focus. Radix supplies the
// tooltip a11y (focus, Escape, role="tooltip", aria-describedby).

export function ArtImage({ src, alt, className = '' }: ArtImageProps) {
  return (
    <div className={`art-frame ${className}`}>
      <img src={src} alt={alt} className="art-frame__img" />
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/about#usage-policy"
              className="art-frame__badge"
              aria-label="Usage terms for this artwork"
            >
              ©
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>© Serina McFall — please ask before use</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
