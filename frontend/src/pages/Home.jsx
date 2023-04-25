import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'

const Home = () => {
  return (
    <>
      <Container maxW='xl' centerContent>
        <Box
          display='flex'
          justifyContent='center'
          w="100%"
          bg={'white'}
          p={3}
          m='40px 0 15px 0'
          borderRadius='lg'
          borderWidth='1px'
        >
          <Text fontFamily='Work sans' fontSize='4xl'>
            Talk Epoch
          </Text>
        </Box>

        <Box
          bg='white'
          w='100%'
          p={4}
          borderRadius='lg'
          borderWidth='1px'
        >

          <Tabs variant='soft-rounded'>
            <TabList mb={'1em'}>
              <Tab width='50%' _selected={{ color: 'black', bg: '#6f8c94' }}>Login</Tab>
              <Tab width={'50%'} _selected={{ color: 'black', bg: '#6f8c94' }}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Box>
      </Container>
    </>
  )
}

export default Home
