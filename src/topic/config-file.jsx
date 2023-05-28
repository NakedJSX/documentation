export default
    () =>
    <Topic name="Using a Config File" path="config-file">
        <p>
            Building with <Inline>npx nakedjsx ... --config-save</Inline> will save the build configuration
            into a <Inline>.nakedjsx.json</Inline> config file in your source directory.
        </p>
        <p>
            This config file will be automatically read by future builds, removing the need to specify
            anything other than the source directory when invoking <Inline lang="shell">npx nakedjsx</Inline>.
        </p>
        <p>
            Config file settings can be overriden by arguments supplied on the command line.
        </p>
    </Topic>