import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react'

import axios from 'axios'
import { useHistory } from 'react-router'

import React, { useState } from 'react'

const SignUp = () => {

    const [show, setShow] = useState(false)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [conformPassword, setConfirmPassword] = useState()


    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleText = () => setShow(!show)

    const toast = useToast()


    const postDetails = (pic) => {

        setLoading(true)

        if (pic === undefined) {
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })

            return
        }

        console.log(pic)

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData()
            data.append('file', pic)
            data.append('upload_preset', 'app-chat')
            data.append('cloud_name', 'talk-epoch')

            fetch("https://api.cloudinary.com/v1_1/talk-epoch/image/upload", {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
        else {
            toast({
                title: 'Please select an image',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })
        }

    }

    const submitHandler = async () => {

        setLoading(true)

        if (!name || !email || !password || !conformPassword || !pic) {
            toast({
                title: 'Filled out all the neccessary details',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        if (password !== conformPassword) {
            toast({
                title: 'Password and confirm password are not matched',
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })
            return
        }

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }

            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, { name, email, password, pic }, config)

            console.log(data)

            toast({
                title: 'Registration has been done successfully',
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
        catch (err) {
            toast({
                title: 'Something went wrong',
                status: err.response.data.message,
                duration: 2000,
                isClosable: true,
                position: 'bottom'
            })

            setLoading(false)
        }

    }

    return (
        <>
            <VStack spacing={'5px'}>

                <FormControl id='name' isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
                </FormControl>
                <FormControl id='email' isRequired>
                    <FormLabel>E-mail</FormLabel>
                    <Input placeholder='Enter your E-mail' onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
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
                <FormControl id="rePassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            type={show ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleText}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id='pic'>
                    <FormLabel>Upload your picture</FormLabel>
                    <Input
                        type='file'
                        p={1.5}
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                </FormControl>
                <Button
                    bgColor='#6f8c94'
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    w={'100%'}
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </VStack>
        </>
    )
}

export default SignUp
