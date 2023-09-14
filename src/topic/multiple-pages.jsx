import { Topic, Inline, Inset } from "$SRC/common.jsx";
import { Example } from "$SRC/example.jsx";

export default
    () =>
    <Topic name="Multiple Pages" path="multiple-pages">
        <p>
            Used as it has been so far in this guide, NakedJSX will generate a single HTML page for each <Inline>*-page.jsx</Inline> within
            the project source directory.
        </p>
        <p>
            However, it is perfectly valid for a single <Inline>*-page.jsx</Inline> file to generate multiple pages, or even no page at all.
        </p>
        <Inset>
            <p>Important: while a single <Inline>*-page.jsx</Inline> file can produce multiple output pages, the Page API can only work on a single page between each pair of Page.Create() and Page.Render() calls.</p>
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

        <Topic name="From Data at Build-Time" path="dynamic-build-time">
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

        <Topic name="From Source Generated at Compile-Time" path="dynamic-compile-time">
            <p>
                It is possible to fetch or construct sources (JSX / MDX / JavaScript / etc.) at compile time.
                These sources are then compiled by NakedJSX, with full support for scoped CSS, asset import plugins
                and anything else that static sources can do.
            </p>
            <p>
                This requires the use of the <Inline>dyanmic</Inline> built-in plugin. This plugin requires a source
                file that is executed at compile time, and which returns JavaScript source for NakedJSX to compile.
            </p>
            <p>
                This example generates a NakedJSX page for each of an arbitray number of MDX files. The
                dynamic JavaScript file scans a folder for MDX files, generates a JavaScript import statement
                of each via the <Inline>@nakedjsx/plugin-asset-mdx</Inline> plugin, and returns an array of
                JSX:
            </p>
            <p>
                TODO: example
            </p>
        </Topic>

        {/* <Topic name="Dynamic" path="dynamic">
            <p>EXPERIMENTAL</p>
            A built-in <Inline>:dynamic:</Inline> import plugin provides a way to fetch and use JSX snippets
            from external data sources. Please get in touch if you would find that useful.
        </Topic> */}
    </Topic>