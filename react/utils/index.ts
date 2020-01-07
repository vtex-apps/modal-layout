import { useLayoutEffect, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

export const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect
