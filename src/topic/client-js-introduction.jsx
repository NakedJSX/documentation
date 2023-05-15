export default
    () =>
    <Topic name="Client Javascript" path="client-javascript-introduction">
        <p>
            NakedJSX can compile JavaScript to execute in the browser.
        </p>
        <p>
            Files matching the pattern <Fixed nowrap>*-client.mjs</Fixed> are automatically
            compiled and placed into a script tag at the end of the body in the generated HTML.
        </p>
        <p>
            Modern JavaScript can be used, with the result being transpiled to a browser-compatible
            format when necessary.
        </p>
        <Example captureOutput={['example', 'client-javascript-introduction']}>
            <Example.Src lang="javascript" filename="src/index-client.js">{
`var p = document.getElementById('click-me');
var clickCounter = 0;
p.onclick =
    () =>
    {
        p.appendChild(document.createElement('br'));
        p.appendChild(document.createTextNode(\`Click \${++clickCounter}: This content was dynamically added to the DOM.\`));
    };`
            }</Example.Src>
            <Example.Src lang="javascript" filename="src/index-html.jsx">{
`import { Page } from '@nakedjsx/core/page'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Title</h1>
        <p id="click-me">Click Me!</p>
    </>
);
Page.Render();`
            }</Example.Src>
            <p>
                As you can see, the JavaScript output is minified:
            </p>
        </Example>
        <p>
            Minification is great for production builds, but not during development. In development mode
            (<Inline lang="shell">--dev</Inline>) minification is disabled and sourcemaps are generated,
            providing a comfortable debugging experience.
        </p>
        
        
    </Topic>