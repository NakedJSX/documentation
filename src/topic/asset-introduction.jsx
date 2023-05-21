const cssContent =
`html {
    font-family: sans-serif;
}
body {
    font-size: 1.125rem;
    color: fuchsia;
}`;

export default
    () =>
    <Topic name="Introduction to Assets" path="asset-introduction">
        <p>
            NakedJSX allows you to publish arbitrary files via the asset system.
            Asset files are optionially processed by an import plugin, then placed
            in the build output 'asset' subdirectory.
        </p>
        <p>
            To import a file as an asset, use a regular JavaScript import statement but
            prefix the import path with <Inline>::</Inline>, like this:
        </p>
        <Code lang="javascript">{
`import style from '::./style.css'`
        }</Code>
        <p>
            This will cause NakedJSX to place a copy of './style.css' in the 'asset'
            directory in the build output folder. The file will be renamed to include
            a hash of the content. For example:
        </p>
        <Example captureOutput={['example', 'asset-introduction']}>
            <Example.Src lang="css" filename="src/style.css">{cssContent}</Example.Src>
            <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import style from '::./style.css'

Page.Create('en');
Page.AppendHead(<link type="text/css" rel="stylesheet" href={style} />);
Page.AppendBody(
    <>
        <h1>Title</h1>
        <p>Content.</p>
    </>
);
Page.Render();`
            }</Example.Src>
            <p>produces the following:</p>
        </Example>
        <p>
            Note that the CSS contents have not been optimised - <Inline lang='css'>color: fuchsia</Inline>
            has not been replaced with <Inline lang='css'>color: #f0f</Inline>. The asset has been exported
            with its original content.
        </p>
        <p>
            It is also possible to embed an asset directly into the page, using the built-in 'raw' import
            plugin and a <Inline lang="html">{`<raw-content>`}</Inline> tag. The following example uses the
            same CSS file as above, but a slightly different JSX file:
        </p>
        <Example captureOutput={['example', 'asset-introduction-raw']}>
            <Example.Src hidden lang="css" filename="src/style.css">{cssContent}</Example.Src>
            <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

import style from ':raw:./style.css'

Page.Create('en');
Page.AppendHead(<style><raw-content content={style}/></style>);
Page.AppendBody(
    <>
        <h1>Title</h1>
        <p>Content.</p>
    </>
);
Page.Render();`
            }</Example.Src>
        </Example>
    </Topic>