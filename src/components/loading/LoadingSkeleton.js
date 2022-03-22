import React from 'react'

function LoadingSkeleton(props) {
  return (
    <div
    style={{
        width: props.width || '100%',
        height: props.height || '100%',
        borderRadius: props.radius || '0px'
    }}
    className={`${props.className ? props.className : ''} skeleton`}></div>
  )
}

export default LoadingSkeleton