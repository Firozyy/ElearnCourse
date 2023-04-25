import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

import { RiDeleteBin7Fill } from 'react-icons/ri'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import { deleteuser, getAlluser, updateuser } from '../../../redux/Action/admin'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
function User() {
  const dispatch =useDispatch()
  const {users,loading,error,message} =useSelector(state => state.admin);
  console.log(users);
  // const users = [{
  //   id: "a1",
  //   Name:
  //     "abisheke",
  //   Role: 'admin',
  //   Subscription: {
  //     status: 'active'
  //   },
  //   Email: "sjhf@RiGll.com"
  // }];

  const updatehandler = (userid) => {
    dispatch(updateuser(userid))
  }
  const delethandler = (userid) => {
    dispatch(deleteuser(userid))
  }

useEffect(() => {

  dispatch(getAlluser())
  if (error) {
    toast.error(error);
    dispatch({ type: "clearError" })
  }
  if (message) {
    toast.success(message);
    dispatch({ type: "clearmessage" })
  }
}, [dispatch,error,message])


  return (
    <Grid
      css={{ cursor: `url(${cursor}),default` }}
      minH='100vh'
      templateColumns={['1fr', "5fr 1fr"]}

    >
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>

          <Table variant={'simple'} size="lg">

            <TableCaption>All available users in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
               users && users.map(item => (
                  <Row updatehandler={updatehandler} delethandler={delethandler} key={item._id} item={item} loading={loading} />
                ))
              }

            </Tbody>

          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  )
}

export default User


function Row({ item, updatehandler, delethandler,loading }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>

      <Td >
        #{item.subscription && item.subscriptionstatus === 'activ' ? "Activ " : "Not Active"}

      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button isLoading={loading}  onClick={() => updatehandler(item._id)} color={'purple.500'} variant={'outline'}>Change role</Button>

          <Button isLoading={loading}  onClick={() => delethandler(item._id)} color={"purple.500"} >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )

}