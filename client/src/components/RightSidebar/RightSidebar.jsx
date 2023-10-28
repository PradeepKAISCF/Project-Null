import React from 'react'
import './Widget.jsx'
import WidgetsTag from './WidgetsTag'
import Widget from './Widget'

const RightSidebar = () => {
  return (
    <aside className='right-sidebar'>
        <Widget/>
        <WidgetsTag/>
    </aside>
  )
}

export default RightSidebar