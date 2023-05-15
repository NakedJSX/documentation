import { Page } from '@nakedjsx/core/page'
import { getContext } from '@nakedjsx/core/jsx';

const repo = 'https://github.com/NakedJSX/documentation';
const site = 'https://nakedjsx.github.io/documentation';

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
    <dl css={`
            dt {
                margin-top: var(--gap-2);
                font-weight: bold;
            }
        `}
    >
        {children}
    </dl>

export const Topic =
    ({ name, path, hideExample, children }) =>
    {
        tocList.appendChild(<TocItem name={name} path={path} />);

        return  <>
                    <dt id={path}>{name}</dt>
                    <dd>
                        {/* {!hideExample && <a href={`${repo}/${path}`}>example project</a>} */}
                        {children}
                    </dd>
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
        let whiteSpace = nowrap ? `white-space: nowrap !important;` : '';
        return <code className={`language-${lang ?? ''}`} css={whiteSpace}>{children}</code>
    }

export const Code =
    ({ lang, title, uri, uriText, children }) =>
    <>
        {title &&
            <p css="margin-bottom: 0; padding-left: var(--gap-half)">
                <Fixed>{title}</Fixed>
                {uri && <> <a target="_blank" href={uri} css="font-size: 0.875rem">{uriText}</a></>}
            </p>}
        <pre css="margin: 0"><Inline lang={lang}>{children}</Inline></pre>
    </>
