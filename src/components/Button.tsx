import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ElementType, LabelHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: ElementType
    htmlFor?: string // For label support
}

export const Button = forwardRef<HTMLButtonElement | HTMLLabelElement, ButtonProps>(({ className, as: Component = 'button', children, ...props }, ref) => {
    // Label specific props if being used as a label
    const labelProps = Component === 'label' ? props as LabelHTMLAttributes<HTMLLabelElement> : {};

    return (
        <Component
            ref={ref}
            className={cn(
                "flex items-center justify-center gap-3 w-full py-3 md:py-4 px-6 md:px-8",
                "bg-[var(--btn-color)] hover:bg-[var(--btn-hover)] text-white",
                "rounded-2xl cursor-pointer group",
                "border border-[var(--btn-border)] hover:border-[var(--btn-border-hover)]",
                "transition-all duration-300 active:scale-[0.98]",
                "shadow-xl shadow-black/50 active:shadow-sm",
                className
            )}
            {...props}
            {...labelProps}
        >
            {children}
        </Component>
    )
})

Button.displayName = "Button"
