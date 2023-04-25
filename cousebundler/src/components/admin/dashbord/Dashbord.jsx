import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import cursor from '../../../assets/images/cursor.png'
import Sidebar from '../Sidebar'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector, } from 'react-redux'
import { getdashbordstats } from '../../../redux/Action/admin'
import Loader from '../../layout/loader/Loader'
const Databox = ({ title, qty, qtypersentage, profit }) => (
  <Box width={['full', '20%']} boxShadow={'2px 0 10px #888888'} p='8' borderRadius={'lg'}>
    <Text>

      {title}
    </Text>

    <HStack>
      <Text fontSize={'2xl'} fontWeight='bold' >{qty} </Text>

      <HStack>
        <Text>

          {qtypersentage}
        </Text>
        {profit ? <RiArrowUpLine color='green' /> : (
          <RiArrowDownLine color='red' />
        )}
      </HStack>

    </HStack>


    <Text opacity={0.6}> Since Last Month</Text>

  </Box>
);


const Bar = ({ title, value, profit }) => (
  <Box py="4" px={['0', '20']}>
    <Heading size="sm" children={title} mb="2" />
    <HStack w="full" alignItems={'center'}>
      <Text>
        {profit ? '0%' : `-${value}%`}
      </Text>
      <Progress w={'full'} value={profit ? value : 0} colorScheme="purple" />
      <Text>
        {`${value > 100 ? value : 100}%`}
      </Text>

    </HStack>
  </Box>

);

function Dashbord() {

  const dispatch = useDispatch()
  const { loading,
    stats,
    usersCount,
    viewsCount,
    subscriptionCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector(state => state.admin)
  console.log(viewsPercentage);
  useEffect(() => {
    dispatch(getdashbordstats())
  }, [dispatch])


  return (
    <Grid
      css={{ cursor: `url(${cursor}),default` }}
      minH='100vh'
      templateColumns={['1fr', "5fr 1fr"]}

    >
      {loading || !stats ? (<Loader />) : (
        <Box boxSizing='border-box' py='16' px={['4', '0']}>

          <Text textAlign={'center'} opacity={0.5}>
            {` last change was on ${String(new Date(stats[11].createdAT)).split("G")[0]}`}
          </Text>


          <Heading ml={['0', "16"]} marginBottom='16' textAlign={['center', 'left']}>

            Dashbord
          </Heading>

          <Stack
            direction={['column', 'row']} minH='24' justifyContent={'space-evenly'}

          >
            <Databox title={"views"} qty={viewsCount} qtypersentage={viewsPercentage} profit={viewsProfit} />
            <Databox title={"Users"} qty={usersCount} qtypersentage={usersPercentage} profit={usersPercentage} />
            <Databox title={"Subscription"} qty={subscriptionCount} qtypersentage={subscriptionPercentage} profit={subscriptionProfit} />

          </Stack>
          <Box
            m={['0', '16']}
            borderRadius="lg"
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >

            <Heading
              textAlign={['center', 'left']}
              size="md"

              pt={['8', '0']}
              ml={['0', '16']}
            >
              Views Graph
            </Heading>
            {/*grapg here*/}
            <LineChart views={stats.map(i=> i.views)} />
          </Box>

          <Grid templateColumns={['1fr', '2fr 1fr']}>

            <Box p="4">

              <Heading
                textAlign={['center', 'left']}
                size="md"

                my="8"
                ml={['0', '16']}
              >
                Progress Bar
              </Heading>
              <Box>
                <Bar
                  profit={viewsProfit}
                  title="Views"
                  value={viewsPercentage}
                />
                <Bar
                  profit={usersProfit}
                  title="Users"
                  value={usersPercentage}
                />
                <Bar
                  profit={subscriptionProfit}
                  title="Subscription"
                  value={subscriptionPercentage}
                />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing="border-box" py="4">
              <Heading textAlign={'center'} size="md" mb="4" children="Users" />

              <DoughnutChart users={[subscriptionCount,usersCount-subscriptionCount]} />
            </Box>


          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  )
}

export default Dashbord