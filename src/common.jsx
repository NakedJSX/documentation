import { Page } from '@nakedjsx/core/page'
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

const tocList = Page.RefCreate();

export const Toc =
    () =>
    <>
        <h2 id="toc">Topics</h2>
        <nav>
            <p ref={tocList} />
        </nav>
    </>

export const TocItem =
    ({ linkId, depth, name, path }) =>
    <>
        {depth == 1
            ? <a id={linkId} href={`#${path}`}>{name}</a>
            : <a css={`font-size: 1rem; margin-left: ${(depth - 1) * 16}px`} id={linkId} href={`#${path}`}>{name}</a>}
        <br />
    </>
    

export const TopicList =
    ({ children }) =>
    <>
        {children}
    </>

const Heading =
    ({ depth, children, ...props }) =>
    {
        if (depth == 1)
            return <h1 {...props}>{children}</h1>
        if (depth == 2)
            return <h2 {...props}>{children}</h2>
        if (depth == 3)
            return <h3 {...props}>{children}</h3>
        if (depth == 4)
            return <h4 {...props}>{children}</h4>
        if (depth == 5)
            return <h5 {...props}>{children}</h5>
        else
            return <h6 {...props}>{children}</h6>
    }

export const Topic =
    ({ name, path, hideReturn, children, context }) =>
    {
        // Use context.depth to control nested topic behaviour
        context.depth   = context.depth ? context.depth + 1 : 1;
        context.path    = context.path ? `${context.path}-${path}` : path;

        const id        = Page.UniqueId();
        const copyId    = `${id}.copyId`;
        const targetId  = `${id}.targetId`;

        tocList.appendJsx(<TocItem linkId={targetId} depth={context.depth} name={name} path={context.path} />);

        Page.AppendJs(hookupCopyToClipboard);
        Page.AppendJsCall(hookupCopyToClipboard.name, id, 'href');

        return  <>
                    <Heading    id={context.path}
                                depth={context.depth + 1}
                                css={
                                   `display: flex;
                                    flex-wrap: wrap;
                                    align-items: baseline;
                                    justify-content: space-between;
                                    
                                    button {
                                        font-size: 0.875rem;
                                    }`
                    }>
                        {name} <button id={copyId} className="link">(copy link)</button>
                    </Heading>
                    {children}
                    {!hideReturn && <p><a href="#toc">↑ Return to list of topics</a></p>}
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
        let targetId;

        if (copyCodeLink)
        {
            const id = Page.UniqueId();

            copyId      = `${id}.copyId`;
            targetId    = `${id}.targetId`;

            Page.AppendJs(hookupCopyToClipboard);
            Page.AppendJsCall(hookupCopyToClipboard.name, id, 'innerText');
        }
        
        return  <>
                    {title &&
                        <p css={
                           `margin-bottom: var(--gap-three-eighths);
                            padding-left: var(--gap-half);
                            font-size: 0.875rem;

                            display: flex;
                            justify-content: space-between;
                            align-items: center;`
                        }>
                            <span css="flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap"><Fixed>{title}</Fixed></span>
                            {uri            && <> <a target={uriTarget} href={uri}>{uriText}</a></>}
                            {copyCodeLink   && <> <button id={copyId } className="link">(copy code)</button></>}
                        </p>}
                    <pre className={`language-${lang ?? ''}`} css="margin-top: 0"><code id={targetId} css={wordwrap ? 'word-break: break-all; white-space: break-spaces' : ''}><PrismCode lang={lang} code={children.join('')} /></code></pre>
                </>
    }

/**
 * Client Javascript for copying example source code / link to the clipboard.
 */
function hookupCopyToClipboard(id, attribute)
{
    const copyId     = `${id}.copyId`;
    const targetId   = `${id}.targetId`;
    const feedbackId = `${id}.feedback`;

    document.getElementById(copyId).onclick =
        (event) =>
        {
            event.preventDefault();

            const target    = event.target;
            const parent    = target.parentNode;
            const content   = document.getElementById(targetId)[attribute];

            function feedback(content)
            {
                // remove old feedback
                const oldFeedback = document.getElementById(feedbackId);
                if (oldFeedback)
                    oldFeedback.remove();

                const e =
                    <div id={feedbackId} css="position: relative">
                        <span css={
                           `position: absolute;
                            bottom: 1rem;
                            left: 50%;
                            transform: translateX(-50%);
                            opacity: 0;
                            animation: fadeOut ease 1500ms;`
                        }>{content}</span>
                    </div>;

                target.appendChild(e);

                setTimeout(() => e.remove(), 1500);
            }
            
            navigator.clipboard.writeText(content).then(() => feedback('✅'), () => feedback('❌'));
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