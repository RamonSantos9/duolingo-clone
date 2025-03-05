import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-extrabold gap-2 whitespace-nowrap rounded-md uppercase text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", // removido [&_svg]:size-4
  {
    variants: {
      variant: {
        locked:
          "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-2",
        default:
          "bg-white font-extrabold border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-[#1cb0f6]",
        primary:
          "bg-sky-400 font-extrabold text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-sky-500 hover:bg-slate-100 ",
        secondary:
          "bg-[#58CC02] font-extrabold text-white hover:bg-[#6DFF00] border-green-600 border-b-4 active:border-b-0",
        tercerary:
          "bg-[#58CC02] font-extrabold text-white border-green-600 border-b-4 active:border-b-0",
        secondaryOutline:
          "bg-white text-green-500 hover:bg-slate-100 font-extrabold ",
        danger:
          "bg-rose-500 font-extrabold text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100 ",
        super:
          "bg-indigo-500 font-extrabold text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
        superOutline:
          "bg-white text-indigo-500 font-extrabold hover:bg-slate-100 ",
        ghost:
          "bg-transparent text-slate-500 border-transparent border-0 font-extrabold ",
        sidebar:
          "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none font-extrabold ",
        sidebarOutline:
          "bg-sky-500/15 text-sky-500 border-sky-300 border-2 font-extrabold ",
      },
      size: {
        default: "h-10 px-4 py-2",
        pr: "h-14 rounded-md px-3",
        rp: "h-30 rounded-md px-3",
        g: "h-12 rounded-xl px-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-[12px] px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
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
