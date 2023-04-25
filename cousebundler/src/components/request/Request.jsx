import { Box, Button, Container, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FormLabel } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { couurserequest } from '../../redux/Action/otherAction';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-hot-toast'
function Request() {
    const [email, setEmail] = useState('');
    const [name, setname] = useState('');
    const [course, setcourse] = useState('');
    const dispatch = useDispatch();

    const submithandler =(e)=>{
        e.preventDefault()
        dispatch(couurserequest(name,email,course))
        
           }
           const {loading ,error,message} =useSelector( state => state.other);
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
        <Container h={'90vh'}>
            <VStack h={'full'} spacing='16' justifyContent={'center'} >
                <Heading children='Request a course' />
                <form onSubmit={submithandler} style={{ width: "100%" }} >
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
                        <FormLabel htmlFor='course' children='Message' />
                        <Textarea
                            required
                            id="course"
                            value={course}
                            onChange={(e) => setcourse(e.target.value)}
                            placeholder='Explain course'
                         
                            focusBorderColor='yellow.500'
                        />
                    </Box> 
                 
                 
               
                    <Button isLoading={loading} my={'4'} colorScheme={'yellow'} type='submit'>
                    Request
                    </Button>
                    <Box my={'2'}>
                       See available courses?{' '}
                        <Link to={"/courses"}>
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



export default Request