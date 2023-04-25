import { Button } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom'
import { RiErrorWarningFill } from 'react-icons/ri';
function Notfound() {
  return (
    <div className="notfound">
      <div className="errer">
        <div >
          <RiErrorWarningFill className='errersymbol'/>
        </div>
        <div className="errermessage">
        <h1> Page Not Found</h1>
          <Link to={"/"} >
            <Button variant={'link'} w='full'>Go to home</Button>
          </Link>

        </div>


      </div>
    </div>
  )
}

export default Notfound