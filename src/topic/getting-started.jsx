const exampleSource =
`import { Page } from '@nakedjsx/core/page'

const BodyContent =
    () =>
    <>
        <h1>Hello NakedJSX</h1>
        <p>A minimal NakedJSX example.</p>
    </>

Page.Create('en');
Page.AppendHead(<title>Hello NakedJSX</title>);
Page.AppendBody(<BodyContent />);
Page.Render();`;

export default
    () =>
    <Topic name="Getting Started" path="getting-started">
        <p>
            NakedJSX searches a directory for filenames that match <Fixed nowrap>*-page.jsx</Fixed>.
            Each matching file is compiled and then executed to produce a HTML file in an output directory.
        </p>
        <p>Here is a near-minimal NakedJSX project. It consists of one file in an otherwise empty directory:</p>
        <Example captureOutput={['example', 'getting-started']}>
            <Example.Src lang="jsx" filename="src/index-page.jsx">{
                exampleSource
            }</Example.Src>
            <p>Building this requires running an npx command. If you have Node.js installed, you can create the file above and try it now:</p>
            <Example.BuildCmd />
            <p>This tells NakedJSX to look for pages to build in the 'src' directory, build them into a 'out' directory, and to format the generated files nicely.</p>
            <p>The result in this case is a single new file:</p>
        </Example>
        <Example buildFlags={[]} wordwrapOutput captureOutput={['example', 'getting-started-dist']}>
            <Example.Src hidden lang="jsx" filename="src/index-page.jsx">{
                exampleSource
            }</Example.Src>
            <p>If you build it without the <Inline>--pretty</Inline> flag, the result is tightly packed and suitable for distribution:</p>
        </Example>
    </Topic>