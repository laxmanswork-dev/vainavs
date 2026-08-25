import { cn } from '@utils/cn'

/**
 * Page-width wrapper with the site's standard horizontal gutters. Use this
 * instead of ad-hoc `max-w-* mx-auto px-*` combinations so every section
 * lines up on the same grid.
 */
export function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag
      className={cn('mx-auto w-full max-w-(--container-content) px-6 sm:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
