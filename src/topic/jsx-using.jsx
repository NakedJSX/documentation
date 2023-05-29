export default
    () =>
    <Topic name="JSX Features" path="using-jsx">
        <Topic name="Props and Children" path="props-and-children">
            <p>If you have used JSX before, props and children work as you would expect. For example:</p>
            <Example captureOutput={['example', 'using-jsx', 'props-and-children']}>
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
                <p>is rendered as follows:</p>
                <Example.BuildCmd />
            </Example>
        </Topic>

        <Topic name="Fragments" path="fragments">
            <p>
                Note the <Inline lang="jsx">{`<>`}</Inline> ... <Inline lang="jsx">{`</>`}</Inline> JSX 'fragment' syntax.
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

            <Example captureOutput={['example', 'using-jsx', 'refs']}>
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
            <p>This documentation uses a similar approach.</p>
        </Topic>

        <Topic name="Context" path="context">
            <p>
                Another useful feature allows parent and child elements to pass data to each other using
                the built-in <Inline>context</Inline> prop.
            </p>
            <p>
                In this example, a <Inline>Section</Inline> tag uses context to determine which
                heading tag to use:
            </p>

            <Example captureOutput={['example', 'using-jsx', 'context']}>
                <Example.Src lang="jsx" filename="src/tags.jsx">{
`const Heading =
    ({ depth, children, ...props }) =>
    {
        if (depth == 1)
            return <h1 {...props}>{children}</h1>
        if (depth == 2)
            return <h2 {...props}>{children}</h2>
        if (depth == 3)
            return <h3 {...props}>{children}</h3>
        if (depth == 4)
            return <h4 {...props}>{children}</h4>
        if (depth == 5)
            return <h5 {...props}>{children}</h5>
        else
            return <h6 {...props}>{children}</h6>
    }

export const Section =
    ({ title, path, context, children }) =>
    {
        // Start a depth of 2, and increment for each nested section.
        context.depth = context.depth ? context.depth + 1 : 2;

        return  <div css="margin-left: 32px">
                    <Heading depth={context.depth}>{title}</Heading>
                    {children}
                </div>
    }`
                }</Example.Src>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'
import { Section } from './tags.jsx'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Context</h1>
        <Section title="h2: Section 1">
            <Section title="h3: Section 1.1">
                <Section title="h4: Section 1.1.1">
                </Section>
            </Section>
            <Section title="h3: Section 1.2">
            </Section>
        </Section>
        <Section title="h2: Section 2">
        </Section>
    </>
);
Page.Render();`
                }</Example.Src>
            </Example>
            <p>
                Note that <Inline lang="js">context.depth</Inline> is never directly decremented, and yet
                the correct tags are used. This is because changes made to the context object itself are
                never visible to parent elements.
            </p>
            <p>
                However, there are cases in which it can useful for children to make data available to their
                parents. Achieving this requires two things:
            </p>
            <ol>
                <li>An object or array in the context for a child to modify, and</li>
                <li>A way to control when children are evaluated.</li>
            </ol>
            <p>
                Here is an example of a <Inline>{'<Section>'}</Inline> tag that
                adds a 'Back to top' link at the end of each section that has no subsections.
                This avoids, for example, a top level section with one child section adding
                two consequative 'Return to Top' links to the page.
            </p>
            <Example captureOutput={['example', 'using-jsx', 'context-evaluate-now']}>
                <Example.Src lang="jsx" filename="src/tags.jsx">{
`import { Page } from '@nakedjsx/core/page'

export const Section =
    ({ title, context, children }) =>
    {
        // If a parent section provided context,
        // let it know it has a subsection.
        if (context.has)
            context.has.subsection = true;

        // Provide a context to child sections
        context.has = { subsection: false };

        // Evaluate children tags immediately.
        // After this, context.has.children is valid.
        children = Page.EvaluateNow(children);

        const result =
            <div css={'margin-left: 48px'}>
                <strong>{title}</strong>
                <p>
                    This section has {
                        context.has.subsection
                            ? 'at least one subsection.'
                            : 'no subsections.'
                    }
                </p>
                {children}
                {!context.has.subsection &&
                    <p><a href="#top">Back to Top.</a></p>
                }
            </div>

        return result;
    }`
                }</Example.Src>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'
import { Section } from './tags.jsx'

Page.Create('en');
Page.AppendBody(
    <>
        <h1 id="top">Context (Evaluate Now)</h1>
        <Section title="Section 1">
            <Section title="Section 1.1">
                <Section title="Section 1.1.1" />
                <Section title="Section 1.1.2">
                    <Section title="Section 1.1.2.1" />
                </Section>
            </Section>
            <Section title="Section 1.2">
            </Section>
        </Section>
        <Section title="Section 2">
        </Section>
    </>
);
Page.Render();`
                }</Example.Src>
            </Example>
            <p>
                A another use of this feature can be seen
                in the <a href="https://github.com/NakedJSX/documentation/blob/main/src/example.jsx">{
                `<Example>`}</a> tag used to compile the examples in this documentation.
            </p>
        </Topic>
    </Topic>