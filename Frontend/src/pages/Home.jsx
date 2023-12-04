import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

  const user = useSelector(state => state.user)
  return (
    <>  
      <h1>
        home
      </h1>
    </>
  )
}

export default Home
