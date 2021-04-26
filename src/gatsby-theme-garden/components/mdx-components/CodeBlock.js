import React from "react"
import Highlight, { defaultProps } from "prism-react-renderer"
import Prism from "prism-react-renderer/prism"
import theme from "prism-react-renderer/themes/oceanicNext"

;(typeof global !== "undefined" ? global : window).Prism = Prism

require("prismjs/components/prism-java")

export default ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : ''

  return (
    <Highlight
      {...defaultProps}
      code={children}
      theme={theme}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "1.25rem 1.5rem", borderRadius: "5px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}