'use client';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

function TooltipWrapper({
  children,
  tooltip,
}: {
  children: ReactNode;
  tooltip: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="text-primary bg-primary-foreground p-1.5 text-xs border-primary border rounded-lg">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipWrapper;
