const transitions = {
  base: {
    type: 'spring',
    mass: 1,
    stiffness: 550,
    damping: 40,
    easing: {
      duration: 500
    }
  }
}

// Animation helper function
export const createTransitionAnimation = (oldTransform: string, newTransform: string) => {
  const { duration } = transitions.base.easing
  const animationConfig = {
    duration,
    fill: 'forwards' as FillMode
  }

  return {
    oldElement: {
      keyframes: [{ transform: 'translateX(0%)' }, { transform: oldTransform }],
      options: {
        ...animationConfig,
        pseudoElement: '::view-transition-old(page-content)'
      }
    },
    newElement: {
      keyframes: [{ transform: newTransform }, { transform: 'translateX(0)' }],
      options: {
        ...animationConfig,
        pseudoElement: '::view-transition-new(page-content)'
      }
    }
  }
}
