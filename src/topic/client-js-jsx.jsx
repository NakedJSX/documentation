export default
    () =>
    <Topic name="Client Javascript JSX" path="client-javascript-jsx">
        <p>
            NakedJSX client JavaScript can also use JSX. Props are supported, as are
            scoped and nested CSS. Extracted CSS classes are deduplicated with those used by the HTML.
        </p>
        <p>
            Files matching the pattern <Fixed nowrap>*-client.mjs</Fixed> are automatically
            compiled and placed into a script tag at the end of the body in the generated HTML.
        </p>
        <p>
            Here is a version of the previous example that uses JSX:
        </p>
        <Example captureOutput={['example', 'client-javascript-jsx']}>
            <Example.Src lang="javascript" filename="src/index-client.js">{
`const JsxTag =
    ({ count }) =>
    <>
        <br/>
        Click {\`\${count}\`}: This
        <span css="color: fuchsia"> JSX </span>
        content was dynamically added to the DOM.
    </>

let clickCounter = 0;
let p = document.getElementById('click-me');
p.onclick =
    () => p.appendChild(<JsxTag count={++clickCounter}/>);
`
            }</Example.Src>
            <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

Page.Create('en');
Page.AppendBody(
    <>
        <h1 css="color: fuchsia">Title</h1>
        <p id="click-me">Click Me!</p>
    </>
);
Page.Render();`
            }</Example.Src>
            <p>The client JSX is compiled down to JavaScript that creates the necessary DOM elements and sets their attributes.</p>
            <p>About 630 bytes is added for the DOM element construction runtime.</p>
            <p>
                The browser <Inline lang="javascript">Element.prototype.appendChild()</Inline> implementation is patched to add support
                for adding an array of elements. Without this, this example would have needed to iterate over the JSX fragment returned by <Inline lang="jsx">{`<JsxTag />`}</Inline>.
            </p>
        </Example>
    </Topic>