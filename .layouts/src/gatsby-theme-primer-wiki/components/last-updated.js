import { Text } from '@primer/components'
import React from 'react'
import useThemeConfig from 'gatsby-theme-primer-wiki/src/use-theme-config'

function LastUpdated({ lastUpdated }) {
  const primerWikiThemeConfig = useThemeConfig()
  const { lastUpdatedText, shouldShowLastUpdated } = primerWikiThemeConfig
  if (!shouldShowLastUpdated) {
    return null
  }
  return (
    <div>
      {lastUpdated ? (
        <Text fontSize={1} color="text.window" mt={1}>
          {lastUpdatedText} <b>{lastUpdated}</b>
        </Text>
      ) : null}
    </div>
  )
}

export default LastUpdated
