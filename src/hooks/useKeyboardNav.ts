import { useEffect } from 'react'

interface Options {
  itemCount: number
  focused: number
  setFocused: (n: number) => void
  onEnter: () => void
  onEscape?: () => void
}

export function useKeyboardNav({ itemCount, focused, setFocused, onEnter, onEscape }: Options) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocused(Math.min(focused + 1, itemCount - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocused(Math.max(focused - 1, 0))
      } else if (e.key === 'Enter') {
        onEnter()
      } else if (e.key === 'Escape' && onEscape) {
        onEscape()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [focused, itemCount, onEnter, onEscape, setFocused])
}