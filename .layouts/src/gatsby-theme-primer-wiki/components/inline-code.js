import styled from 'styled-components';
import themeGet from '@styled-system/theme-get';

const InlineCode = styled.code`
  padding: 0.2em 0.4em;
  font-family: ${themeGet('fonts.mono')};
  background-color: ${themeGet(
    'colors.text.neutralMuted'
  )}; // Copied from github.com
  border-radius: ${themeGet('radii.1')};
`;

export default InlineCode;
