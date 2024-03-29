import { Topic, Inline, Fixed } from "$SRC/common.jsx";
import { Example } from "$SRC/example.jsx";

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

const exampleSourcePlus =
`import { Page } from '@nakedjsx/core/page'

const BodyContent =
    ({ title }) =>
    <>
        <h1 css="color: fuchsia">{title}</h1>
    </>

const ClientJsx =
    () =>
    <p css="color: #ff00ff">
        This paragraph was added by browser JavaScript!
    </p>

// Prepare to produce a HTML file
Page.Create('en');

// Provide some static content
Page.AppendCss('body { font-family: sans-serif }');
Page.AppendHead(<title>Hello NakedJSX 2!</title>);
Page.AppendBody(<BodyContent title="Hello NakedJSX 2!" />);

// Make a JSX function available to browser JavaScript
Page.AppendJs(ClientJsx);

// Add some JavaScript that will run in the browser.
Page.AppendJs(document.body.appendChild(<ClientJsx />));

// Output the HTML file
Page.Render();`

export default
    () =>
    <Topic name="Hello World" path="getting-started">
        <p>
            NakedJSX searches a directory for filenames that match <Fixed nowrap>*-page.jsx</Fixed>.
            Each matching file is compiled and then executed to produce a HTML file in an output directory.
        </p>
        <p>Here is a near-minimal NakedJSX project. It consists of one file in an otherwise empty directory:</p>
        <Example captureOutput={['example', 'hello-world', 'pretty']}>
            <Example.Src lang="jsx" filename="src/index-page.jsx">{exampleSource}</Example.Src>
            <p>Building this requires running an npx command. If you have Node.js installed, you can create the file above and try it now:</p>
            <Example.BuildCmd />
            <p>This tells NakedJSX to look for pages to build in the 'src' directory, build them into a 'out' directory, and to format the generated files nicely.</p>
            <p>The result in this case is a single new file:</p>
        </Example>
        <Example captureOutput={['example', 'hello-world', 'dist']} buildFlags={[]} wordwrapOutput>
            <Example.Src hidden lang="jsx" filename="src/index-page.jsx">{
                exampleSource
            }</Example.Src>
            <p>If you build it without the <Inline>--pretty</Inline> flag, the result is tightly packed and suitable for distribution:</p>
            <Example.BuildCmd />
        </Example>

        <Topic name="Adding CSS and Client JavaScript" path="getting-started-plus">
            <p>
                CSS and client JavaScript features are covered in detail later. However it's worth
                looking at a second example that touches on these function areas:
            </p>
            <Example captureOutput={['example', 'hello-world', 'plus', 'pretty']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{exampleSourcePlus}</Example.Src>
                <p>
                    The resulting HTML now has embedded CSS and JavaScript:
                </p>
            </Example>
            <p>
                Note that:
            </p>
            <ol>
                <li>The scoped CSS is extracted from the JSX, minified, with the resulting class shared by both the page JSX and client JSX.</li>
                <li>Some functions were automatically added to allow the compiled client JSX to create DOM nodes in the browser.</li>
            </ol>
            <p>
                The same example built without <Inline>--pretty</Inline> is less than a kilobyte in size:
            </p>
            <Example captureOutput={['example', 'hello-world', 'plus', 'dist']} buildFlags={[]} wordwrapOutput>
                <Example.Src hidden lang="jsx" filename="src/index-page.jsx">{exampleSourcePlus}</Example.Src>
            </Example>
        </Topic>
    </Topic>