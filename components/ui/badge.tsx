import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gold text-ink font-bold",
        secondary: "border-white/10 bg-onyx text-foreground",
        destructive: "border-transparent bg-red-900/60 text-red-200 border-red-800",
        outline: "text-foreground border-white/20",
        gold: "border-gold/40 bg-gold/10 text-gold",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
        completed: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        cancelled: "border-rose-500/30 bg-rose-500/10 text-rose-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
