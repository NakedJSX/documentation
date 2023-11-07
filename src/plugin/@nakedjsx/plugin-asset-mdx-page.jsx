import { Page } from '@nakedjsx/core/page';

import { Logo, Code, Shell, Analytics, Inset, ReturnToDocLink } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const titleSuffix   = "Plugin - @nakedjsx/plugin-asset-mdx";
const description   = "Import an MDX file as a JSX function.";
const canonicalUrl  = 'https://nakedjsx.org/documentation/plugin/@nakedjsx/plugin-asset-mdx';

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`NakedJSX - ${titleSuffix}`} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <title>{`NakedJSX - ${titleSuffix}`}</title>
        {!Page.IsDevelopmentMode() && <Analytics />}
    </>
    );
Page.AppendCss(prismTheme);
Page.AppendBody(
    <main>
        <h1><Logo /> {titleSuffix}</h1>
        <Inset><p>{description}</p></Inset>
        <p><ReturnToDocLink href="../" /></p>
        <p>
            This plugin is not bundled with the <Shell>npx nakedjsx</Shell> command and must be installed.
            It can be installed globally:
        </p>
        <Code lang="shell">npm install -g @nakedjsx/plugin-asset-mdx</Code>
        <p>
            Or locally, in any parent directory of your source files (you don't otherwise need to be using a Node project):
        </p>
        <Code lang="shell">npm install @nakedjsx/plugin-asset-mdx</Code>
        <p>
            Usage example:
        </p>
        <Example buildFlags={['--plugin', 'mdx', '@nakedjsx/plugin-asset-mdx', '--pretty']} captureOutput={['example', 'plugin-asset-mdx']}>
            <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page';

import HelloMdx from ':mdx:hello.mdx';

Page.Create('en');
Page.AppendBody(
    <>
        <HelloMdx />
    </>
    );
Page.Render();`
            }</Example.Src>
            <Example.Src lang="MDX" filename="src/hello.mdx">{
`# Hello, MDX!

This markdown will become a *paragraph* tag.

> And this, a blockquote.

1. Lists
2. are also supported

<p css="color: fuchsia">And HTML with scoped CSS.</p>`
            }</Example.Src>
            <Example.BuildCmd/>
            <p>
                The result:
            </p>
        </Example>
        <p><ReturnToDocLink href="../" /></p>
    </main>
    );
Page.Render();
