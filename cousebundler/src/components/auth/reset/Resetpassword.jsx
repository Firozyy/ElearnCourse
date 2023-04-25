import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetpassword } from '../../../redux/Action/profile';
import { toast } from 'react-hot-toast';

function Resetpassword() {
    const [Password, setPassword] = useState('');
    const { token } = useParams();

    const dispatch = useDispatch();
    const submithandler = (e) => {
        e.preventDefault();
        dispatch(resetpassword(token, Password));
    };
    const navigate = useNavigate()
    const { loading, message, error } = useSelector(state => state.profile);
    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearmessage" })
            navigate('/login')
        }


    }, [dispatch, error, message,navigate]);

    return (
        <Container h={"90vh"} py='16'>
            <form onSubmit={submithandler}>
                <Heading children='Reset password'
                    textAlign={['center', 'center']}
                    textTransform='uppercase'
                    my={'16'}
                />
                <VStack spacing={'8'}>

                    <Input
                        required

                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='NewPassword'
                        type={'Password'}
                        focusBorderColor='yellow.500'
                    />

                    <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow'>Update Password</Button>

                </VStack>
            </form>


        </Container>
    )
}

export default Resetpassword