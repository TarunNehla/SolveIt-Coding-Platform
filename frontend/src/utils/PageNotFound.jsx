import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate();
    return (
    <div>
        <h2>404 Page not found</h2>
        <button onClick={()=>navigate('/login')}>Login here</button>
    </div>
  )
}

export default PageNotFound