import React, { useRef, useEffect } from 'react'

interface Props {
  children: React.ReactElement
  open: boolean
}

const TrapFocus: React.FC<Props> = (props) => {
  const { children, open } = props
  const childRef = useRef<HTMLElement>()

  useEffect(() => {
    if (open && childRef.current) {
      childRef.current.focus()
    }
  }, [open])

  return <>{React.cloneElement(children, { ref: childRef })}</>
}

export default TrapFocus
