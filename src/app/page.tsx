'use client'
import { Button, Image as ChakraImage, Center, HStack, Heading, Input, Spacer, Text, VStack, Image, Select, Box, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageBox from './ImageBox'

const url = process.env.NEXT_PUBLIC_URL

const API = axios.create({
  baseURL: url
})

type FaceDetect = {
  Joy: string;
  Anger: string;
  HeadWear: string;
  Sorrow: string;
  Blurred: string;
  Surprised: string;
  UnderExposed: string;
}

const Home = () => {
  const [url, setUrl] = useState<string>('')
  const [isValidImage, setIsValidImage] = useState<boolean>(false)
  const [mode, setMode] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [response, setResponse] = useState<string[]>()
  const [extractText, setExtractText] = useState<string>('');
  const [faceDetect, setFaceDetect] = useState<FaceDetect[]>([]);

  const toast = useToast()

  async function handleClick() {
    setResponse([])
    setExtractText('')
    setFaceDetect([])
    setIsLoading(true)
    if (mode == 1) {
      try {
        const res = await API.get(`/logo?url=${url}`)
        setResponse(res.data)
        return
        
      } catch (error) {
        toast({
          title: 'Error',
          status: 'error',
          description: 'Unable to process image with chosen option',
          isClosable: true,
          duration: 3000
        })
        return
      } finally {
        setIsLoading(false)
      }
    }
    if (mode == 2) {
      try {
        const res = await API.get(`/text?url=${url}&mode=2`)
        setExtractText(res.data)
        return
      } catch (error) {
        toast({
          title: 'Error',
          status: 'error',
          description: 'Unable to process image with chosen option',
          isClosable: true,
          duration: 3000
        })
        return
      } finally {
        setIsLoading(false)
      }
    }
    if (mode == 3) {
      try {
        const res = await API.get(`/face?url=${url}`)
        setFaceDetect(res.data)
        return
        
      } catch (error) {
        toast({
          title: 'Error',
          status: 'error',
          description: 'Unable to process image with chosen option',
          isClosable: true,
          duration: 3000
        })
        return
      } finally {
        setIsLoading(false)
      }
    }

  }

  function handleMode(mode: string) {
    if (mode == 'logo') setMode(1)
    if (mode == 'text') setMode(2)
    if (mode == 'face') setMode(3)
  }

  return (
    <>
      <Spacer h='30' />
      <VStack>
        <Heading fontFamily='body' size={{ base: 'lg', md: 'xl' }} color='primary' >PictoPulse</Heading>
        <Input
          w={{ base: 'xs', sm: 'lg' }}
          focusBorderColor='primary'
          placeholder='Insert link'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <Box
          w={{ base: 'sm', md: 'lg' }} h={{ base: 'sm', md: 'md' }} border='1px' overflow='hidden'
        >
          <ImageBox url={url} setIsValidImage={setIsValidImage} />
          {/* {url.length > 0 ?
            <Center>
              <Image
                w='full' h='full'
                objectFit='contain'
                src={url}
                alt="default image"
              />
            </Center>
            : null} */}
        </Box>
        <HStack>
          <Select
            focusBorderColor='primary'
            onChange={e => handleMode(e.target.value)}
          >
            <option value='logo'>Identifying Logo</option>
            <option value='text'>Text Extraction</option>
            <option value='face'>Face Detection</option>
          </Select>
          <Button
            size='md'
            onClick={handleClick}
            backgroundColor='primary'
            color='white'
            isDisabled={!isValidImage ? true : false}
            isLoading={isLoading}
            _hover={{
              backgroundColor: 'secondary'
            }}
          >Process
          </Button>

        </HStack>
        {response ?
          <VStack
            width='lg'
          >
            {response.map(res => (
              <>
                <Text  >{res}</Text>
              </>
            ))}
          </VStack> : null}
        {extractText.length > 0 ? <>
          <Box w={{ base: 'sm', sm: 'lg' }} >
            <Text  >{extractText}</Text>
          </Box>
        </> : null}
        {faceDetect.length > 0 && <>
          <Box color='black'  >
            <Center>
              <Text fontSize='xl'>Number of Face Detected: {faceDetect.length}</Text>
            </Center>
            <Wrap mt='10px'  justify='center' >
              {faceDetect.map((fd, index) => (
                <WrapItem border='1px' p='10px' key={index}>
                    <VStack>

                    <HStack>
                      <Text>Joy:</Text>
                      <Text color='primary'>{fd.Joy}</Text>
                    </HStack>
                    <HStack>
                      <Text>Anger: </Text>
                      <Text color='primary'>{fd.Anger}</Text>
                    </HStack>
                    <HStack>
                      <Text>HeadWear: </Text>
                      <Text color='primary'>{fd.HeadWear}</Text>
                    </HStack>
                    <HStack>
                      <Text>Sorrow: </Text>
                      <Text color='primary'>{fd.Sorrow}</Text>
                    </HStack>
                    <HStack>
                      <Text>Blurred: </Text>
                      <Text color='primary'>{fd.Blurred}</Text>
                    </HStack>
                    <HStack>
                      <Text>Surprised: </Text>
                      <Text color='primary'>{fd.Surprised}</Text>
                    </HStack>
                    <HStack>
                      <Text>UnderExposed: </Text>
                      <Text color='primary'>{fd.UnderExposed}</Text>
                    </HStack>
                    </VStack>
                </WrapItem>
              ))}

            </Wrap>
          </Box>
        </>}
      </VStack>
    </>
  )
}

export default Home