import { React, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router'

import { FormControl, FormLabel, Input, VStack, useStatStyles } from '@chakra-ui/react'
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react'


const Login = () => {

    const [show, setShow] = useState(false)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const history = useHistory()

    const handleText = () => setShow(!show)


    const submitHandler = async () => {

        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, { email, password })

        console.log(data)

        toast({
            title: 'Loged in successfully',
            duration: 2000,
            isClosable: true,
            position: 'bottom'
        })

        localStorage.setItem('user', JSON.stringify(data))
        setLoading(false)
        if (data) {
            history.push("/chat")
        }
    }

    return (
        <>
            <VStack spacing={'5px'}>
                <FormControl id='email' isRequired>
                    <FormLabel>E-mail</FormLabel>
                    <Input placeholder='Enter your E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={password}
                            type={show ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleText}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button
                    bgColor='#6f8c94'
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    w={'100%'}
                >
                    Login
                </Button>
                <Button
                    bgColor='#001a16'
                    color={'white'}
                    variant={'solid'}
                    w={'100%'}
                    onClick={() => {
                        setEmail('guest@example.com')
                        setPassword('123456')
                    }}
                >
                    Guest login
                </Button>
            </VStack>
        </>
    )
}

export default Login
