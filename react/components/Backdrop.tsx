import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

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

const CSS_HANDLES = ['backdrop']

const Backdrop: React.FC<Props> = props => {
  const { children, invisible, open, onClick } = props
  const handles = useCssHandles(CSS_HANDLES)

  if (!open) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  const rootClasses = classnames(handles.backdrop, 'o-50', {
    ['bg-base--inverted']: !invisible,
    ['bg-transparent']: invisible,
  })

  return (
    <div
      style={styles.root}
      onClick={handleClick}
      className={rootClasses}
    >
      {children}
    </div>
  )
}

export default Backdrop
