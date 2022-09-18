import React from 'react'
import { Box, Text } from '@primer/components'

const WindowFooter = ({ count }) => {
  return (
    <Box display="flex" width="100%">
      <Box
        width="60%"
        ml="1"
        border="1px solid"
        borderColor="#888888 #dadada #dadada #888888"
        padding="1px 3px"
        fontSize="12px"
      >
        <Text color="text.window">{count + ` object(s)`}</Text>
      </Box>
      <Box
        width="40%"
        mr="1"
        border="1px solid"
        borderColor="#888888 #dadada #dadada #888888"
        padding="1px 3px"
      ></Box>
    </Box>
  )
}

export default WindowFooter
