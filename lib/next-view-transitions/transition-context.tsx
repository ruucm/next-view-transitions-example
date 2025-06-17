import type { Dispatch, SetStateAction } from 'react'
import { createContext, use, useEffect, useState } from 'react'

// import { useBrowserNativeTransitions } from './browser-native-events'

const ViewTransitionsContext = createContext<Dispatch<SetStateAction<(() => void) | null>>>(() => () => {})

export function ViewTransitions({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [finishViewTransition, setFinishViewTransition] = useState<null | (() => void)>(null)

  useEffect(() => {
    if (finishViewTransition) {
      finishViewTransition()
      setFinishViewTransition(null)
    }
  }, [finishViewTransition])

  // useBrowserNativeTransitions() // remove this to prevent the default view transition (fade in/out)

  return <ViewTransitionsContext.Provider value={setFinishViewTransition}>{children}</ViewTransitionsContext.Provider>
}

export function useSetFinishViewTransition() {
  return use(ViewTransitionsContext)
}
