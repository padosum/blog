import React from 'react'
import { Box, Text } from '@primer/components'

const WindowButton = () => {
  return (
    <Box display="flex" alignItems="center">
      <Box
        width="16px"
        height="16px"
        bg="bg.window"
        border="2px solid"
        borderColor="#fff8ff #000000 #000000 #fff8ff"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontWeight="700"
        mr="2px"
      >
        <Box
          display="inline-block"
          height="2px"
          width="6px"
          background="black"
          marginTop="8px"
          marginRight="2px"
        ></Box>
      </Box>
      <Box
        width="16px"
        height="16px"
        bg="bg.window"
        border="2px solid"
        borderColor="#fff8ff #000000 #000000 #fff8ff"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontWeight="700"
        mr="2px"
      >
        <Box
          display="inline-block"
          height="8px"
          width="9px"
          borderColor="black"
          borderStyle="solid"
          borderWidth="2px 1px 1px"
        ></Box>
      </Box>
      <Box
        width="16px"
        height="16px"
        bg="bg.window"
        border="2px solid"
        borderColor="#fff8ff #000000 #000000 #fff8ff"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontWeight="700"
        pb="2px"
      >
        <Text color="black">×</Text>
      </Box>
    </Box>
  )
}
export default WindowButton
