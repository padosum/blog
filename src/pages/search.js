import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ToggleMode from "../components/Layout/ToggleMode"

class Search extends React.Component {
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

    const cx = 'ec8c77d15f537286d';
    let gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
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

  render() {
    return (
      <Layout showTitle={true} isPostTemplate postList={this.props.data.allPost.edges}>
        <SEO title="Search Result" description="Search Result" />
        <div
          className="switch-container"
          style={{ textAlign: "end", margin: "0 1.1rem" }}
        >
          <ToggleMode />
        </div>
        <div className="gcse-searchresults-only" data-queryparametername="searchString"></div>
      </Layout>
    )
  }
}

export const postQuery = graphql`
  query BlogPosts {
    allPost: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`
export default Search