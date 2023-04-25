import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { ColorModeSwitcher } from '../../../ColorModeSwitcher.js'
import { useDispatch,} from 'react-redux'
import { logout } from '../../../redux/Action/action.js';
//created compenent
const Linkbutton = ({ url = '/', title = "home", onClose }) => (
    <Link onClick={onClose} to={url}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
)


function Header({ isAuthenticated = false, user }) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const dispatch = useDispatch();

    const logouthandler = () => {
        
        onClose();
        dispatch(logout())
    };

    return (
        <>
            <ColorModeSwitcher />
            <Button
                colorScheme={"yellow"}
                width='12'
                rounded='full'
                position={'fixed'}
                top='6'
                left='6'
                zIndex={'overlay'}
                onClick={onOpen}
            >
                <RiMenu5Fill />
            </Button>
            <Drawer
                placement='left'
                isOpen={isOpen}
                onClose={onClose}
            >
                <DrawerOverlay backdropFilter={'blur(3px)'} />
                <DrawerContent>
                    <DrawerHeader borderBottom={'1px'}>Course bundler</DrawerHeader>
                    <DrawerBody>

                        <VStack spacing={'4'} alignItems='flex-start'>
                            <Linkbutton onClose={onClose} url='/' title='Home' />
                            <Linkbutton onClose={onClose} url='/courses' title='Brows all Courses' />
                            <Linkbutton onClose={onClose} url='/request' title='Request a Cousrse' />
                            <Linkbutton onClose={onClose} url='/contact' title='contact us' />
                            <Linkbutton onClose={onClose} url='/about' title='About' />
                            <HStack
                                justifyContent={'space-evenly'}
                                position='absolute'
                                bottom={'2rem'} width='80%'
                            >
                                {isAuthenticated ? (<>
                                    <VStack>
                                        <HStack>
                                            <Link onClick={onClose} to={"/profile"}>
                                                <Button variant={'ghost'} colorScheme={"yellow"}>profile</Button>
                                            </Link>

                                            <Button variant={'ghost'} colorScheme={"yellow"} onClick={logouthandler}>
                                                <RiLogoutBoxLine />
                                                Logout
                                            </Button>

                                        </HStack>
                                        {user && user.role === 'admin' && (

                                            <Link onClick={onClose} to={'/admin/dashbord'}>
                                                <Button>
                                                    <RiDashboardFill />
                                                    Dashbord
                                                </Button>
                                            </Link>)}

                                    </VStack>

                                </>)

                                    : (<>

                                        <Link onClick={onClose} to={"/login"}>
                                            <Button colorScheme={"yellow"}>Login</Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link onClick={onClose} to={"/Register"}>
                                            <Button colorScheme={"yellow"}>Register</Button>
                                        </Link>
                                    </>)}
                            </HStack>



                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
