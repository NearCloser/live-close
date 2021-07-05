import React, { useState } from "react";
import Highlight, { Prism } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  LinesToHighlight,
  LinesNumberToHighlight,
} from "react-mdx-prism-lighter";
import * as styles from "@/styles/code.module.scss";

const HighlightClassName = " highlight-line"; //ハイライトの行に適用されるクラス名

const CodeBlock = ({ codeString, language, title, highlight }) => {
  const [value, setValues] = useState<[string, boolean]>(["Copy", false]);

  const CopyText = () => {
    //コピー機能
    setValues(["Copied", true]);
    setTimeout(() => {
      setValues(["Copy", false]);
    }, 5000);
  };

  return (
    <Highlight
      //@ts-ignore
      theme={nightOwl}
      Prism={Prism}
      code={codeString}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => {
        return (
          <div className={styles.code_main_wrapper}>
            {title && (
              <div className={styles.code_title}>
                <h3 className={styles.code_title_text}>{title}</h3>
              </div>
            )}
            <div className={styles.pre_main_wrapper} style={style}>
              <CopyToClipboard
                text={codeString.replace(
                  /\/\/(highlight\s|(highlight-start)|(highlight-end))/g,
                  ""
                )}
                onCopy={CopyText}
              >
                <button className={styles.code_copy_btn} disabled={value[1]}>
                  <span className={styles.copy_text}>{value[0]}</span>
                </button>
              </CopyToClipboard>
              <pre className={styles.pre_code}>
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index });

                  if (LinesToHighlight(line)) {
                    lineProps.className += HighlightClassName;
                  }
                  if (LinesNumberToHighlight(highlight, index)) {
                    lineProps.className += HighlightClassName;
                  }

                  return (
                    <div {...lineProps}>
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({
                          token,
                          key: key,
                        });
                        return <span {...tokenProps} />;
                      })}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
