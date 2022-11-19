import themeGet from '@styled-system/theme-get';
import styled from 'styled-components';

const Image = styled.img`
  max-width: 100%;
  box-sizing: content-box;
  border: 1px solid ${themeGet('colors.text.primary')};
  border-radius: 6px;
`;

export default Image;
