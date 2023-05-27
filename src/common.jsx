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
    ({ lang, title, wordwrap, uri, uriTarget, uriText, copyCodeLink, children }) =>
    {
        // If these don't get defined, the resulting nodes won't have an id
        let copyId;
        let codeId;

        if (copyCodeLink)
        {
            const id = Page.UniqueId();

            copyId = `${id}.Code.copyId`;
            codeId = `${id}.Code.codeId`;

            Page.AppendJs(hookupCopyToClipboard);
            Page.AppendJsCall(hookupCopyToClipboard.name, id);
        }
        
        return  <>
                    {title &&
                        <p css={
                           `margin-bottom: var(--gap-three-eighths);
                            padding-left: var(--gap-half);
                            font-size: 0.875rem;`
                        }>
                            <Fixed>{title}</Fixed>
                            {uri            && <> <a target={uriTarget} href={uri}>{uriText}</a></>}
                            {copyCodeLink   && <> <button id={copyId } className="link">(copy code to clipboard)</button></>}
                        </p>}
                    <pre className={`language-${lang ?? ''}`} css="margin-top: 0"><code id={codeId} css={wordwrap ? 'word-break: break-all; white-space: break-spaces' : ''}><PrismCode lang={lang} code={children.join('')} /></code></pre>
                </>
    }

/**
 * Client Javascript for copying example source code to the clipboard.
 */
function hookupCopyToClipboard(id)
{
    const copyId     = `${id}.Code.copyId`;
    const codeId     = `${id}.Code.codeId`;
    const feedbackId = `${id}.Code.feedback`;

    document.getElementById(copyId).onclick =
        (event) =>
        {
            event.preventDefault();/*ha*/

            const target = event.target;
            const parent = target.parentNode;
            const code   = document.getElementById(codeId).innerText;

            function feedback(content)
            {
                // remove old feedback
                const oldFeedback = document.getElementById(feedbackId);
                if (oldFeedback)
                    oldFeedback.remove();

                const e = <span id={feedbackId} css="opacity: 0; animation: fadeOut ease 1500ms;">{content}</span>;
                parent.insertBefore(e, event.target.nextSibling);

                setTimeout(() => e.remove(), 1500);
            }
            
            navigator.clipboard.writeText(code).then(() => feedback(' ✅'), () => feedback(' ❌'));
        };
};

export const Analytics =
    () =>
    <>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CT8HVM4X2E" />
        <script><raw-content content={
`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CT8HVM4X2E');`
        }/></script>
    </>