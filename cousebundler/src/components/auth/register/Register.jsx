import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/Action/action.js'
export const fileuploderCss = {
    cursor: "poimter", marginLeft: '-5%', width: '110%', border: 'none', height: "100%", color: "ECC948", backgroundColor: 'white'
}
const fileUploadStyle = {
    " &::file-selector-button": fileuploderCss
}
function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ImagePrev, setImagePrev] = useState('')
    const [imAge, setImage] = useState('')
  

    const changeImageHnadler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const dispatch = useDispatch();
    const registerhandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("file", imAge);
        dispatch(register(myForm));
    };
    return (
        <Container >
            <VStack h={'full'} justifyContent='center' spacing={'16'}>
                <Heading children='Registration' />

                <form onSubmit={registerhandler} style={{ width: "100%" }} >
                    <Box my={'4'} display='flex' justifyContent={'center'} >
                        <Avatar src={ImagePrev} size={'2xl'} />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input
                            required
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='abc'
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

                    <Box my={'4'}>
                        <FormLabel htmlFor='chooseAvatar' children='password' />
                        <Input
                            required
                            id="chooseAvatar"
                            accept='image/*'

                            type={'file'}
                            focusBorderColor='yellow.500'
                            css={fileUploadStyle}
                            onChange={changeImageHnadler}
                        />
                    </Box>

                    <Button my={'4'} colorScheme={'yellow'} type='submit'>
                        SignUp
                    </Button>

                    <Box my={'2'}>
                        already accoount?{' '}
                        <Link to={"/login"}>
                            <Button variant={'link'} colorScheme='yellow'> Login</Button>
                        </Link>
                        here

                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Register