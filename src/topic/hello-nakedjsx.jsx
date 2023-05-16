export default
    () =>
    <Topic name="Hello NakedJSX" path="hello-nakedjsx">
        <p>
            NakedJSX searches a directory for filenames that match <Fixed nowrap>*-html.jsx</Fixed>.
            Each matching file is compiled and then executed to procuce a HTML file in an output directory.
        </p>
        <p>Here is a minimal NakedJSX project. It consists of one file in an otherwise empty directory:</p>
        <Example captureOutput={['example', 'hello-nakedjsx']}>
            <Example.Src lang="jsx" filename="src/index-html.jsx">{
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
Page.Render();`
            }</Example.Src>
            <p>Building this requires running an npx command. If you have Node.js installed, you can create the file above and try it now:</p>
            <Code lang="shell">{
`$ npx nakedjsx src --out out --pretty`
            }</Code>
            <p>This tells NakedJSX to look for pages to build in the 'src' directory, build them into a 'out' directory, and to format the generated files nicely.</p>
            <p>The result in this case is a single new file:</p>
        </Example>
        <p>Having a simple way to build HTML files from JSX is a good start, but NakedJSX can do much more.</p>
    </Topic>