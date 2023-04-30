import { JSX } from '@nakedjsx/core/jsx'
import { Page } from '@nakedjsx/core/page'

const repo = 'https://github.com/NakedJSX/examples';
const site = 'https://nakedjsx.github.io/examples';

const ExampleList =
    ({ children }) =>

    <dl css={`
        dt {
            margin-top: var(--gap);
            font-weight: bold;
        }

        dd {
            padding-left: var(--gap-2);
        }
    `}>
        {children}
    </dl>

const Example =
    ({ name, path, children }) =>
    <>
        <dt>{name}</dt>
        <dd>
            <a href={`${repo}/tree/main/${path}`}>Source</a> - <a href={`${site}/${path}`}>Output</a><br/>
            {children}
        </dd>
    </>

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NakedJSX Examples</title>
    </>
    );
Page.AppendBody(
    <main>
        <h1>NakedJSX Examples</h1>
        <p css="margin-top: 0">
            <a css="font-family: monospace" href={repo}>github.com/NakedJSX/examples</a>
        </p>
        <p>
            The following example projects are intended to introduce NakedJSX features in a logical order.
        </p>
        <p>
            Other than sharing some CSS via a shared asset file, each is self-contained and all are built independently.
        </p>
        <p>
            You can also look at the <a href={`${repo}/tree/main/src/index-html.mjs`}>source for this page</a>, which demonstrates the use of:
            <ul>
                <li>JSX props</li>
                <li>JSX scoped CSS</li>
                <li>Nested CSS</li>
                <li>Using the optional <code>.nakedjsx.json</code> config</li>
            </ul>
        </p>
        <ExampleList>
            <Example name="Hello NakedJSX" path="hello-nakedjsx">
                Illustrates the essential structure of a NakedJSX page.
            </Example>
            <Example name="Getting Started" path="getting-started">
                How to begin using <code>npx nakedjsx</code> to build NakedJSX pages.
            </Example>
            <Example name="Introduction to Assets" path="assets-introduction">
                Adding asset files to a build and linking to them.
            </Example>
            <Example name="Using a Config File" path="config-file">
                Use <code>npx nakedjsx ... --config-save</code> to save arguments into a config file.
            </Example>
            <Example name="Using a Common CSS File" path="css-common-file">
                Save a trip to the server by embedding common CSS in the page itself.
            </Example>
            <Example name="JSX" path="jsx-using">
                Props, children, imports, use JSX much as you would expect.
            </Example>
            <Example name="Scoped CSS" path="css-scoped">
                Generate CSS classes using the <code>css</code> JSX attribute.
            </Example>
            <Example name="Raw Content" path="assets-raw">
                Embedding raw content in the output, including assets, via the <code>&lt;raw-content&gt;</code> tag.
            </Example>
            <Example name="Client Javascript" path="client-js-introduction">
                Add client Javascript to a page. Client-side Javascript can use JSX components, too.
            </Example>
            <Example name="Build-time Defined Values" path="definition-injection">
                Make build-time defined values available to page sources.
            </Example>
            <Example name="Plugin: @nakedjsx/plugin-asset-image" path="plugin-nakedjsx-asset-image">
                Generate webp & jpeg sourcesets from image assets.
            </Example>
            <Example name="Custom Asset Import Plugins" path="plugin-custom-asset">
                Build your own asset import plugins.
            </Example>
        </ExampleList>
    </main>
    );
Page.Render();
