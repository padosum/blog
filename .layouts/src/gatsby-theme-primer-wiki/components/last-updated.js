import { Text } from '@primer/components'
import React from 'react'
import useThemeConfig from 'gatsby-theme-primer-wiki/src/use-theme-config'

const CreatedText = ({ created }) => {
  return (
    <Text fontSize={1} color="text.window" mt={1} mr={2}>
      {'문서 생성 시각 '} <u>{created.replace(/\+.*$/, '')}</u>
    </Text>
  )
}

const Spacing = () => {
  return <span style={{ margin: '0 6px' }}> ∙ </span>
}
function LastUpdated({ created, lastUpdated }) {
  const primerWikiThemeConfig = useThemeConfig()
  const { lastUpdatedText, shouldShowLastUpdated } = primerWikiThemeConfig

  const lastUpdatedString = lastUpdated.replace(/T/, ' ').replace(/\..+/, '')
  if (!shouldShowLastUpdated) {
    return null
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {created && <CreatedText created={created} />}
      {lastUpdated ? (
        <Text fontSize={1} color="text.window" mt={1}>
          {lastUpdatedText} <u>{lastUpdatedString}</u>
        </Text>
      ) : null}
    </div>
  )
}

export default LastUpdated
