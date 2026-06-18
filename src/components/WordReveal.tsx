import { useRef, useEffect, useState } from 'react'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

interface Props {
  children: string
  style?: React.CSSProperties
  as?: Tag
  delay?: number
  stagger?: number
}

export default function WordReveal({ children, style, as: Tag = 'p', delay = 0, stagger = 55 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const words = children.split(' ')

  return (
    <Tag ref={ref as React.RefObject<HTMLElement> & React.RefObject<HTMLParagraphElement>} style={{ ...style, lineHeight: style?.lineHeight ?? 1.5 }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0px)' : 'translateY(14px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
            transitionDelay: `${delay + i * stagger}ms`,
            marginRight: '0.28em',
            whiteSpace: 'nowrap',
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
