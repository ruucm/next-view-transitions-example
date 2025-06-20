import { useRouter as useNextRouter } from 'next/navigation'
import { startTransition, useCallback, useMemo } from 'react'
import { useSetFinishViewTransition } from './transition-context'
import { AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { createTransitionAnimation } from './createTransitionAnimation'

export type TransitionOptions = {
  onTransitionReady?: () => void
}

type NavigateOptionsWithTransition = NavigateOptions & TransitionOptions

export type TransitionRouter = AppRouterInstance & {
  push: (href: string, options?: NavigateOptionsWithTransition) => void
  replace: (href: string, options?: NavigateOptionsWithTransition) => void
}

export function useTransitionRouter() {
  const router = useNextRouter()
  const finishViewTransition = useSetFinishViewTransition()

  const triggerTransition = useCallback((cb: () => void, { onTransitionReady }: TransitionOptions = {}) => {
    if ('startViewTransition' in document) {
      // @ts-ignore
      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            startTransition(() => {
              cb()
              finishViewTransition(() => resolve)
            })
          })
      )

      if (onTransitionReady) {
        transition.ready.then(onTransitionReady)
      }
    } else {
      return cb()
    }
  }, [])

  const push = useCallback(
    (href: string, { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}) => {
      triggerTransition(() => router.push(href, options), {
        onTransitionReady
      })
    },
    [triggerTransition, router]
  )

  const replace = useCallback(
    (href: string, { onTransitionReady, ...options }: NavigateOptionsWithTransition = {}) => {
      triggerTransition(() => router.replace(href, options), {
        onTransitionReady
      })
    },
    [triggerTransition, router]
  )

  return useMemo<TransitionRouter>(
    () => ({
      ...router,
      push,
      replace
    }),
    [push, replace, router]
  )
}

export function routeWithPageTransition(router: any, href: string, isPrevious: boolean) {
  router.push(href, {
    onTransitionReady: () => {
      console.log('Transition ready')

      const documentElement = document.documentElement

      let animation
      if (isPrevious) {
        animation = createTransitionAnimation('translateX(100%)', 'translateX(-100%)')
      } else {
        animation = createTransitionAnimation('translateX(-100%)', 'translateX(100%)')
      }

      documentElement.animate(animation.oldElement.keyframes, animation.oldElement.options)
      documentElement.animate(animation.newElement.keyframes, animation.newElement.options)
    }
  })
}
