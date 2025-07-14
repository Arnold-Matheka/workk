import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like enhancements:
      "rounded-3xl border border-[rgba(60,60,67,0.15)] bg-[rgba(255,255,255,0.8)] backdrop-blur-md text-card-foreground shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] relative overflow-hidden group transition-all duration-200 ease-in-out hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] hover:-translate-y-0.5",
      "p-2",
      // subtle highlight ring effect
      "before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:transition-all before:duration-300 before:opacity-0 before:bg-gradient-to-br before:from-[rgba(0,123,255,0.06)] before:to-[rgba(255,255,255,0.03)] before:blur-[3px] hover:before:opacity-70",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like header
      "flex flex-col space-y-2 p-6 pb-2",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like title
      "text-[22px] font-semibold leading-tight tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like description
      "text-[15px] text-gray-500 font-normal",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like content
      "p-6 pt-2",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // iOS-like footer
      "flex items-center p-6 pt-2 border-t border-[rgba(60,60,67,0.08)]",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
