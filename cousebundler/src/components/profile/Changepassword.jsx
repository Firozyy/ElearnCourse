import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/Action/profile'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



function Changepassword() {
    const [oldPassword, setoldpassword] = useState('')
    const [newPassword, setNewpassword] = useState('')
const navigate =useNavigate();
    const dispatch = useDispatch()
    const submithandler = (e) => {
        e.preventDefault()
        dispatch(changePassword(oldPassword, newPassword))
        navigate('/profile')
    }
    const { loading, message, error } = useSelector( state => state.profile);
    useEffect(() => {

        if (error) {
          toast.error(error);
          dispatch({ type: "clearError" })
        }
        if (message) {
          toast.success(message);
          dispatch({ type: "clearmessage" })
        }
    
    
      }, [dispatch, error, message]);

    return (
        <Container py={'16'} minH={'90vh'}>
            <form onSubmit={submithandler} >
                <Heading
                    textTransform={'uppercase'}
                    my='16'
                    textAlign={['center', 'left']}
                >Change password</Heading>

                <VStack spacing={'8'}>
                    <Input
                        required

                        value={oldPassword}
                        onChange={(e) => setoldpassword(e.target.value)}
                        placeholder='Enter old password'
                        type={'password'}
                        focusBorderColor='yellow.500'
                    />
                    <Input
                        required

                        value={newPassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        placeholder='Ente New password'
                        type={'password'}
                        focusBorderColor='yellow.500'
                    />
                    <Button isLoading={loading} w={"full"} type='submit' colorScheme={'yellow'}>change</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default Changepassword