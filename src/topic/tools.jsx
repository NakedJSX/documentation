export default
    () =>
    <Topic name="Development Tools" path="tools">
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

        <Topic name="Build-time Defined Values" path="definition-injection">
            <p>
                Values can be passed from the command line into the generated code. This is useful for switching between
                multiple client ids for third party APIs.
            </p>
            <p>
                To use this feature, pass <Inline lang="shell">{`--define <key> <value>`}</Inline> on the build command,
                and import from the key in page JavaScript:
            </p>
            <Example buildFlags={['--define', 'BUILD_KEY', 'BUILD_VALUE', '--pretty']} captureOutput={['example', 'tools', 'definition-injection']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'
import buildValue from 'BUILD_KEY'

const BodyContent =
    () =>
    <>
        <h1>Definition Injection</h1>
        <p>The following was passed from the build command: {buildValue}</p>
    </>

Page.Create('en');
Page.AppendBody(<BodyContent />);
Page.Render();`
                }</Example.Src>
                <Example.BuildCmd />
            </Example>
        </Topic>

        <Topic name="Import Source Path Aliases" path="path-aliases">
            <p>
                NakedJSX supports import source path aliases, making it easier to manage larger projects.
            </p>
            <p>
                To use this feature, pass <Inline lang="shell">{`--path-alias <alias> <path>`}</Inline> on the build command,
                and then use the alias at the start of your import string:
            </p>
            <Example buildFlags={['--path-alias', '$LIB', 'lib', '--pretty']} captureOutput={['example', 'tools', 'path-alias']}>
                <Example.Src lang="jsx" filename="lib/something.mjs">{
`export const something = 'A string imported via a path alias.';`
                }</Example.Src>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'
import { something } from '$LIB/something.mjs'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Path Alias</h1>
        <p>Here's something: {something}</p>
    </>
    );
Page.Render();`
                }</Example.Src>
                <Example.BuildCmd />
            </Example>
        </Topic>
    </Topic>