import React, { useState } from "react";
import { graphql } from "gatsby";
import * as style from "@/styles/index.module.scss";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import ReactLoading from "react-loading";

import { Helmet } from "react-helmet";

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          slug
          timeToRead
          frontmatter {
            title
            date(formatString: "YYYY年 M月 D日")
            excerpt
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const validationSchema = yup.object({
    name: yup.string().required("お名前を入力してください"),
    email: yup.string().email().required("メールアドレスを入力してください"),
    contents: yup.string().required(""),
  });

  const [isLoading, setLoading] = useState(false);
  const [thanks, setThanks] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contents: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);

      try {
        await axios({
          method: "POST",
          url: `${process.env.GATSBY_FORM_API}`,
          data: values,
        });

        setSubmitting(false);
        setLoading(false);
        setThanks(true);
        resetForm();
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div
      style={{ display: "flex", minHeight: "100vh" }}
      className={style._main_wrapper}
    >
      <Helmet title={`Near Closer | LIVE配信を通して知識・技術をシェアしよう`}>
        <meta
          name="description"
          content={`Near Closerとは、今までに自分が学んだことや得た知識をLIVE配信を通してシェアしていく、新しいアウトプットコミュニティです。`}
        />
        <meta property="og:url" content={`https://near-closer.jp`} />
        <meta
          property="og:title"
          content={`Near Closer | LIVE配信を通して知識・技術をシェアしよう`}
        />
        <meta
          property="og:description"
          content={`Near Closerとは、今までに自分が学んだことや得た知識をLIVE配信を通してシェアしていく、新しいアウトプットコミュニティです。`}
        />
        <meta
          property="og:image"
          content={`https://live-closer.s3.ap-northeast-1.amazonaws.com/closer.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={`@near_closer`} />
        <meta
          name="twitter:title"
          content={`Near Closer | LIVE配信を通して知識・技術をシェアしよう`}
        />
        <meta
          name="twitter:image"
          content={`https://live-closer.s3.ap-northeast-1.amazonaws.com/closer.png`}
        />
      </Helmet>
      <header className={style.header_wrapper}>
        <h1 className={style.header_text}>
          <span className={style.hehader_aside_text}>なーこぉと学ぶ</span>
          コーディング
          <br />
          ライブストリーム
        </h1>
        <p className={style.main_title}>Near Closer </p>
        <p className={style.desc_text}>
          <span className={style.strong}>Near Closer{` `}</span>
          とは、今までに自分が学んだことや得た知識を
          LIVE配信を通してシェアしていく新しいアウトプットコミュニティです。
        </p>
      </header>

      <main className={style.main_wrapper}>
        <section className={style.offer_main_wrapper}>
          <div className={style.offer_wrapper}>
            <h3 className={style.offer_main_text}>仲間を募集しています！</h3>　
            <div className={style.flow}>
              <div className={style.flow_block}>
                <p>自分のペースでコーディングできます</p>
              </div>

              <div className={style.flow_block}>
                <p>LIVE中のコーディングミス、勘違い、エラー起こし放題</p>
              </div>

              <div className={style.flow_block}>
                <p>最大制限時間は100分、次回持ち越しも可能</p>
              </div>
            </div>
          </div>
        </section>

        <section className={style.flow_main_wrapper}>
          <div className={style.flow_wrapper}>
            <h3 className={style.flow_main_text}>ライブストリームの流れ</h3>
            <div className={style.flow}>
              <div className={style.flow_block}>
                <h4>
                  Contact <span></span>
                </h4>
                <p>コンタクトフォームから応募</p>
              </div>

              <div className={style.flow_block}>
                <h4>Set Shchedule</h4>
                <p>アウトプットしたい内容を決める</p>
              </div>

              <div className={style.flow_block}>
                <h4>Go Live</h4>
                <p>
                  配信 <br />
                  (アーカイブします)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={style.contact}>
          <h3 className={style.contact_main_text}>Contact</h3>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name" className={style.input_label}>
              お名前
            </label>
            <input
              className={style.input_style}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label htmlFor="email">メールアドレス</label>
            <input
              className={style.input_style}
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="contents">内容</label>
            <textarea
              className={style.input_textarea_style}
              id="contents"
              name="contents"
              placeholder="LIVE配信したい内容、SNSアカウント、ブログURLなど..."
              onChange={formik.handleChange}
              value={formik.values.contents}
            />

            <div className={style.submit_btn_wrapper}>
              {thanks && (
                <p style={{ paddingRight: "2rem" }}>Thanks !! &#x2728;</p>
              )}
              {isLoading ? (
                <ReactLoading
                  type={"bars"}
                  height={50}
                  width={50}
                  color={`rgb(62, 80, 117)`}
                />
              ) : (
                <button
                  type="submit"
                  className={style.submit_btn}
                  style={{
                    pointerEvents:
                      formik.isValid && formik.dirty ? "auto" : "none",
                    opacity: formik.isValid && formik.dirty ? "1" : ".65",
                  }}
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  送信する
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
      {/* <div className={style.index_main_wrapper}>
        {data.allMdx.edges.map(({ node }) => {
          return (
            <article key={node.slug} className={style.article_wrapper}>
              <Link to={`article/${node.slug}`}>
                <h3 className={style.article_title}>
                  {node.frontmatter.title}
                </h3>
                <span>
                  {node.frontmatter.date} - {node.timeToRead} min
                </span>
                <p className={style.article_excerpt}>
                  {node.frontmatter.excerpt}
                </p>
              </Link>
            </article>
          );
        })}
      </div> */}
    </div>
  );
};

export default IndexPage;
