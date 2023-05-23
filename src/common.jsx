import { Page } from '@nakedjsx/core/page'
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

const tocList = Page.RefCreate();

export const Toc =
    () =>
    <>
        <h2>Topics</h2>
        <nav>
            <p  ref={tocList}
                css={`
                    a {
                        display: block
                    }
                `}
            />
        </nav>
    </>

export const TocItem =
    ({ name, path }) =>
    <a href={`#${path}`}>{name}</a>

export const TopicList =
    ({ children }) =>
    <>
        {children}
    </>

export const Topic =
    ({ name, path, children }) =>
    {
        tocList.appendJsx(<TocItem name={name} path={path} />);

        return  <>
                    <h2 id={path}>{name}</h2>
                    {children}
                </>
    }

export const Fixed =
    ({ nowrap, children}) =>
    {
        let whiteSpace = nowrap ? `white-space: nowrap !important;` : '';
        return  <strong css={`font-family: var(--code-font-family); font-size: 0.875rem; ${whiteSpace}`}>
                    {children}
                </strong>
    }

export const Inline =
    ({ lang, nowrap, children }) =>
    {
        // let whiteSpace = nowrap ? `white-space: nowrap !important;` : '';
        return <code className={`language-${lang ?? ''}`} ><PrismCode lang={lang} code={children.join('')} /></code>
    }

export const Code =
    ({ codeTagId, lang, title, wordwrap, uri, uriTarget, uriText, children }) =>
    <>
        {title &&
            <p css="margin-bottom: 0; padding-left: var(--gap-half)">
                <Fixed>{title}</Fixed>
                {uri && <> <a target={uriTarget} href={uri} css="font-size: 0.875rem">{uriText}</a></>}
            </p>}
        <pre className={`language-${lang ?? ''}`} css="margin-top: 0"><code id={codeTagId} css={wordwrap ? 'word-break: break-all; white-space: break-spaces' : ''}><PrismCode lang={lang} code={children.join('')} /></code></pre>
    </>

export const Analytics =
    () =>
    <>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CT8HVM4X2E" />
        <script>{
`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CT8HVM4X2E');`
        }</script>
    </>