import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { forgotPassword } from '../../../redux/Action/profile'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'


function Forgotpassword() {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();
    const submithandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    const { loading, message, error } = useSelector(state => state.profile);
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
        <Container h={"90vh"} py='16'>
            <form onSubmit={submithandler}>
                <Heading children='Forget Password'
                    textAlign={['center', 'center']}
                    textTransform='uppercase'
                    my={'16'}
                />
                <VStack spacing={'8'}>

                    <Input
                        required

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='abc@gmail.com'
                        type={'email'}
                        focusBorderColor='yellow.500'
                    />

                    <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow'>Sent resnt link</Button>

                </VStack>
            </form>


        </Container>
    )
}

export default Forgotpassword