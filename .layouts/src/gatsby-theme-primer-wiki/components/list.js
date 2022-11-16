import styled from 'styled-components'
import themeGet from '@styled-system/theme-get'

const List = styled.ul`
  padding-left: 2em;
  margin-bottom: ${themeGet('space.1')};
  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    line-height: 1.6;
  }

  li:hover {
    background-color: hsla(212, 97%, 43%, 0.1);
  }

  li > p {
    margin-top: ${themeGet('space.3')};
  }

  li + li {
    margin-top: ${themeGet('space.2')};
  }
`

export default List
