import { type ComponentProps } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'
import './lamp-tooltip.css'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

// Radix handles all the accessibility (focus, Escape, role="tooltip", aria-describedby).
// We only restyle the content — the "lamp" glow lives in lamp-tooltip.css, adapted to a
// warm lantern glow instead of the original dark-mode white glow. In React 19 `ref` is a
// normal prop, so it flows through {...props} — no forwardRef needed.
function TooltipContent({
  className,
  sideOffset = 18,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn('lamp-tooltip', className)}
      {...props}
    />
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
