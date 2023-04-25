import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from "react-icons/ri";
function Sidebar() {
  let location = useLocation();
  return (
    <VStack spacing={'8'} p
      ='16' boxShadow={'2px 0 10px #888888'}>
   <Linkbutton Icon={RiDashboardFill} text={"Dashbord"} url={"dashbord"} active={location.pathname==='/admin/dashbord'}/>
   <Linkbutton Icon={RiAddCircleFill} text={"Create course"} url={"createcourse"}active={location.pathname==='/admin/createcourse'}/>

   <Linkbutton Icon={RiEyeFill} text={"Courses"} url={"courses"} active={location.pathname==='/admin/courses'}/>
   <Linkbutton Icon={RiUser3Fill} text={"Users"} url={"users"} active={location.pathname==='/admin/users'}/>

    </VStack>

  )
}
export default Sidebar
function Linkbutton({url,Icon,text,active}) {
  return(
    <Link to={`/admin/${url}`}>

        <Button colorScheme={active ? "purple":''} fontSize='large' variant={'ghost'}>
          <Icon style={{ margin: '4px' }} />
         { text}
        </Button>
      </Link>
  )
}