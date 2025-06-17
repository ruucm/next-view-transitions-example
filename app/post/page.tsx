'use client'
import { routeWithPageTransition, useTransitionRouter } from '@/lib/next-view-transitions'

export default function Post() {
  const router = useTransitionRouter()

  return (
    <div className="bg-green-200">
      <button
        onClick={(e) => {
          e.preventDefault()
          routeWithPageTransition(router, '/', true)
        }}
      >
        ⬅️ Back
      </button>
      <div>
        <img
          src="https://images.unsplash.com/photo-1750024774702-1fd1a377fdfb?w=900"
          alt="random image"
          style={{
            viewTransitionName: 'card-image'
          }}
        />
      </div>
      <div>Post Title</div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
    </div>
  )
}
