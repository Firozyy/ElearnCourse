import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ModalFooter } from 'react-bootstrap';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import { fileuploderCss } from '../auth/register/Register';
import { useDispatch, useSelector } from 'react-redux'
import { removePlaylist, updateProfilePicture } from '../../redux/Action/profile';
import { cancelSubscrioption, getmyprofile } from '../../redux/Action/action';
import { toast } from 'react-hot-toast';



function Profile({ user }) {

    const dispatch = useDispatch()
    const { loading, message, error } = useSelector(state => state.profile);
    const { loading: subscriptionloading, message: subscriptionmessage, error: subscriptionerror } = useSelector(state => state.subscription);
    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearmessage" })
        }
        if (subscriptionerror) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }
        if (subscriptionmessage) {
            toast.success(message);
            dispatch({ type: "clearmessage" })
        }

    }, [dispatch, error, message, subscriptionmessage, subscriptionerror]);

    const removeplaylisthandler = async (id) => {
        await dispatch(removePlaylist(id))
        dispatch(getmyprofile());
    };

    const changeImageHnadler = async (event, image) => {
        event.preventDefault();

        const myform = new FormData();
        myform.append("file", image)
        await dispatch(updateProfilePicture(myform));

        dispatch(getmyprofile());
    };


    const cancelsubscription = async () => {
        await dispatch(cancelSubscrioption());
        dispatch(getmyprofile());
    }

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (

        <Container
            minH={'95vh'}
            maxW='container.lg'
            py={'8'}
        >
            <Heading m={'8'}
                textTransform='uppercase'   >

                profile
            </Heading>
            <Stack
                justifyContent={'center'}
                direction={['column', 'row']}
                alignItems={'center'}
                spacing={["8", "16"]}
                padding='8'
            >

                <VStack>

                    <Avatar boxSize={'48'} src={user.avatar.url
                    } />

                    <Button onClick={onOpen} colorScheme={'yellow'} variant='ghost'>

                        CHANGE PHOTO
                    </Button>
                </VStack >

                <VStack spacing={'4'} alignItems={["center", 'flex-start']}>
                    <HStack>
                        <Text fontWeight={'bold'}>
                            Name
                        </Text>
                        <Text >
                            {user.name}
                        </Text>
                    </HStack>
                    <HStack>
                        <Text fontWeight={'bold'}>
                            Email
                        </Text>
                        <Text >
                            {user.email}
                        </Text>
                    </HStack> <HStack>
                        <Text fontWeight={'bold'}>
                            createdAt
                        </Text>
                        <Text >
                            {user.createdAT.split('T')[0]}
                        </Text>
                    </HStack>

                    {user.role !== "admin" && (
                        <HStack>
                            <Text fontWeight={'bold'}>SUBSCRIPTION</Text>
                            {user.subscription && user.subscription.status === 'active' ? (
                                <Button isLoading={subscriptionloading} onClick={cancelsubscription} variant={'unstyled'} color={'yellow.500'}>Cancel Subscription</Button>
                            ) : (
                                <Link to={'/subscribe'}>
                                    <Button isLoading={loading} colorScheme={'yellow'}>Subscribe</Button>
                                </Link>
                            )
                            }
                        </HStack>
                    )}

                    <Stack direction={['column', 'row']}
                        alignItems={'center'}>

                        <Link to={"/updateprofile"}>
                            <Button>Update profile</Button>
                        </Link>
                        <Link to={"/changepassword"}>
                            <Button>Change Passwrord</Button>
                        </Link>
                    </Stack>

                </VStack>
            </Stack>


            <Heading size={'md'} my='8'>Playlist</Heading>
            {
                user.playlist.length > 0 && (
                    <Stack
                        direction={['column', 'row']}
                        flexWrap='wrap'
                        alignItems={'center'}
                        p='4'


                    >

                        {
                            user.playlist.map((e, index) => (

                                <VStack w='48' key={e.course}>
                                    <Image boxSize={"full"} objectFit='contain' src={e.poster} />
                                    <Link to={`/course/${e.course}`}>
                                        <Button variant={'ghost'} colorScheme={'yellow'}>    Watch Now</Button>

                                    </Link>
                                    <Button onClick={() => removeplaylisthandler(e.course)}>

                                        <RiDeleteBin7Fill />
                                    </Button>
                                </VStack>
                            ))
                        }

                    </Stack>
                )
            }

            <ChangephotBox
                changeImageHnadler={changeImageHnadler}
                isOpen={isOpen}
                onClose={onClose}
                loading={loading} />
        </Container>


    )
}

export default Profile
function ChangephotBox({ isOpen, onClose, changeImageHnadler, loading }) {
    const [ImagePrev, setImagePrev] = useState('')
    const [image, setImage] = useState('')


    const Changeimage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const closehandler = () => {
        onClose();
        setImagePrev('');
        setImage('');
    }
    return (
        <Modal isOpen={isOpen} onClose={closehandler}>

            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <Container>
                        <form onSubmit={e => changeImageHnadler(e, image)}>
                            <VStack spacing={'8'}>

                                {ImagePrev && (
                                    <Avatar src={ImagePrev} boxSize={'48'} />
                                )}
                                <Input type={'file'} css={{ "&::file-selector-button": fileuploderCss }}
                                    onChange={Changeimage}
                                />
                                <Button isLoading={loading} width={'full'} type='submit' colorScheme={'yellow'}>Change</Button>
                            </VStack>
                        </form>
                    </Container>

                </ModalBody>

                <ModalFooter>
                    <Button mr='3' onClick={closehandler}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}