import { useLayoutEffect, useEffect } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

const useEnhancedEffect = canUseDOM ? useLayoutEffect : useEffect

export default useEnhancedEffect
