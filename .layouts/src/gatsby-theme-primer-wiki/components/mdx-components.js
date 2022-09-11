import Blockquote from 'gatsby-theme-primer-wiki/src/components/blockquote'
import Caption from 'gatsby-theme-primer-wiki/src/components/caption'
import Code from 'gatsby-theme-primer-wiki/src/components/code'
import DescriptionList from 'gatsby-theme-primer-wiki/src/components/description-list'
import {
  Do,
  DoDontContainer,
  Dont,
} from 'gatsby-theme-primer-wiki/src/components/do-dont'
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
} from 'gatsby-theme-primer-wiki/src/components/heading'
import HorizontalRule from 'gatsby-theme-primer-wiki/src/components/horizontal-rule'
import Image from 'gatsby-theme-primer-wiki/src/components/image'
import ImageContainer from 'gatsby-theme-primer-wiki/src/components/image-container'
import InlineCode from 'gatsby-theme-primer-wiki/src/components/inline-code'
import List from 'gatsby-theme-primer-wiki/src/components/list'
import Note from 'gatsby-theme-primer-wiki/src/components/note'
import Paragraph from 'gatsby-theme-primer-wiki/src/components/paragraph'
import Table from 'gatsby-theme-primer-wiki/src/components/table'
import AnchorTag from 'gatsby-theme-primer-wiki/src/components/anchor-tag'
import Figcaption from 'gatsby-theme-primer-wiki/src/components/figcaption'
import Kbd from './kbd'

const components = {
  a: AnchorTag,
  pre: props => props.children,
  code: Code,
  inlineCode: InlineCode,
  table: Table,
  img: Image,
  p: Paragraph,
  hr: HorizontalRule,
  blockquote: Blockquote,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ul: List,
  ol: List.withComponent('ol'),
  dl: DescriptionList,
  figcaption: Figcaption,
  kbd: Kbd,

  // Shortcodes (https://mdxjs.com/blog/shortcodes)
  Note,
  Do,
  Dont,
  DoDontContainer,
  Caption,
  ImageContainer,
}
export default components
