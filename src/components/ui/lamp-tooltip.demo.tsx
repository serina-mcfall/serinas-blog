import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './lamp-tooltip'

// The demo shipped with the 21st.dev component, restyled onto a dark "night" stage
// so the warm lantern glow is visible, and wrapped in a single TooltipProvider.
export default function LampTooltipDemo() {
  return (
    <TooltipProvider delayDuration={50}>
      <div className="lamp-tooltip-stage">
        <Tooltip>
          <TooltipTrigger className="lamp-trigger">Hover (Top)</TooltipTrigger>
          <TooltipContent>
            <p>Top side tooltip</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="lamp-trigger">Hover (Bottom)</TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bottom side tooltip</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex flex-col gap-10">
          <Tooltip>
            <TooltipTrigger className="lamp-trigger">Hover (Right)</TooltipTrigger>
            <TooltipContent side="right">
              <p>Right side tooltip</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="lamp-trigger">Hover (Left)</TooltipTrigger>
            <TooltipContent side="left">
              <p>Left side tooltip</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
