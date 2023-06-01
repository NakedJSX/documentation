export default
    () =>
    <Topic name="Multiple Pages" path="multiple-pages">
        <p>
            Used as it has been so far in this guide, NakedJSX will generate a single HTML page for each <Inline>*-page.mjs</Inline> within
            the project source directory.
        </p>
        <p>
            However, it is perfectly valid for a single <Inline>*-page.mjs</Inline> file to generate multiple pages, or even no page at all.
        </p>
        <Inset>
            Important: Within a single <Inline>*-page.jsx</Inline> file, the Page.API can only work on a single page at a time.
        </Inset>

        <Topic name="Hardcoded" path="hardcoded">
            <p>
                The simplest way to create multiple pages from a single file is to simply add more calls to the Page API and override the
                output filename, like this:
            </p>

            <Example captureOutput={['example', 'multiple-pages', 'hardcoded']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

const BodyContent =
    ({ title, children }) =>
    <>
        <h1>{title}</h1>
        {children}
    </>

// Make a HTML page, and override the default filename
Page.Create('en');
Page.AppendBody(
    <BodyContent title="Output File One">
        <p>This is the content for output file one.</p>
    </BodyContent>
    );
Page.Render('index-one.html');

// Now make another page!
Page.Create('en');
Page.AppendBody(
    <BodyContent title="Output File Two">
        <p>This is the content for output file two.</p>
    </BodyContent>
    );
Page.Render('index-two.html');`
                }</Example.Src>
                <p>
                    Note that a filename is being passed to <Inline lang="js">Page.Render()</Inline> to override the default filename.
                </p>
            </Example>
        </Topic>

        <Topic name="Dynamic" path="dynamic">
            <p>
                It is also possible fetch data at build time and use it to generate an arbitrary number of pages.
            </p>
            <p>
                Simply fetch the data at the top level scope in the page JavaScript, awaiting as needed,
                then generate your Page.* API calls in a loop.
            </p>
            <p>
                TODO: example
            </p>
        </Topic>

        <Topic name="Dynamic" path="dynamic">
            <p>EXPERIMENTAL</p>
            A built-in <Inline>:dynamic:</Inline> import plugin provides a way to fetch and use JSX snippets
            from external data sources. Please get in touch if you would find that useful.
        </Topic>
    </Topic>