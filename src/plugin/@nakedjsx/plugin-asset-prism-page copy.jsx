import { Page } from '@nakedjsx/core/page';

import { Logo, Shell, Analytics, Inset, ReturnToDocLink } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const titleSuffix   = "Plugin - @nakedjsx/plugin-asset-prism";
const description   = "Provides a <PrismCode> tag that uses Prism to render code to HTML with syntax highlighting.";
const canonicalUrl  = 'https://nakedjsx.org/documentation/plugin/@nakedjsx/plugin-asset-prism';

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
            A <a href="https://prismjs.com">Prism</a> CSS theme that automatically handles light/dark mode is also provided.
        </p>
        <p>
            This plugin is bundled with the <Shell>npx nakedjsx</Shell> command, no installation is necessary.
        </p>
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
