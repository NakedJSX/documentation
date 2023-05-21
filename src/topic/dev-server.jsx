export default
    () =>
    <Topic name="Development Server" path="dev-server">
        <p>NakedJSX includes a development server. You can start it by passing the <Inline lang="shell">--dev</Inline> flag on the command line:</p>
        <Code lang="shell">{`$ npx nakedjsx src --out dev --dev`}</Code>
        <p>This time the build output is placed in a 'dev' directory, and instead of exiting after the build, this is displayed:</p>
        <Code>{`Development server: http://localhost:8999, Press (x) to exit`}</Code>
        <p>
            You can now open <a href="http://localhost:8999">http://localhost:8999</a> and you will see the rendered index page.
            If you edit and save <Fixed>src/index-page.jsx</Fixed>, the server will rebuild <Fixed>dev/index.html</Fixed> and the browser will refresh.
        </p>
    </Topic>