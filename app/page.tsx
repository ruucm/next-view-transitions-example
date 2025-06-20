'use client'
import { routeWithPageTransition, useTransitionRouter } from '@/lib/next-view-transitions'

export default function Home() {
  const router = useTransitionRouter()
  return (
    <div className="bg-red-200 h-80">
      <button
        onClick={(e) => {
          e.preventDefault()
          routeWithPageTransition(router, '/about', false)
        }}
      >
        About
      </button>
      <div
        className="flex gap-4 flex-col bg-blue-200 w-32 pb-4"
        onClick={(e) => {
          e.preventDefault()
          routeWithPageTransition(router, '/post', false)
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1750024774702-1fd1a377fdfb?w=900"
          alt="random image"
          style={{
            viewTransitionName: 'card-image'
          }}
        />
        <button>Post Title</button>
      </div>
    </div>
  )
}
