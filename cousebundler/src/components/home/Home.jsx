import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import vg from '../../assets/images/bg.png'
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";
import introVideo from '../../assets/videos/intro.mp4'

function Home() {
    return (
        <section className='home'>
            <div className="conatainer">
                <Stack direction={["column", 'row']} height="100%"
                    justifyContent={['center', 'space-between']}
                    alignItems="center"
                    spacing={['16', '56']}
                >
                    <VStack width={'full'} alignItems={['center', 'flex-end']} spacing='8'>
                        <Heading children="LEARN FROM EXPERTS " size={'2xl'} />
                        <Text fontFamily={'cursive'} fontSize={'2xl'} textAlign={['center','left']} children='Find Valueable Content At Reasonable Prise' />
                        <Link to={'/cousrses'}>
                            <Button size={"lg"} colorScheme='yellow' >Explor Now</Button>
                        </Link>
                    </VStack>
                    <Image
                        className='vector-graphics'
                        boxSize={'md'}
                        src={vg}
                        objectFit='contain'
                    />
                </Stack>
            </div>
            <Box bg={'blackAlpha.800'} padding={'8'}>
                <Heading textAlign={'center'}
                    fontFamily='body'
                    color={'yellow.400'}
                    children='OUR BRANDS'
                />
                <HStack
                    className='bradnBanner'
                    justifyContent={'space-evenly'}
                    marginTop='4'
                >
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>
            <div className="container2">
                <video
                  
                    controls
                    controlsList='nodownload nofullscreen noremoteplayback'
                    disablePictureInPicture
                    disableRemotePlayback

                    src={introVideo}

                ></video>
            </div>
        </section>
    )
}

export default Home