import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function revealOnScroll(scope: Element | null, selector: string) {
  if (!scope) return

  const items = gsap.utils.toArray<HTMLElement>(selector, scope)
  const pending = items.filter((item) => item.getBoundingClientRect().top > window.innerHeight)

  if (pending.length === 0) return

  gsap.set(pending, { opacity: 0, y: 24, filter: 'blur(10px)' })

  const reveal = (batch: Element[]) => {
    gsap.to(batch, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'opacity,transform,filter',
    })
  }

  const triggers = ScrollTrigger.batch(pending, {
    start: 'top 85%',
    once: true,
    onEnter: reveal,
    onEnterBack: reveal,
  })

  return () => {
    triggers.forEach((trigger) => trigger.kill())
    gsap.killTweensOf(pending)
    gsap.set(pending, { clearProps: 'opacity,transform,filter' })
  }
}

export { gsap, ScrollTrigger }
