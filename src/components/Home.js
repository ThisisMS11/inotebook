import React from 'react'
import Notes from './Notes'

export const Home = (props) => {

  return (
    <div>
      {/* Notes :-> Contains the code for showing all the user's notes, itself inheriting Noteitem component */}
      <Notes showalert={props.showalert}/>
    </div>
  )
}

export default Home


