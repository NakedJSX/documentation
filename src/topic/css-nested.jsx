export default
    () =>
    <Topic name="Nested CSS" path="css-nested">
        <p>
            NakedJSX supports <a href="https://www.w3.org/TR/css-nesting-1/">CSS nesting</a>,
            with automatic conversion to browser compatible CSS.
        </p>
        <Example captureOutput={['example', 'css-nested']}>
            <Example.Src lang="jsx" filename="src/index-html.jsx">{
`import { Page } from '@nakedjsx/core/page'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Nested CSS</h1>
        <ul css={\`
            list-style-type: upper-roman;

            & li {
                line-height: 1.5
            }
        \`}>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
            <li>Item four</li>
        </ul>
    </>
    );
Page.Render();`
            }</Example.Src>
        </Example>
        <p>
            Note that in this case the scoped CSS is being extracted from what looks
            like a regular HTML element rather than a custom JSX tag. This works because
            we are writing JSX, not HTML.
        </p>
    </Topic>