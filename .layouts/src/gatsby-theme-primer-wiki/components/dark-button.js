import { ButtonOutline, themeGet } from '@primer/components'
import styled from 'styled-components'

const DarkButton = styled(ButtonOutline)`
  color: ${themeGet('colors.header.text')};
  background-color: transparent;
  box-shadow: none;
  border: 1px solid ${themeGet('colors.header.text')};
  border-radius: 0;
  &:hover {
    background-color: #0ac266;
  }
  &:hover > div {
    color: #fff;
  }
  &:hover svg {
    fill: #fff;
  }
`

export default DarkButton
