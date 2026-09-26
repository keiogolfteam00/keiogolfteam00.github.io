import { useEffect } from 'react'

// 監視が何らかの理由で発火しなかった場合に、必ず表示へ戻すための保険。
const REVEAL_FALLBACK_MS = 4000

/**
 * `.fade-up` を持つ要素をスクロールに応じてフェードインさせる。
 *
 * コンテンツが読めなくなることを避けるため、CSS上の既定は「表示」とし、
 * 初期表示領域より下にある要素だけを JS で一時的に隠してから見せる。
 * prefers-reduced-motion 指定時やIntersectionObserver非対応環境では
 * 何も隠さない。
 */
export function useScrollAnimation(threshold = 0.12) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.fade-up'))
    if (elements.length === 0) return undefined

    const reveal = (el) => el.removeAttribute('data-reveal')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const pending = elements.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
    )
    pending.forEach((el) => el.setAttribute('data-reveal', 'pending'))

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    pending.forEach((el) => observer.observe(el))

    const timer = window.setTimeout(() => pending.forEach(reveal), REVEAL_FALLBACK_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      pending.forEach(reveal)
    }
  }, [threshold])
}
