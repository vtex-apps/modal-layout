import React from 'react'
import classnames from 'classnames'

import useButtonClasses from '../modules/useButtonClasses'

interface AllClasses {
  button: string
  label: string
}

type Classes = Partial<AllClasses>

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode
  classes?: Classes
}

function Button(props: Props) {
  const { children, classes = {}, className, ...rest } = props
  const buttonClasses = useButtonClasses()

  const rootClasses = classnames(
    className,
    classes.button,
    buttonClasses.container
  )

  const labelClasses = classnames(classes.label, buttonClasses.label)

  return (
    <button className={rootClasses} {...rest}>
      <span className={labelClasses}>{children}</span>
    </button>
  )
}

export default Button
