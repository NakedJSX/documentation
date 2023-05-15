const DepList =
    ({ children }) =>
    <ul>
        {children}
    </ul>

const Dep =
    ({ name, url, donate, plugins, children }) =>
    <li>
        <a href={url}>{name}</a>{donate && <> - <a href={donate}>donate</a></>}
        {children}
        {plugins && <p css="font-size: 1rem">* {plugins}</p>}
    </li>

export default
    () =>
    <Topic name="Dependencies &amp; Acknowledgments" path="acknowledgments">
        <p>NakedJSX would not exist without these direct dependencies. If you find NakedJSX useful, please consider donating to them.</p>
        <DepList>
            <Dep name="Babel" url="https://babeljs.io" donate="https://opencollective.com/babel" plugins="Plus @babel/generator and @babel/plugin-transform-react-jsx plugins, and @babel/preset-env preset.">
                <ul>
                    <li>Transpilation of JSX to JavaScript</li>
                    <li>Transpilation of JavaScript intended for the browser</li>
                    <li>Hosting NakedJSX scoped CSS plugin</li>
                </ul>
            </Dep>
            <Dep name="Chokidar" url="https://github.com/paulmillr/chokidar#readme" donate="https://github.com/sponsors/paulmillr">
                <ul>
                    <li>Observing the file system for changes</li>
                </ul>
            </Dep>
            <Dep name="CSSO" url="https://github.com/css/csso#readme">
                <ul>
                    <li>CSS optmisation / compression</li>
                </ul>
            </Dep>
            <Dep name="CSSTree" url="https://github.com/csstree/csstree#readme">
                <ul>
                    <li>CSS manipulation</li>
                </ul>
            </Dep>
            <Dep name="Node.js" url="https://nodejs.org">
                <ul>
                    <li>JavaScript runtime environment.</li>
                </ul>
            </Dep>
            <Dep name="PostCSS" url="https://postcss.org" donate="https://opencollective.com/postcss" plugins="Plus postcss-nested plugin.">
                <ul>
                    <li>Transpilation of nested CSS into flat CSS.</li>
                </ul>
            </Dep>
            <Dep name="Rollup" url="https://rollupjs.org" doante="https://opencollective.com/rollup" plugins="Plus @rollup/plugin-babel, @rollup/plugin-dynamic-import-vars, and @rollup/plugin-inject plugins.">
                <ul>
                    <li>Production of self-contained JavaScript bundles.</li>
                    <li>Hosting NakedJSX import plugin</li>
                </ul>
            </Dep>
            <Dep name="Terser" url="https://terser.org">
                <ul>
                    <li>JavaScript optmisation / compression for production builds of client JavaScript code.</li>
                </ul>
            </Dep>
        </DepList>
    </Topic>