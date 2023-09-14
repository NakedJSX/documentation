import { Page } from '@nakedjsx/core/page'
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

import { fixIndent } from './util.mjs';

import logoHref from '::../asset/logo.svg';

const tocList = Page.RefCreate();

export const Toc =
    ({ returnToDocHref }) =>
    <>
        <h2 id="toc">Topics</h2>
        <Inset>
            <nav ref={tocList} css="line-height: 1.75" />
        </Inset>
        {returnToDocHref && <ReturnToDocLink href={returnToDocHref} />}
    </>

export const TocItem =
    ({ linkId, depth, name, url }) =>
    <>
        {depth == 1
            ? <a id={linkId} href={url}>{name}</a>
            : <a css={`margin-left: ${(depth - 1) * 16}px`} id={linkId} href={url}>{name}</a>}
        <br />
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
    ({ name, path, children, context, indexUrl, underLink, underLinkLabel, noBackToTop, noCopyLink }) =>
    {
        // Use context.depth to control nested topic behaviour
        context.depth   = context.depth ? context.depth + 1 : 1;
        context.path    = context.path ? `${context.path}-${path}` : path;

        const id        = Page.UniqueId();
        const copyId    = `${id}.copyId`;
        const targetId  = `${id}.targetId`;

        if (indexUrl)
            tocList.appendJsx(<TocItem linkId={targetId} depth={context.depth} name={name} url={indexUrl} />);
        else
            tocList.appendJsx(<TocItem linkId={targetId} depth={context.depth} name={name} url={`#${context.path}`} />);

        if (!noCopyLink)
        {
            Page.AppendJsIfNew(hookupCopyToClipboard);
            Page.AppendJsCall(hookupCopyToClipboard, id, 'href');
        }

        //
        // At each level, determine if there are subtopics.
        // We'll omit the back to top link if we have subtopics,
        // as this avoids multiples.
        //

        if (context.has)
            context.has.subtopics = true;

        context.has = { subtopics: false };

        children = Page.EvaluateNow(children);

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
                        {name} {!noCopyLink && <button id={copyId} className="link">(copy link)</button>}
                    </Heading>
                    {underLink &&
                        <p css="margin-top: calc(0px - var(--gap))">
                            <a href={underLink}>{underLinkLabel ?? underLink}</a>
                        </p>}
                    {children}
                    {!context.has.subtopics && !noBackToTop && <p><SymbolLink href="#toc" symbol="↑">Return to list of topics</SymbolLink></p>}
                </>
    }

export const Fixed =
    ({ nowrap, children}) =>
    {
        let whiteSpace = nowrap ? `white-space: nowrap !important;` : '';
        return  <span css={`font-family: var(--code-font-family); font-size: 0.875rem; ${whiteSpace}`}>
                    {children}
                </span>
    }

export const Tag =
    ({ children }) =>
    <Inline lang="html">{`<${children}>`}</Inline>

export const Inline =
    ({ lang, nowrap, children }) =>
    {
        // let whiteSpace = nowrap ? `white-space: nowrap !important;` : '';
        return <code className={`language-${lang ?? ''}`} ><PrismCode lang={lang} code={children.join('')} /></code>
    }

export const Shell =
    ({ children }) =>
    <Inline>{children}</Inline>

export const Code =
    ({ lang, title, wordwrap, uri, uriTarget, uriText, copyLink, children }) =>
    {
        // If these don't get defined, the resulting nodes won't have an id
        let copyId;
        let targetId;

        if (copyLink)
        {
            const id = Page.UniqueId();

            copyId      = `${id}.copyId`;
            targetId    = `${id}.targetId`;

            Page.AppendJsIfNew(hookupCopyToClipboard);
            Page.AppendJsCall(hookupCopyToClipboard.name, id, 'innerText');
        }

        const code = fixIndent(children.join(''));
        
        return  <>
                    {(title || uri || copyLink) &&
                        <p css={
                           `margin-bottom: var(--gap-qtr);
                            padding-left: var(--gap-half);
                            font-size: 0.875rem;

                            display: flex;
                            justify-content: space-between;
                            align-items: center;`
                        }>
                            <span css="flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{title && <Fixed>{title}</Fixed>}</span>
                            {uri        && <> <a css="white-space: nowrap" target={uriTarget} href={uri} rel="nofollow">{uriText}</a></>}
                            {copyLink   && <> <button id={copyId } className="link">{copyLink}</button></>}
                        </p>}
                    <pre className={`language-${lang ?? ''}`} css="margin-top: 0"><code id={targetId} css={wordwrap ? 'word-break: break-all; white-space: break-spaces' : ''}><PrismCode lang={lang} code={code} /></code></pre>
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

export const Inset =
    ({ children }) =>
    <div css={`
        display: flow-root;
        background-color: var(--code-bg-color);

        & > * {
            margin: var(--gap-three-eighths-2) var(--gap);
        }
    `}>
        {children}
    </div>

export const Analytics =
    () =>
    <>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CT8HVM4X2E" />
        <script><raw-content content={fixIndent`
            if (location.host == 'nakedjsx.org') {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CT8HVM4X2E');
            }
        `}/></script>
    </>

export const Logo =
    () =>
    {
        return  <object
                    css="width: 61px; height: 45px;"
                    type="image/svg+xml"
                    data={logoHref}
                    aria-label="NakedJSX"
                >
                    NakedJSX
                </object>
    }

export const SymbolLink =
    ({ symbol, children, ...linkProps }) =>
    {
        return <a {...linkProps}><span css="text-align: center; display: inline-block; min-width: 1.5em; margin-right: var(--gap-eighth)">{symbol}</span>{children}</a>
    }

function historyBackIfSameOrigin(event)
{
    if (new URL(document.referrer).origin === window.location.origin)
    {
        history.back();
        event.preventDefault();
    }
}

export const ReturnToDocLink =
    props =>
    {
        Page.AppendJsIfNew(historyBackIfSameOrigin);

        return <SymbolLink onClick="historyBackIfSameOrigin(event)" symbol="←" {...props}>Return to NakedJSX documentation</SymbolLink>;
    }
    