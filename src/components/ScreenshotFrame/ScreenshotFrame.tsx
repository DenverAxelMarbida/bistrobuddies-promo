import { useState } from 'react'
import type { ScreenshotId } from '../../content/assets'
import { screenshots } from '../../content/assets'
import styles from './ScreenshotFrame.module.css'

type Props = {
  screenshot: ScreenshotId
  caption?: string
  priority?: boolean
  className?: string
}

function ScreenshotImage({ screenshot, priority }: Pick<Props, 'screenshot' | 'priority'>) {
  const [failed, setFailed] = useState(false)
  const asset = screenshots[screenshot]
  return (
    <div className={styles.preview}>
      {failed ? (
        <p className={styles.error}>App preview unavailable. You can still download the Android app below.</p>
      ) : (
        <img
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt={asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

export function ScreenshotFrame({ screenshot, caption, priority = false, className = '' }: Props) {
  return (
    <figure className={`${styles.frame} ${className}`}>
      <ScreenshotImage key={screenshot} screenshot={screenshot} priority={priority} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}
