import { Fixed, Topic, Code, Inline, Tag } from "$SRC/common.jsx";
import { Example } from "$SRC/example.jsx";

import circleSvgSrc from ':raw:$ASSET/circle.svg';

export default
    () =>
    <Topic name="Assets" path="assets">
        <p>
            Assets files such as images, JSON, CSS can be added to a build via a JavaScript import statment.
        </p>
        <p>
            Optionally, the asset file can be processed during import by a NakedJSX plugin and <a href="plugin-development/">it's simple to make your own plugins</a>.
        </p>
        <Topic name="Arbitrary Files" path="generic">
            <p>
                NakedJSX allows you to publish and link to arbitrary files via the asset system.
            </p>
            <p>
                To import a file as a generic asset, use a regular JavaScript import statement but
                prefix the import path with <Inline>::</Inline>, like this:
            </p>
            <Code lang="javascript">{
                `import circleHref from '::./circle.svg'`
            }</Code>
            <p>
                This will cause NakedJSX to place a copy of <Inline>./circle.svg</Inline> in
                the <Fixed>asset</Fixed> directory in the build output folder,
                and <Inline>circleHref</Inline> will be a relative URL to it.
            </p>
            <p>
                For example:
            </p>
            <Example captureOutput={['example', 'assets', 'generic']}>
                <Example.Src lang="svg" filename="src/circle.svg">{circleSvgSrc}</Example.Src>
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import circleHref from '::./circle.svg'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Title</h1>
        <p><img src={circleHref} /></p>
    </>
);
Page.Render();`
                }</Example.Src>
                <p>produces the following:</p>
            </Example>
        </Topic>

        <Topic name="JSON Data" path="json">
            <p>
                If you have JSON data in a file, you can import it using a <Inline>:json:</Inline> asset
                import like this:
            </p>
            <Example captureOutput={['example', 'assets', 'json']}>
                <Example.Src lang="json" filename="src/data.json">{
`{
    "Australia":
        {
            "population": 26357171,
            "updated": "Monday, May 29, 2023"
        }
}`
                }</Example.Src>
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import data from ':json:./data.json'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Population of Australia</h1>
        <p>
            {data.Australia.population} as of {data.Australia.updated}.
        </p>
    </>
);
Page.Render();`
                }</Example.Src>
            <p>the result:</p>
            </Example>
        </Topic>
        
        <Topic name="Raw Asset String" path="raw-string">
            <p>
                Sometimes it is desireable to embed the content of an asset itself in your page JS,
                as this can save a round trip to the server. NakedJSX includes a <Inline>:raw:</Inline> import
                plugin that returns a string containing the contents of a specified asset file.
            </p>
            <p>
                That content can then be placed directly into the document without further processing,
                using the built-in <Tag>raw-content</Tag> tag.
            </p>
            <Example captureOutput={['example', 'assets', 'raw-string']}>
                <Example.Src lang="xml" filename="src/circle.svg">{circleSvgSrc}</Example.Src>
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import circleRaw from ':raw:./circle.svg'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Title</h1>
        <raw-content content={circleRaw} />
    </>
);
Page.Render();`
                }</Example.Src>
                <p>with the result:</p>
            </Example>
        </Topic>

        <Topic name="Raw Asset Buffer" path="raw-buffer">
            <p>
                The <Inline>:raw:</Inline> plugin also supports importing an asset
                as a Buffer object rather than as a utf-8 string. To do this,
                add a query string of <Inline>?as=Buffer</Inline>:
            </p>
            <Example captureOutput={['example', 'assets', 'raw-buffer']}>
                <Example.Src lang="xml" filename="src/circle.svg">{circleSvgSrc}</Example.Src>
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import circleRawBuffer from ':raw:./circle.svg?as=Buffer'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Raw Buffer</h1>
        <pre><code>{
            JSON.stringify(circleRawBuffer.toJSON())
        }</code></pre>
        <pre><code>{
            circleRawBuffer.toString()
        }</code></pre>
    </>
);
Page.Render();`
                }</Example.Src>
                <p>with the result (best viewed via 'open in new tab'):</p>
            </Example>
        </Topic>
    </Topic>