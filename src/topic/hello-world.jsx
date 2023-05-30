const exampleSource =
`import { Page } from '@nakedjsx/core/page'

const BodyContent =
    () =>
    <>
        <h1>Hello World</h1>
        <p>A near-minimal NakedJSX example.</p>
    </>

Page.Create('en');
Page.AppendHead(<title>Hello World</title>);
Page.AppendBody(<BodyContent />);
Page.Render();`;

export default
    () =>
    <Topic name="Hello World" path="getting-started">
        <p>
            NakedJSX searches a directory for filenames that match <Fixed nowrap>*-page.jsx</Fixed>.
            Each matching file is compiled and then executed to produce a HTML file in an output directory.
        </p>
        <p>Here is a near-minimal NakedJSX project. It consists of one file in an otherwise empty directory:</p>
        <Example captureOutput={['example', 'hello-world', 'pretty']}>
            <Example.Src lang="jsx" filename="src/index-page.jsx">{
                exampleSource
            }</Example.Src>
            <p>Building this requires running an npx command. If you have Node.js installed, you can create the file above and try it now:</p>
            <Example.BuildCmd />
            <p>This tells NakedJSX to look for pages to build in the 'src' directory, build them into a 'out' directory, and to format the generated files nicely.</p>
            <p>The result in this case is a single new file:</p>
        </Example>
        <Example buildFlags={[]} wordwrapOutput captureOutput={['example', 'hello-world', 'dist']}>
            <Example.Src hidden lang="jsx" filename="src/index-page.jsx">{
                exampleSource
            }</Example.Src>
            <p>If you build it without the <Inline>--pretty</Inline> flag, the result is tightly packed and suitable for distribution:</p>
            <Example.BuildCmd />
        </Example>

        {/* <Topic name="Terminology" path="terminology">
            <dl>
                <dt>Page JavaScript</dt>
                <dd>The JavaScript (and JSX) used at build-time to produce HTML files.</dd>
                <dt>Client JavaScript</dt>
                <dd>JavaScript that runs in the browser.</dd>
            </dl>
        </Topic> */}
    </Topic>