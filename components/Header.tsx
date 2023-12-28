import React from 'react'

function Header() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">Our Blog</h1>
      <div>
        <a href="#" className="px-4">Travel</a>
        <a href="#" className="px-4">Food</a>
        <a href="#" className="px-4">Lifestyle</a>
        <a href="#" className="px-4">Technology</a>
      </div>
    </nav>
  )
}

export default Header