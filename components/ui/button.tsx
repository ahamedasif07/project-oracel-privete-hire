import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-ink font-semibold hover:bg-gold-soft hover:shadow-gold",
        gold: "bg-gradient-to-r from-[#F4E0A5] via-[#D4AF37] to-[#AA820A] text-ink font-semibold shadow-gold hover:-translate-y-0.5 hover:shadow-gold-lg",
        ghostGold:
          "border border-gold/40 text-gold bg-white/[0.02] backdrop-blur-sm hover:bg-gold/10 hover:border-gold",
        outline: "border border-white/10 bg-transparent hover:bg-white/5 hover:text-white",
        secondary: "bg-onyx text-white hover:bg-white/10 border border-white/5",
        ghost: "hover:bg-white/5 hover:text-white",
        link: "text-gold underline-offset-4 hover:underline",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 py-3.5 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
