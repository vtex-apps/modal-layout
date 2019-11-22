import React from 'react'
import classnames from 'classnames'

const styles: Record<string, React.CSSProperties> = {
  root: {
    zIndex: -1,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    touchAction: 'none',
  },
}

interface Props {
  invisible?: boolean
  open: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Backdrop: React.FC<Props> = props => {
  const { children, invisible, open, onClick } = props

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (onClick) {
      onClick(e)
    }
  }

  const rootClasses = classnames('o-50', {
    ['bg-base--inverted']: !invisible,
    ['bg-transparent']: invisible,
  })

  if (!open) {
    return null
  }

  return (
    <div
      style={styles.root}
      className={rootClasses}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Backdrop
