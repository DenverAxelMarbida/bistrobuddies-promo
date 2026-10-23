import type { ComponentPropsWithoutRef } from 'react'
import styles from './Button.module.css'

type Appearance = { variant?: 'primary' | 'secondary' | 'accent' }
type ButtonProps = Appearance & (
  | (ComponentPropsWithoutRef<'a'> & { href: string })
  | (ComponentPropsWithoutRef<'button'> & { href?: never })
)

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant = 'primary', className = '', ...linkProps } = props
    return <a className={`${styles.button} ${styles[variant]} ${className}`} {...linkProps} />
  }

  const { variant = 'primary', className = '', type = 'button', ...buttonProps } = props
  return <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...buttonProps} />
}
