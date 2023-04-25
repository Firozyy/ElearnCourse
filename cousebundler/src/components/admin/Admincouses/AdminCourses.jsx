import { Box, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { RiDeleteBin7Fill } from 'react-icons/ri'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import Cousrsemodel from './Cousrsemodel'
import { useDispatch, useSelector } from 'react-redux'
import { getallcousrses, getCourseLecture } from '../../../redux/Action/cousrseAction'
import { addLectures, deleteCourse, deletLecture } from '../../../redux/Action/admin'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

function AdminCourses() {

  const dispatch = useDispatch();
  const { courses, lectures } = useSelector(state => state.cources)
  const { loading, error, message } = useSelector(state => state.admin)

  useEffect(() => {

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" })
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearmessage" })
    }
    dispatch(getallcousrses())

  }, [dispatch, error, message])



  const { isOpen, onClose, onOpen } = useDisclosure();


  const [coursesID, setcoursesID] = useState('')
  const [coursestitle, setcoursestitle] = useState('')

  const CourscedetailsHandler = (courseId, title) => {

    onOpen();
    dispatch(getCourseLecture(courseId))
    setcoursesID(courseId)
    setcoursestitle(title)
  }

  const delethandler = (courseId) => {
    dispatch(deleteCourse(courseId))
  }
  ///workhere
  const deleteLectureButtonHandler = async (courseId, lectureId) => {


    await dispatch(deletLecture(courseId, lectureId))
    dispatch(getCourseLecture(courseId))

  };
  const addLectureHandler = async (e, id, title, discription, video) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", discription);

    myForm.append("file", video);
    await dispatch(addLectures(id, myForm));
  };

  return (
    <Grid
      css={{ cursor: `url(${cursor}),default` }}
      minH='100vh'
      templateColumns={['1fr', "5fr 1fr"]}

    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children=" Users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>

          <Table variant={'simple'} size="lg">

            <TableCaption>All available Cousrse in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Title</Th>
                <Th>Poster</Th>
                
                <Th>Catatagory</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                courses.map((item, index) => (
                  <Row key={index} CourscedetailsHandler={CourscedetailsHandler} delethandler={delethandler} item={item} loading={loading} />
                ))
              }

            </Tbody>

          </Table>
        </TableContainer>
        <Cousrsemodel
          isOpen={isOpen}
          onClose={onClose}
          id={coursesID}
          coursetitle={coursestitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading} />
      </Box>
      <Sidebar />
    </Grid>
  )
}

export default AdminCourses


function Row({ item, CourscedetailsHandler, delethandler, loading }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.title} </Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.catagory}</Td>

      <Td>{item.createdBy}</Td>

      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.noOfvideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button isLoading={loading} onClick={() => CourscedetailsHandler(item._id, item.title)} color={'purple.500'} variant={'outline'}>View lectures</Button>

          <Button isLoading={loading} onClick={() => delethandler(item._id)} color={"purple.500"} >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )

}
