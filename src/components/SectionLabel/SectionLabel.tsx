import type { ComponentPropsWithoutRef } from 'react'
import styles from './SectionLabel.module.css'

export function SectionLabel({ className = '', ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={`${styles.label} ${className}`} {...props} />
}
