import { useEffect } from 'react';
import { Center, Image as ChakraImage } from '@chakra-ui/react';

interface ImageBoxProps {
  url: string;
  setIsValidImage: (valid: boolean) => void
}

const ImageBox: React.FC<ImageBoxProps> = ({ url, setIsValidImage }) => {

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setIsValidImage(true)
    };

    img.onerror = () => {
      setIsValidImage(false)
    }
  }, [url, setIsValidImage]);

  return (
    <>
      {url.length > 0 ?
        <Center>
          <ChakraImage
            boxSize='full'
            objectFit='contain'
            src={url}
            alt="default image"
          />
        </Center>
        : null}
    </>

  );
};

export default ImageBox;
