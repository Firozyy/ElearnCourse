import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getCourseLecture } from '../../redux/Action/cousrseAction'
import Loader from '../layout/loader/Loader'
function Coursepage({ user }) {


    const [lecturenumber, setlecturenomber] = useState(0);
    const { lectures, loading } = useSelector(state => state.cources)


    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {

        dispatch(getCourseLecture(params.id))
    }, [dispatch, params.id])


    if ((user.role !== 'admin' && user.subscription === undefined) || (user.subscription.status !== "active")) {

        return <Navigate to={'/subscribe'} />
    }


    return (

        loading ? <Loader /> : (
            <Grid
                minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
                {lectures && lectures.length > 0 ? (
                    <>
                        <Box>

                            <video
                                width={'100%'}
                                controls
                                controlsList='nodownload noremotplayback'
                                disablePictureInPicture
                                disableRemotePlayback
                                src={lectures[lecturenumber].video.url}

                            >

                            </video>
                            <Heading children={`# ${lecturenumber + 1}  ${lectures[lecturenumber].title}`}
                                m={'4'} />
                            <Heading children='Discription'
                                m={'4'} />
                            <Text m={'4'} children={lectures[lecturenumber].description} />
                        </Box>
                        <VStack>
                            {
                                lectures.map((e, index) => (
                                    <button
                                        onClick={() => setlecturenomber(index)}
                                        style={{
                                            width: "100%",
                                            padding: "1rem",
                                            textAlign: 'center',
                                            margin: '0',
                                            borderBottom: '1px solid rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        <Text noOfLines={'1'}>
                                            #{index + 1} {e.title}
                                        </Text>
                                    </button>
                                ))
                            }
                        </VStack>
                    </>
                ):(
                    <Heading>No lectures</Heading>
                )
            }

            </Grid>
        )
    )
}

export default Coursepage
