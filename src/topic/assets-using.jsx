import circle_raw from ':raw:$ASSET/circle.svg'

export default
    () =>
    <Topic name="Using Assets" path="using-assets">
        <Topic name="Arbitrary Files" path="generic">
            <p>
                NakedJSX allows you to publish and link to arbitrary files via the asset
                system. Asset files are optionially processed by an import plugin, then placed
                in the build output 'asset' subdirectory.
            </p>
            <p>
                To import a file as a generic asset, use a regular JavaScript import statement but
                prefix the import path with <Inline>::</Inline>, like this:
            </p>
            <Code lang="javascript">{
    `import circleHref from '::./circle.svg'`
            }</Code>
            <p>
                This will cause NakedJSX to place a copy of <Inline>./circle.svg</Inline> in the 'asset'
                directory in the build output folder, and <Inline>circleHref</Inline> will be a relative URL to it.
            </p>
            <p>
                For example:
            </p>
            <Example captureOutput={['example', 'using-assets', 'generic']}>
                <Example.Src lang="xml" filename="src/circle.svg">{circle_raw}</Example.Src>
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
        
        <Topic name="Raw Asset Content" path="raw">
            <p>
                Sometimes it is desireable to embed the content of an asset itself in your page JS,
                as this can save a round trip to the server. NakedJSX includes a <Inline>:raw:</Inline> import
                plugin that returns a string containing the contents of a specified asset file.
            </p>
            <p>
                That content can then be placed directly into the document without further processing,
                using the built-in <Inline>{'<raw-content>'}</Inline> tag:
            </p>
            <Example captureOutput={['example', 'using-assets', 'raw']}>
                <Example.Src lang="xml" filename="src/circle.svg">{circle_raw}</Example.Src>
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
    </Topic>