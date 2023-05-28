export default
    () =>
    <Topic name="Using JSX" path="jsx-using">
        <p>JSX tags are a very useful way to keep your HTML fragments organised and reuseable.</p>
        
        <Topic name="Props and Children" path="props-and-children">
            <p>If you have used JSX before, props and children work as you would expect. For example:</p>
            <Example captureOutput={['example', 'jsx-using-props-and-children']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

const Section =
    ({ title, children }) =>
    <>
        <h2>{title}</h2>
        {children}
    </>

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Using JSX</h1>
        <Section title="Properties" />
        <Section title="and Children">
            <p>Work,</p>
            <p>as expected.</p>
        </Section>
    </>
);
Page.Render();`
                }</Example.Src>
                <p>is rendered as:</p>
            </Example>
        </Topic>

        <Topic name="Fragments" path="fragments">
            <p>
                Note the <Inline>{`<>`}</Inline> ... <Inline>{`</>`}</Inline> JSX 'fragment' syntax.
                Fragments allow a flat list of JSX elements to be passed around in code in the same
                way that a single element can be.
            </p>
        </Topic>

        <Topic name="Exporting and Importing" path="exporting-and-importing">
            <p>
                JSX tags compile down to functions, and you can export and import them like any other function.
                A refactored version of the above example might be split into two files like this:
            </p>
            <Code lang="jsx" title="src/common.jsx" copyCodeLink>{
`export const Section =
    ({ title, children }) =>
    <>
        <h2>{title}</h2>
        {children}
    </>`
            }</Code>
            <Code lang="jsx" title="src/index-page.jsx" copyCodeLink>{
`import { Page } from '@nakedjsx/core/page'
import { Section } from './common.jsx'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Using JSX</h1>
        <Section title="Properties" />
        <Section title="and Children">
            <p>Work,</p>
            <p>as expected.</p>
        </Section>
    </>
);
Page.Render();`
            }</Code>
            <p>Note that the <Inline>Section</Inline> tag has been imported from <Fixed>common.jsx</Fixed>.</p>
            <p>In this way, libraries of reusable components can be easily shared by multiple pages, or even published in an npm package.</p>
        </Topic>

        <Topic name="Conditional Rendering" path="conditional-rendering">
            <p>The usual JSX conditional rendering tricks work. In the following example, the <Inline lang="jsx">{`<h2>`}</Inline> title will only render if a title prop is supplied:</p>
            <Code lang="jsx" title="src/common.jsx" copyCodeLink>{
`export const Section =
    ({ title, children }) =>
    <>
        {title && <h2>{title}</h2>}
        {children}
    </>`
            }</Code>
        </Topic>

        <Topic name="Refs" path="refs">
            <p>
                There are times when it is helpful to capture a reference to a created element, and add more children
                to it later. One use case is to automatically build a table of contents as content sections are added:
            </p>

            <Example captureOutput={['example', 'jsx-using-props-and-children']}>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

// Create an empty ref - we'll bind it to an element later
const tocList = Page.RefCreate();

const TocEntry =
    ({ title, path }) =>
    <li>
        <a href={'#' + path}>{title}</a>
    </li>;

const Section =
    ({ title, path, children }) =>
    {
        // A section is being added, so create a link in the table of contents.
        tocList.appendJsx(<TocEntry title={title} path={path} />);

        return  <div id={path}>
                    <h2>{title}</h2>
                    {children}
                </div>
    }

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Refs</h1>
        {/* Capture a reference to the nav ul element using the magic 'ref' prop. */}
        <nav><ul ref={tocList} /></nav>
        <hr/>
        <Section title="Section One" path="section-one">
            This is section one.
        </Section>
        <Section title="Section Two" path="section-two">
            This is section two.
        </Section>
    </>
);
Page.Render();`
                }</Example.Src>
                <p>
                    A Ref is created by calling <Inline lang="js">Page.RefCreate()</Inline>, and it is later bound to
                    the <Inline lang="jsx">{`<ul>`}</Inline> element by passing it as a <Inline>ref</Inline> prop value.
                </p>
                <p>
                    Then, as each Section tag is created, a new TocEntry is added to
                    the <Inline lang="jsx">{`<ul>`}</Inline> using <Inline lang="js">tocList.appendJsx()</Inline>.
                </p>
                <p>The result:</p>
            </Example>
            <p>This documentation page uses a similar approach.</p>
        </Topic>
    </Topic>