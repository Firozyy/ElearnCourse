import { Text, Button, Container, Heading, HStack, Input, Stack, VStack, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './courses.css'
import { useDispatch, useSelector } from 'react-redux'
import { getallcousrses } from '../../redux/Action/cousrseAction'
import { toast } from "react-hot-toast"
import { addtoplaylist } from '../../redux/Action/profile'
import {getmyprofile} from '../../redux/Action/action'
//element creation

const Course = ({ loading, views, title, id, imageSrc, addtoplaylisthandler, creator, discription, lecturecount }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize='60' objectFit={'contain'} />
            <Heading children={title} textAlign={['centere', 'left']} maxW='200px' fontFamily={'sans-serif'} noOfLines={2} size={'sm'} />

            <Text children={discription} noOfLines={2} />

            <HStack>
                <Text fontWeight={'bold'} textTransform='uppercase' noOfLines={2} children={"creator"} />
                <Text fontFamily={'body'} textTransform='uppercase' noOfLines={2} children={creator} />
            </HStack>
            <Heading textAlign={'center'} size='xs' children={`Lecture -${lecturecount}`} textTransform='uppercase' />
            <Heading
                size="xs"
                children={`Views - ${views}`}
                textTransform="uppercase"
            />
            <Stack direction={['column', 'row']} alignItems='center'>
                <Link to={`/course/${id}`}>
                    <Button colorScheme={'yellow'}>Watch Now</Button>

                </Link>
                <Button
                    isLoading={loading}
                    variant={'ghost'} colorScheme={'yellow'}
                    onClick={() => addtoplaylisthandler(id)}>
                    Add To Playlist
                </Button>
            </Stack>

        </VStack>


    )
}
function Courses() {
    const [keyword, setkeyword] = useState('')
    const [catagory, setCatagory] = useState('')
    const dispatch = useDispatch();


    const addtoplaylisthandler = async (courseId) => {

        await dispatch(addtoplaylist(courseId))
        dispatch(getmyprofile())
    };


    const catogories = [

        'Webdevelopment',
        "Artifcailintaligence",
        "Datastructure",
        "Appdeveloopment",
        "Gamedevelopment"
    ];

    const { courses, loading, errer, message } = useSelector(state => state.cources)

console.log(errer);

    useEffect(() => {
        dispatch(getallcousrses(catagory, keyword));

        if (errer) {
            toast.error(errer);
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearmessage" })
        }


    }, [catagory, keyword, dispatch, errer, message])

    return (
        <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
            <Heading children='ALL COURSES' margin={'8'} />

            <Input value={keyword} onChange={e => setkeyword(e.target.value)}
                placeholder='search a couse...' type={"text"}
                focusBorderColor='yellow.500'
            />
            <HStack className='catogories' overflowX={'auto'} paddingY='7'


            >
                {catogories.map((e, index) => (
                    <Button key={index} onClick={() => setCatagory(e)} minW={'60'}>
                        <Text children={e} />
                    </Button>
                ))}
            </HStack>
            <Stack
                direction={['column', 'row']}
                flexWrap='wrap'
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}

            >
                {
                    courses.length > 0 ? courses.map((item) => (
                        <Course
                            key={item._id}
                            views={item.views}
                            title={item.title}
                            discription={item.discription}

                            id={item._id}
                            creator={item.createdBy}
                            lecturecount={item.noOfvideos}
                            imageSrc={item.poster.url}
                            addtoplaylisthandler={addtoplaylisthandler}
                            loading={loading}

                        />
                    )) : <Heading>cousrse not found</Heading>
                }
            </Stack>
        </Container>
    )
}

export default Courses