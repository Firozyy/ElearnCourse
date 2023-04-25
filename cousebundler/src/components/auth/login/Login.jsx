import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../../redux/Action/action'
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const submithandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <Container h={'95vh'}>
            <VStack h={'full'} justifyContent='center' spacing={'16'}>
                <Heading children='WELCOME TO COURSEBUNDLER' />

                <form onSubmit={submithandler} style={{ width: "100%" }} >
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
                    </Box> <Box my={'4'}>
                        <FormLabel htmlFor='password' children='password' />
                        <Input
                            required
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='abc@123'
                            type={'password'}
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box>
                        <Link to={'/forgotpasssword'}>
                            <Button fontSize={'sm'} variant='link'>
                                Forgot password
                            </Button>
                        </Link>
                    </Box>
                    <Button my={'4'} colorScheme={'yellow'} type='submit'>
                        Login
                    </Button>

                    <Box my={'2'}>
                        Newuser?{' '}
                        <Link to={"/Register"}>
                            <Button variant={'link'} colorScheme='yellow'> SignUp</Button>
                        </Link>
                        here

                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Login