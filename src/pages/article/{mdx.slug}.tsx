import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as style from "@/styles/article.module.scss";

export const query = graphql`
  query ($slug: String!) {
    mdx(slug: { eq: $slug }) {
      slug
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY年 M月 D日")
        excerpt
      }
      body
      timeToRead
    }
  }
`;

const Article = ({ data: { mdx } }) => {
  return (
    <main className={style.article_main_wrapper}>
      <div className={style.article_details}>
        posted on {mdx.frontmatter.date} - {mdx.timeToRead} minutes read
      </div>
      <h1 className={style.article_title}>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </main>
  );
};

export default Article;
