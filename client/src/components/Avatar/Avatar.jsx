import React from 'react'

const Avatar = ({children,cursor,backgroundColor,
  px,py,
  color,
  borderRadius,
  fontSize,
  textAlign,
height,
width}) => {
  const style = {
    backgroundColor,
    padding:`${px} ${py}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration:'none',
    height,
    width
  }
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Avatar