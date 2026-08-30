declare module '*.mdx' {
  import type { FC } from 'react'
  const Component: FC<{ components?: Record<string, any> }>
  export default Component
}
