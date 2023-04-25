import { Box, Button, Container, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FormLabel } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { contactUs } from '../../redux/Action/otherAction.js'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-hot-toast'

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [message, setmessage] = useState('');
   const dispatch = useDispatch();
   const submithandler =(e)=>{
e.preventDefault()
dispatch(contactUs(name,email,message))

   }
   const {loading ,error,message:statemessage} =useSelector( state => state.other);
   useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }
    if (statemessage) {
      toast.success(statemessage);
      dispatch({ type: "clearmessage" })
    }


  }, [dispatch, error, statemessage]);
    return (
        <Container h={'90vh'}>
            <VStack h={'full'} spacing='16' justifyContent={'center'} >
                <Heading children='CONTACT US' />
                <form onSubmit={submithandler}  style={{ width: "100%" }} >
                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input
                            required
                            id="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            placeholder='name'
                            type={'text'}
                            focusBorderColor='yellow.500'
                        />
                    </Box> 
                    <Box my={'4'}>
                        <FormLabel htmlFor='email' children='email address' />
                        <Input
                            required
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='abc@gmail.com'
                            type={'email'}
                            focusBorderColor='yellow.500'
                        />
                    </Box> 
                    <Box my={'4'}>
                        <FormLabel htmlFor='message' children='Message' />
                        <Textarea
                            required
                            id="message"
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            placeholder='message...'
                         
                            focusBorderColor='yellow.500'
                        />
                    </Box> 
                 
                 
               
                    <Button isLoading={loading} my={'4'} colorScheme={'yellow'} type='submit'>
                        send
                    </Button>
                    <Box my={'2'}>
                       Request a new course?{' '}
                        <Link to={"/request"}>
                            <Button variant={'link'} colorScheme='yellow'> Request</Button>
                        </Link>
                        {' '}
                        here

                    </Box>

                

                </form>
            </VStack>
        </Container>
    )
}

export default Contact