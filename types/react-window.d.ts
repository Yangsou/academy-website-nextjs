/**
 * Temporary type declarations for react-window
 * These will be replaced once the actual package is installed
 *
 * Install with: npm install react-window @types/react-window
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-window' {
  import type { ComponentType, CSSProperties } from 'react'

  export type ListChildComponentProps<T = any> = {
    index: number
    style: CSSProperties
    data: T
  }

  export type FixedSizeListProps<T = any> = {
    children: ComponentType<ListChildComponentProps<T>>
    height: number
    itemCount: number
    itemSize: number
    width: string | number
    itemData?: T
    className?: string
  }

  export const FixedSizeList: ComponentType<FixedSizeListProps<any>>
}
