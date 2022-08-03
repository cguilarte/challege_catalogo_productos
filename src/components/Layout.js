import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="outlet">
      <div className="scaffold-layout">
        <div className="scaffold-layout-container">
          <div className="scaffold-layout__row scaffold-layout__content scaffold-layout__content--sidebar-main-aside">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout