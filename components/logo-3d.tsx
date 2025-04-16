import Image from "next/image"
import { cn } from "@/lib/utils"


interface Logo3DProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Logo3D({ className, ...props }: Logo3DProps) {
  return (
     
    <div className={cn("relative aspect-square", className)} {...props}>
      <Image
        src="/3d_logo.svg"
        alt="ROQ 3D Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
} 