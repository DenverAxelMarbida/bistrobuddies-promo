import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import type { ScreenshotId } from '../../content/assets'
import { gsap } from '../../lib/motion'
import { Container } from '../Container/Container'
import { ScreenshotFrame } from '../ScreenshotFrame/ScreenshotFrame'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './Features.module.css'

type Feature = {
  title: string
  detail: string
  screenshot: ScreenshotId
  caption: string
}

const features: Feature[] = [
  {
    title: 'Browse before signing in',
    detail: 'Browse and filter the menu before signing in. Sign in only when you are ready to place an order.',
    screenshot: 'menu-8',
    caption: 'Browse hot drinks in the BistroBuddies menu.',
  },
  {
    title: 'Choose every detail',
    detail: 'Choose Small, Medium, or Large, select No Sugar, Less Sugar, Regular, or Extra Sugar, and set a quantity from 1 to 99.',
    screenshot: 'product-2',
    caption: 'Adjust drink size, sugar level, and quantity.',
  },
  {
    title: 'Pay by COD or GCash',
    detail: 'Pay cash when your delivery arrives, or follow the GCash instructions and submit payment proof for review.',
    screenshot: 'receipt-2',
    caption: 'Review an order confirmation and payment method.',
  },
  {
    title: 'Follow delivery progress',
    detail: 'Check each status from Pending to Delivered, including Confirmed, Preparing, Ready, and On the Way.',
    screenshot: 'order-1',
    caption: 'Follow the stages of a delivery order.',
  },
  {
    title: 'Return to past orders',
    detail: 'Revisit previous delivery orders in My Orders.',
    screenshot: 'my-orders',
    caption: 'Review previous orders in My Orders.',
  },
]

export function Features() {
  const section = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-feature-item]', section.current).forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0,
          y: 10,
          filter: 'blur(4px)',
          duration: 0.34,
          ease: 'power1.out',
          clearProps: 'opacity,transform,visibility,filter',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => media.revert()
  }, { scope: section })

  return (
    <section ref={section} className={styles.section} id="features" aria-labelledby="features-title">
      <Container>
        <div className={styles.heading}>
          <div>
            <SectionLabel>Ordering features</SectionLabel>
            <h2 id="features-title">Make it your cup.</h2>
          </div>
          <p>The app keeps the menu, drink choices, payment instructions, delivery progress, and order history together.</p>
        </div>
        <ul className={styles.list} role="list">
          {features.map((feature, index) => (
            <li className={index === 0 ? `${styles.item} ${styles.lead}` : styles.item} data-feature-item key={feature.title}>
              <div className={styles.copy}>
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
              </div>
              <ScreenshotFrame className={styles.screen} screenshot={feature.screenshot} caption={feature.caption} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
