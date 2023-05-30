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

        <Topic name="Development Server" path="dev-server">
            <p>NakedJSX includes a development server. You can start it by passing the <Inline lang="shell">--dev</Inline> flag on the command line:</p>
            <Code lang="shell">{`$ npx nakedjsx src --out out --dev`}</Code>
            <p>This time, instead of exiting after the build, this is displayed:</p>
            <Code>{`Development server: http://localhost:8999, Press (x) to exit`}</Code>
            <p>
                You can now open <a href="http://localhost:8999">http://localhost:8999</a> and you will see the rendered index page.
                If you edit and save <Fixed>src/index-page.jsx</Fixed>, the server will rebuild <Fixed>out/index.html</Fixed> and the browser will refresh automatically.
            </p>
        </Topic>

        <Topic name="Using a Config File" path="config-file">
            <p>
                As projects start to make use of more NakedJSX features, the required command line
                options can stack up. A config file can be used to avoid this.
            </p>
            <p>
                Building with <Inline>--config-save</Inline> will save the build configuration
                into a <Inline>.nakedjsx.json</Inline> config file in your source directory.
            </p>
            <p>
                This config file will be automatically read by future builds, removing the need to specify
                anything other than the source directory when invoking <Inline lang="shell">npx nakedjsx</Inline>.
            </p>
            <p>
                Config file settings can be overriden by arguments supplied on the command line.
            </p>
            <p>
                Use of a config file is entirely optional.
            </p>
        </Topic>

        <Topic name="Terminology" path="terminology">
            <p>
                Much of the underlying functionality is performed by 
            </p>
        </Topic>
    </Topic>