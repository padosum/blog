import styled from 'styled-components'
import themeGet from '@styled-system/theme-get'

const Kbd = styled.kbd`
  border: 2px solid ${themeGet('colors.auto.gray.3')};
  border-radius: 0.25rem;
  box-shadow: inset 0 -1px 0 0 ${themeGet('colors.auto.gray.3')};
  font-size: 0.825rem;
  padding: 0.25rem;
  color: ${themeGet('colors.text.secondary')};
`

export default Kbd
