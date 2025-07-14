import { cn } from "@/lib/utils"

// Enhanced Skeleton with shimmer effect
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted rounded-md",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
    </div>
  )
}

// Add shimmer animation to global styles if not present
// .animate-shimmer {
//   animation: shimmer 1.5s infinite linear;
// }
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }

export { Skeleton }
