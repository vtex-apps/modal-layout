// This code comes form the vtex.store-link hook
// to add classes of the styleguide button to a
// element. We might have a component to share
// this code between apps in a future
// https://github.com/vtex-apps/store-link/blob/master/react/modules/useButtonClasses.ts

import { useMemo } from 'react'
import classnames from 'classnames'

// for now this are the only necessary variant and sizes
type Size = 'regular'
type Variant = 'secondary'

interface ButtonProps {
  variant: Variant
  size: Size
}

interface AllOptions {
  variant: ButtonProps['variant']
  disabled: boolean
  size: ButtonProps['size']
}

type Options = Partial<AllOptions>

const SECONDARY_DISABLED = ''
const SECONDARY_ENABLED =
  'bg-action-secondary b--action-secondary c-on-action-secondary hover-bg-action-secondary hover-b--action-secondary hover-c-on-action-secondary'

const BASE_CONTAINER_CLASSES = 'bw1 fw5 ba v-mid pa0 lh-solid br2 pointer'
const LABEL_BASE = 'w-100 tc'

const REGULAR = 'min-h-regular t-action'

const LABEL_REGULAR = 'ph6'

function getClassesByVariant(
  variant: ButtonProps['variant'],
  disabled: boolean
) {
  let container

  switch (variant) {
    case 'secondary':
      container = disabled ? SECONDARY_DISABLED : SECONDARY_ENABLED

    // no default
  }

  return { container }
}

function getClassesBySize(size: ButtonProps['size']) {
  let container
  let label

  switch (size) {
    default:
      container = REGULAR
      label = LABEL_REGULAR
  }

  return { container, label }
}

export default function useButtonClasses(options: Options = {}) {
  const { variant = 'secondary', disabled = false, size = 'regular' } = options
  return useMemo(() => {
    const variantClasses = getClassesByVariant(variant, disabled)
    const sizeClasses = getClassesBySize(size)
    const classes = {
      container: classnames(
        BASE_CONTAINER_CLASSES,
        variantClasses.container,
        sizeClasses.container
      ),
      label: classnames(LABEL_BASE, sizeClasses.label),
    }

    return classes
  }, [variant, disabled, size])
}
