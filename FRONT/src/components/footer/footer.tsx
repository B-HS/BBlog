import Flex from '../flex'

const Footer = async () => {
    return (
        <Flex className='flex-col items-center justify-center mt-1.5 h-12 bg-background'>Copyright © {new Date().getFullYear()}. Hyunseok Byun</Flex>
    )
}

export default Footer
