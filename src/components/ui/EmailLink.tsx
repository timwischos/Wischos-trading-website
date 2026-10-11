import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { trackEmailClick } from '@/lib/analytics'

type EmailLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  email: string
  location: string
  children: ReactNode
}

export function EmailLink({ email, location, children, onClick, ...rest }: EmailLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEmailClick({ location })
    onClick?.(e)
  }

  return (
    <a href={`mailto:${email}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
