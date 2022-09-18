import React from 'react'
import { Box, Text } from '@primer/components'
import WindowButton from './window-button'

const WindowTitle = ({ title }) => {
  return (
    <Box
      width="100%"
      bg="bg.title"
      p="2px 4px 3px 4px"
      display="flex"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <img src={'/file.png'}></img>
        <Text fontWeight="bold" color="#bfb8bf" fontSize={14}>
          {title}
        </Text>
      </Box>
      <WindowButton></WindowButton>
    </Box>
  )
}

export default WindowTitle
