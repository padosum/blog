import { ButtonOutline, themeGet } from '@primer/components'
import styled from 'styled-components'

const DarkButton = styled(ButtonOutline)`
  color: ${themeGet('colors.header.text')};
  background-color: transparent;
  box-shadow: none;
`

export default DarkButton
