import React from "react";
import { Link } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Code from "@/components/Code";

const getListId = (props) => {
  const name = props.children.toLowerCase();
  return name.replace(/\s/g, "-");
};

const BasicComponents = {
  pre: ({ children }) => {
    const child = children.props;
    if (child.mdxType === "code") {
      return (
        <Code
          codeString={child.children.trim()}
          language={child.className.replace("language-", "")}
          title={child.title}
          highlight={child.highlight}
        />
      );
    } else return null;
  },
  h1: (props) => (
    <h1
      style={{ marginBottom: "1.5rem" }}
      id={`${getListId(props)}`}
      {...props}
    >
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2
      style={{ marginBottom: "1.4rem" }}
      id={`${getListId(props)}`}
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3
      style={{ marginBottom: "1.3rem" }}
      id={`${getListId(props)}`}
      {...props}
    >
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4
      style={{ marginBottom: "1.25rem" }}
      id={`${getListId(props)}`}
      {...props}
    >
      {props.children}
    </h4>
  ),
  p: (props) => <p style={{ marginBottom: "1.5rem" }} {...props} />,
  ul: (props) => <ul style={{ marginLeft: " 1.5rem" }} {...props} />,
  ol: (props) => <ol style={{ marginLeft: "1.5rem" }} {...props} />,
  li: (props) => <li style={{ marginBottom: "calc(1.5rem / 2)" }} {...props} />,
};

const OtherComponents = {
  Link,
};

const RootWrapper = ({ element }) => {
  return (
    <MDXProvider components={{ ...OtherComponents, ...BasicComponents }}>
      {element}
    </MDXProvider>
  );
};

export default RootWrapper;
