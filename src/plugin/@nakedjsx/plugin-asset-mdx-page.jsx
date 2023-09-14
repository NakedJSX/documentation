import { Page } from '@nakedjsx/core/page';

import { Logo, Code, Shell, Analytics, Inset, ReturnToDocLink } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const titleSuffix   = "Plugin - @nakedjsx/plugin-asset-mdx";
const description   = "Import an MDX file as a JSX function";
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
            This plugin is not bundled with the <Shell>npx nakedjsx</Shell> command, either install it globally for all projects:
        </p>
        <Code lang="shell">npm install -g @nakedjsx/plugin-asset-mdx</Code>
        <p>
            or locally, in a parent directory of your source files (you don't otherwise need to be using a Node project):
        </p>
        ```
        
        ```

        

        ```
        npm install @nakedjsx/plugin-asset-mdx
        ```

        <p>
            Here is a usage example that syntax highlights a Node.js hello world program:
        </p>
        <Example buildFlags={['--plugin', 'prism', '@nakedjsx/plugin-asset-prism', '--pretty']} captureOutput={['example', 'plugin-asset-prism']}>
            <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page';
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

import prismTheme from '::@nakedjsx/plugin-asset-prism/theme.css';

// JavaScript source for a Node.js hello world http server
const helloNodeJs =
\`const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(\\\`Server running at http://\\\${hostname}:\\\${port}/\\\`);
});\`;

Page.Create('en');
Page.AppendHead(
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={prismTheme} />
    </>
    );
Page.AppendBody(
    <>
        <h1>@nakedjsx/plugin-asset-prism</h1>
        <p>Try changing between light and dark mode in your OS settings.</p>
        <pre className="language-javascript"><code><PrismCode lang="javascript" code={helloNodeJs} /></code></pre>
    </>
    );
Page.Render();`
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
