import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import mediumZoom from "medium-zoom"
import storage from "local-storage-fallback"
import { isMobile } from "react-device-detect"
import { setThemeVars } from "../util/theme-helper"
import { comments } from "../../customize"
import configStyles from "../../customize-styles"
import Layout from "../components/Layout"
import Hr from "../components/Hr"
import Profile from "../components/Profile"
import SEO from "../components/SEO"
import {
  FacebookComments,
  DisqusComments,
  UtterancesComments,
} from "../components/Comments"
import ToggleMode from "../components/Layout/ToggleMode"
import { theme } from "../components/Shared/styles-global"
import LinkEdgePosts from "../components/LinkEdgePosts"
import ShareButtons from "../components/ShareButtons"

class CategoryTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.utterancesRef = React.createRef()
    this.state = {
      location: "",
      script: undefined,
      texts: [],
    }
  }

  componentDidMount() {
    this.setState({ location: window.location.href })
    if (isMobile) {
      this.moveAnchorHeadings()
    }
    this.zoomImages()
    if (comments.facebook.enabled) {
      this.registerFacebookComments()
    }
    if (comments.utterances.enabled && comments.utterances.repoUrl) {
      this.registerUtterancesComments(comments.utterances.repoUrl)
    }

    (function() {
      var cx = 'ec8c77d15f537286d';
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s);
    })();    
  }

  componentDidUpdate() {
    if (window.FB) {
      window.FB.XFBML.parse()
    }
  }

  registerUtterancesComments = repo => {
    // Register utterances if it exists
    if (this.utterancesRef.current) {
      const script = document.createElement("script")
      script.src = "https://utteranc.es/client.js"
      script.async = true
      script.crossOrigin = "anonymous"
      script.setAttribute("repo", repo)
      script.setAttribute("issue-term", "pathname")
      script.setAttribute("label", "blog-comment")
      script.setAttribute(
        "theme",
        `${theme.curTheme === "dark" ? "github-dark" : "github-light"}`
      )
      this.utterancesRef.current.appendChild(script)
    }
  }

  registerFacebookComments = () => {
    // Unregister if already exists
    this.unregisterFacebookComments()
    // Register facebook comments sdk
    const script = document.createElement("script")
    script.src = "https://connect.facebook.net/en_US/sdk.js"
    script.async = true
    script.defer = true
    script.crossOrigin = "anonymous"
    // Set as state to unmount script
    this.setState({ script: script })
    document.body.appendChild(script)
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: comments.facebook.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v6.0",
      })
    }
  }

  unregisterFacebookComments = () => {
    // Unmount script and comments div
    if (this.state.script) {
      document.body.removeChild(this.state.script)
      const fbRoot = document.getElementById("fb-root")

      if (fbRoot) {
        document.body.removeChild(fbRoot)
      }

      this.setState({ script: undefined })
    }
  }

  componentWillUnmount() {
    this.unregisterFacebookComments()
  }

  zoomImages = () => {
    const targetImg = "img"
    const targetGatsbyImg = "gatsby-resp-image-image"
    const images = Array.from(document.querySelectorAll(targetImg))
    const filteredImages = []
    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      // Filter profile image
      const profile = document.querySelector(".img-profile")
      if (profile) {
        const isProfile = profile.contains(img)
        if (!isProfile) {
          // Set maximum width/height to non-gatsby images
          if (!img.classList.contains(targetGatsbyImg)) {
            img.classList.add("img-not-gatsby-remark")
          }
          filteredImages.push(img)
        }
      }
    }

    let mediumZoomBgColor = ""
    const savedTheme = JSON.parse(storage.getItem("theme")) || "light"
    mediumZoomBgColor =
      savedTheme.mode === "light" ? theme.bgColorLight : theme.bgColorDark

    // Apply medium zoom to images
    mediumZoom(filteredImages, {
      margin: 24,
      background: mediumZoomBgColor,
    })
  }

  // Move anchor headings to the right side on mobile
  moveAnchorHeadings = () => {
    const target = ".anchor-heading"
    const anchors = Array.from(document.querySelectorAll(target))
    anchors.forEach(anchor => {
      anchor.parentNode.appendChild(anchor)
      anchor.classList.add("after")
      anchor.classList.remove("before")
    })
  }

  // Toggle loading for changing copy texts
  toggleLoading = text => {
    this.setState(prevState => {
      const updatedTexts = [...prevState.texts]
      updatedTexts.forEach(t => {
        if (t.id === text.id) {
          t.loadingChange = !t.loadingChange
        }
      })
      return {
        texts: updatedTexts,
      }
    })
  }

  getFormatDate = date => {
    return date.split(' ')[0].replace(/-/g, '.')
  }

  render() {
    const posts = this.props.data.allMdx.edges 
    const post = this.props.pathContext.frontmatter
    return (
      <Layout showTitle={true} isPostTemplate>
<div
  className="switch-container"
  style={{ textAlign: "end", margin: "0 1.1rem" }}
>
  <ToggleMode />
</div>
<StyledHTML className="post-html">
    <>
    </>

    <div className="gcse-searchresults-only" data-queryParameterName="searchString"></div>
      {/* Render mdx */}
    {/* <MDXProvider components={mdxComponents}>
      <MDXRenderer>{posts.body}</MDXRenderer>
    </MDXProvider> */}
 
</StyledHTML>

  <>
  </>
      </Layout>
    )
  }
}

