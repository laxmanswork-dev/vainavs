import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional class names and resolve Tailwind utility conflicts
 * (e.g. `cn('px-2', condition && 'px-4')` correctly keeps only `px-4`).
 * Use this instead of template-string class concatenation everywhere.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
