import { Page } from '@nakedjsx/core/page'
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

const tocList = Page.CreateRef();

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
        tocList.appendChild(<TocItem name={name} path={path} />);

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
    ({ lang, title, uri, uriText, children }) =>
    <>
        {title &&
            <p css="margin-bottom: 0; padding-left: var(--gap-half)">
                <Fixed>{title}</Fixed>
                {uri && <> <a target="_blank" href={uri} css="font-size: 0.875rem">{uriText}</a></>}
            </p>}
        <pre css="margin: 0" className={`language-${lang ?? ''}`}><code><PrismCode lang={lang} code={children.join('')} /></code></pre>
    </>
