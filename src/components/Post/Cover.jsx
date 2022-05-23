// Módulos
import NextLink from 'next/link'
import Image from 'next/image'
import { Link, Box } from '@chakra-ui/react'

export const Cover = ({ src, alt, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link>
        <Box letterSpacing={0} wordSpacing={0} fontSize={0}>
          <Image
            src={src}
            alt={alt}
            width={680}
            height={382}
            objectFit="cover"
            priority
            style={{
              borderRadius: '4px',
            }}
          />
        </Box>
      </Link>
    </NextLink>
  )
}
