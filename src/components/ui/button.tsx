"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sound";

const buttonVariants = cva(
  "ripple tap-highlight-none inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        primary: "bg-rose text-white shadow-md shadow-rose/25 hover:bg-rose/90",
        royal: "bg-primary text-white shadow-md shadow-primary/25 hover:bg-primary/90",
        sunset: "bg-saffron text-white shadow-md shadow-saffron/25 hover:bg-saffron/90",
        glass: "glass text-white hover:bg-white/[0.1] hover:border-white/20",
        ghost: "text-white/80 hover:text-white hover:bg-white/[0.06]",
        outline: "border border-white/20 text-white hover:bg-white/[0.06]",
        danger: "bg-danger text-white shadow-md shadow-danger/25 hover:bg-danger/90",
        gold: "bg-gold text-black shadow-md shadow-gold/25 hover:bg-gold/90",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-xl",
        md: "h-11 px-6 text-sm rounded-2xl",
        lg: "h-13 px-8 py-3.5 text-base rounded-2xl",
        xl: "h-16 px-10 text-lg rounded-3xl",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  silent?: boolean;
  /** Render as the single child element (e.g. <Button asChild><Link/></Button>)
   *  instead of a <button>. Avoids invalid <a><button> nesting that breaks clicks. */
  asChild?: boolean;
}

/**
 * Minimal Slot: clones the child element, merging className + onClick so the
 * Button's styling & ripple land on the child (e.g. a next/link <a>).
 */
const Slot = ({
  children,
  className,
  onClick,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
  if (React.isValidElement(children)) {
    const childProps = (children as React.ReactElement<Record<string, unknown>>).props;
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...rest,
      ...childProps,
      className: cn(className, childProps.className as string | undefined),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        (childProps.onClick as ((e: React.MouseEvent<HTMLElement>) => void) | undefined)?.(e);
        onClick?.(e);
      },
    });
  }
  return null;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, silent, asChild, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      if (!silent) playSfx("click");
      // ripple ink
      const btn = e.currentTarget;
      const ink = document.createElement("span");
      ink.className = "ripple-ink";
      const rect = btn.getBoundingClientRect();
      const sz = Math.max(rect.width, rect.height);
      ink.style.width = ink.style.height = `${sz}px`;
      ink.style.left = `${e.clientX - rect.left - sz / 2}px`;
      ink.style.top = `${e.clientY - rect.top - sz / 2}px`;
      btn.appendChild(ink);
      setTimeout(() => ink.remove(), 650);
      onClick?.(e as React.MouseEvent<HTMLButtonElement>);
    };
    const cls = cn(buttonVariants({ variant, size }), className);
    if (asChild) {
      return (
        <Slot className={cls} onClick={handleClick} {...props}>
          {children}
        </Slot>
      );
    }
    return (
      <button
        ref={ref}
        className={cls}
        onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
