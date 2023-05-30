import { Topic, Inline } from "../common.jsx";
import { Example } from "../example.jsx";

export default
    () =>
    <Topic name="CSS" path="css">
        <p>
            NakedJSX is CSS aware and places all CSS used by a page into an
            inline <Inline lang="jsx">{'<style>'}</Inline> in the document head.
        </p>
        <Topic name="Scoped CSS" path="scoped">
            <p>NakedJSX will extract CSS classes based on a <Inline>css</Inline> JSX prop.</p>
            <p>
                If two different JSX functions contain equivalent CSS, they will
                share a class in the final output:
            </p>
            <Example captureOutput={['example', 'css', 'scoped']}>
                <Example.Src lang="jsx" filename="src/index-page.mjs">{
    `import { Page } from '@nakedjsx/core/page'

    const Section =
        ({ title, children }) =>
        <>
            <h2 css="color: fuchsia">{title}</h2>
            {children}
        </>

    Page.Create('en');
    Page.AppendBody(
        <>
            <Section title="Fuchsia Title">
                <p css="color: #ff00ff">Fuchsia Content.</p>
            </Section>
        </>
    );
    Page.Render();`
                }</Example.Src>
            </Example>
            <p>
                In this case the CSS compiler produces <Inline lang="css">color: #f0f</Inline> from both <Inline lang="css">color: fuchsia</Inline> and <Inline lang="css">color: #ff00ff</Inline>,
                so a single CSS class is shared by both elements.
            </p>
        </Topic>

        <Topic name="Nested CSS" path="nested">
            <p>
                NakedJSX supports <a href="https://www.w3.org/TR/css-nesting-1/">CSS nesting</a> syntax,
                with automatic conversion to browser compatible CSS:
            </p>
            <Example captureOutput={['example', 'css', 'nested']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
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
        </Topic>

        <Topic name="Page.AppendCss()" path="page-append-css">
            <p>
                Raw CSS can be added by passing a string containing CSS to the <Inline lang="js">Page.AppendCss()</Inline> function.
            </p>
            <p>
                This is particularly useful for incorporating CSS imported from a file as a raw asset.
            </p>
            <Example captureOutput={['example', 'css', 'page-append-css']}>
                <Example.Src lang="jsx" filename="src/index-page.mjs">{
    `import { Page } from '@nakedjsx/core/page'

    Page.Create('en');
    Page.AppendCss(\`
        html {
            font-family: sans-serif;
        }
        \`);
    Page.AppendBody(
        <>
            <h1>Phew.</h1>
            <p>Those yucky serifs are gone.</p>
        </>
    );
    Page.Render();`
                }</Example.Src>
            </Example>
        </Topic>

        <Topic name="Common CSS File" path="common">
            <p>
                Document default CSS and common utility classes can be placed in a common CSS file
                that is added to all pages. This requires building with an additional flag:
            </p>
            <Example buildFlags={['--pretty', '--css-common', 'src/style.css']} captureOutput={['example', 'css', 'common']}>
                <Example.Src lang="css" filename="src/style.css">{
`html {
    font-family: sans-serif;
}
body {
    font-size: 1.125rem;
}`
                }</Example.Src>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Hello again, NakedJSX</h1>
        <p>
            A minimal NakedJSX example,
            with a common CSS file.
        </p>
    </>
    );
Page.Render();`
                }</Example.Src>
                <p>built with the following command:</p>
                <Example.BuildCmd />
            </Example>
        </Topic>
    </Topic>