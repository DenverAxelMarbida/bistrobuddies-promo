import styles from './CoffeeRing.module.css'

export function CoffeeRing({ className = '' }: { className?: string }) {
  return <span className={`${styles.ring} ${className}`} aria-hidden="true" />
}
