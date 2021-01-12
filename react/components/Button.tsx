import React from 'react'
import classnames from 'classnames'

import useButtonClasses from '../modules/useButtonClasses'

interface AllClasses {
  button: string
  label: string
}

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode
  handles?: Partial<AllClasses>
}

function Button(props: Props) {
  const { children, handles = {}, className, ...rest } = props
  const buttonClasses = useButtonClasses()

  const rootClasses = classnames(
    className,
    handles.button,
    buttonClasses.container
  )

  const labelClasses = classnames(handles.label, buttonClasses.label)

  return (
    <button className={rootClasses} {...rest}>
      <span className={labelClasses}>{children}</span>
    </button>
  )
}

export default Button
