'use client'
import { routeWithPageTransition, useTransitionRouter } from '@/lib/next-view-transitions'

export default function About() {
  const router = useTransitionRouter()

  return (
    <div className="bg-green-200 h-80">
      <button
        onClick={(e) => {
          e.preventDefault()
          routeWithPageTransition(router, '/', true)
        }}
      >
        ⬅️ Back
      </button>
      <h1>About Page</h1>
    </div>
  )
}