export const postQuery = graphql`
{
  allMdx(
    sort: { fields: [frontmatter___date], order: DESC }
    ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          tags
          date
          excerpt
          draft
          layout
          parent
        }
      }
    }
  }
}
`

export default CategoryTemplate

const StyledHTML = styled.div`
  word-wrap: break-word;
  padding: 1rem;
  font-family: ${configStyles.fontMain + configStyles.fontsBackUp};
  margin-top: 1rem;
  font-size: 105%;
  h1 {
    margin-top: 2.5rem;
  }

  .post-title {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 2rem;
  }

  h3 {
    margin-top: 1.3rem;
  }

  h4 {
    margin-top: 1rem;
  }

  h5 {
    margin-top: 0.8rem;
  }

  h6 {
    margin-top: 0.6rem;
  }

  p {
    margin-top: 0.9rem;
    line-height: 1.4;
  }

  blockquote {
    padding: 0.3rem 1rem;
    margin: 0.5rem 0;

    > p {
      margin-top: 0.5rem;
    }

    > blockquote {
      border-left: none;
      font-size: 1.2rem;
      > blockquote {
        font-size: 1.3rem;
      }
    }
  }

  a {
    color: steelblue;
  }

  ul {
    list-style: none;
    margin: 1rem 0.3rem;
    li {
      display: flex;
      justify-content: flex-start;
      margin: 0.5rem 0;
      /* Custom list for ul */
      .icon-wrap {
        svg.icon-chevron-right {
          display: inline-block;
          width: 0.75rem;
          height: 0.75rem;
          margin-right: 0.5rem;
          fill: ${() =>
            setThemeVars(
              configStyles.fontColorLight,
              configStyles.fontColorDark
            )};
        }
      }
      span.ul-children {
        width: 100%;
        & > p:first-child {
          display: inline;
        }
      }
    }
  }

  ol {
    margin: 0.5rem 1.2rem;
    li {
      margin: 1rem 0;
      margin-left: 0.3rem;
      span {
        margin-left: 0.15rem;
      }
    }
  }

  pre {
    font-family: inherit;
  }

  img {
    margin: 0.35rem 0;
  }

  .gatsby-resp-image-wrapper {
    margin: 0.5rem 0;
  }

  @media (max-width: 500px) {
    padding: 0.5rem 1rem;

    .post-title {
      font-size: 2rem;
    }

    ul,
    ol {
      margin-right: 1rem;
    }
  }
`
