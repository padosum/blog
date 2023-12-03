import { Box } from '@primer/components'
import React from 'react'
import Header from './header'
import '../styles/global.css'
import { getSidebarItems } from 'gatsby-theme-primer-wiki/src/utils/sidebar-items'

function Layout({ children, location, pageContext }) {
  const sidebarItems = pageContext.sidebarItems
  const tagsGroups = pageContext.tagsGroups
  const currentSlug = pageContext.slug
  const finalSidebarItems = getSidebarItems(sidebarItems, tagsGroups)
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bg="bg.primary"
      color="text.primary"
    >
      <Header
        currentSlug={currentSlug}
        location={location}
        sidebarItems={finalSidebarItems}
        tagsGroups={tagsGroups}
      />
      <Box
        display="flex"
        flex="1 1 auto"
        flexDirection="row"
        css={{ zIndex: 0 }}
        justifyContent="center"
      >
        <Box as="main" flex="1" maxWidth="60em">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
