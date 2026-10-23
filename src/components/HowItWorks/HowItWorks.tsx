import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import type { ScreenshotId } from '../../content/assets'
import { gsap, ScrollTrigger } from '../../lib/motion'
import { Container } from '../Container/Container'
import { ScreenshotFrame } from '../ScreenshotFrame/ScreenshotFrame'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import styles from './HowItWorks.module.css'

type WalkthroughStep = {
  title: string
  detail: string
  screenshot: ScreenshotId
  caption: string
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    title: 'Browse',
    detail: 'Browse the menu and filter drinks before signing in.',
    screenshot: 'menu-3',
    caption: 'Browse the BistroBuddies menu.',
  },
  {
    title: 'Customize',
    detail: 'Open a drink, then choose its size, sugar level, and quantity.',
    screenshot: 'product-1',
    caption: 'Choose size and sugar options for a drink.',
  },
  {
    title: 'Review',
    detail: 'Add your drink to the cart and review items and quantities before checkout.',
    screenshot: 'cart-2',
    caption: 'Review drinks and quantities in the cart.',
  },
  {
    title: 'Confirm',
    detail: 'Checkout as a signed-in customer, then choose Cash on Delivery or submit GCash payment proof.',
    screenshot: 'receipt-2',
    caption: 'Review the confirmed order and payment method.',
  },
  {
    title: 'Track',
    detail: 'Follow each delivery stage from Pending through Delivered, then revisit your order history.',
    screenshot: 'order-1',
    caption: 'Follow delivery order progress.',
  },
]

type MotionMode = 'static' | 'mobile' | 'desktop'

export function HowItWorks() {
  const section = useRef<HTMLElement>(null)
  const [motionMode, setMotionMode] = useState<MotionMode>('static')

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem) and (min-height: 48rem)')
    const mobile = window.matchMedia('(max-width: 63.99rem)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const queries = [desktop, mobile, reduce]
    const updateMode = () => {
      const enlargedText = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) > 20
      setMotionMode(reduce.matches || enlargedText ? 'static' : desktop.matches ? 'desktop' : mobile.matches ? 'mobile' : 'static')
    }
    const textScaleObserver = new MutationObserver(updateMode)

    queries.forEach((query) => query.addEventListener('change', updateMode))
    textScaleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })
    updateMode()

    return () => {
      queries.forEach((query) => query.removeEventListener('change', updateMode))
      textScaleObserver.disconnect()
    }
  }, [])

  useGSAP((_, contextSafe) => {
    if (motionMode === 'static') return

    if (motionMode === 'mobile') {
      gsap.utils.toArray<HTMLElement>('[data-walkthrough-static] > li', section.current).forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 12,
          duration: 0.35,
          ease: 'power1.out',
          clearProps: 'opacity,transform,visibility',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
      return
    }

    const root = section.current
    const enhancedTrack = root?.querySelector<HTMLElement>('[data-walkthrough-enhanced]')
    const visual = root?.querySelector<HTMLElement>('[data-walkthrough-visual]')
    const steps = gsap.utils.toArray<HTMLElement>('[data-walkthrough-step]', root)
    const layers = gsap.utils.toArray<HTMLElement>('[data-walkthrough-screen]', root)

    if (!root || !enhancedTrack || !visual || steps.length !== walkthroughSteps.length || layers.length !== walkthroughSteps.length) return

    root.dataset.enhanced = 'true'
    gsap.set(layers, { autoAlpha: 0, scale: 0.975 })
    gsap.set(layers[0], { autoAlpha: 1, scale: 1 })

    const updateVisual = (activeIndex: number) => {
      layers.forEach((layer, index) => {
        gsap.to(layer, {
          autoAlpha: index === activeIndex ? 1 : 0,
          scale: index === activeIndex ? 1 : 0.975,
          duration: 0.28,
          ease: 'power1.out',
          overwrite: true,
        })
      })
    }
    const showVisual = contextSafe ? contextSafe(updateVisual) : updateVisual

    steps.forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => showVisual(index),
        onEnterBack: () => showVisual(index),
      })
    })

    ScrollTrigger.refresh()

    return () => {
      gsap.killTweensOf(layers)
      delete root.dataset.enhanced
    }
  }, { scope: section, dependencies: [motionMode], revertOnUpdate: true })

  return (
    <section ref={section} className={styles.section} id="how-it-works" aria-labelledby="walkthrough-title">
      <Container>
        <div className={styles.heading}>
          <SectionLabel>How it works</SectionLabel>
          <h2 id="walkthrough-title">Your order, step by step.</h2>
          <p>Browse first. Sign in when you are ready to order.</p>
        </div>
        <ol className={styles.staticList} data-walkthrough-static>
          {walkthroughSteps.map((step) => (
            <li className={styles.staticStep} key={step.title}>
              <div className={styles.stepCopy}>
                <h3>{step.title}</h3>
                <p data-step-detail>{step.detail}</p>
              </div>
              <ScreenshotFrame className={styles.stepScreen} screenshot={step.screenshot} caption={step.caption} />
            </li>
          ))}
        </ol>
        <div className={styles.enhanced} data-walkthrough-enhanced>
          <ol className={styles.narrative}>
            {walkthroughSteps.map((step, index) => (
              <li className={styles.narrativeStep} data-walkthrough-step={index} key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.visual} data-walkthrough-visual>
            {walkthroughSteps.map((step, index) => (
              <div className={styles.visualLayer} data-walkthrough-screen={index} key={step.screenshot}>
                <ScreenshotFrame className={styles.desktopScreen} screenshot={step.screenshot} caption={step.caption} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
