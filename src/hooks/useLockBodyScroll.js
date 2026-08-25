import { useEffect } from 'react'

/**
 * Locks page scroll while `locked` is true — for the mobile nav drawer,
 * modals, etc. Restores the previous overflow value on unlock/unmount so
 * nested usages don't clobber each other.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}
