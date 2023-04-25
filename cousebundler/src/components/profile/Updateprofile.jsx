import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { updateProfile } from '../../redux/Action/profile';
import { useDispatch, useSelector } from 'react-redux'
import { getmyprofile } from '../../redux/Action/action';
import { useNavigate } from 'react-router-dom';
function Updateprofile({ user }) {
  const [email, setemail] = useState(user.email);
  const [name, setname] = useState(user.name)

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const submithandler = async (e) => {
    e.preventDefault()
    await dispatch(updateProfile(name, email))
    dispatch(getmyprofile())
    navigate('/profile')
  }

  const { loading } = useSelector(state => state.profile);


  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submithandler} >
        <Heading
          textTransform={'uppercase'}
          my='16'
          textAlign={['center', 'left']}
        >Update profile</Heading>

        <VStack spacing={'8'}>
          <Input


            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder='Name'
            type={'text'}
            focusBorderColor='yellow.500'
          />
          <Input


            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='email'
            type={'email'}
            focusBorderColor='yellow.500'
          />
          <Button isLoading={loading} w={"full"} type='submit' colorScheme={'yellow'}>Update</Button>
        </VStack>
      </form>
    </Container>
  )
}

export default Updateprofile