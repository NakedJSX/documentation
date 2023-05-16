export default
    () =>
    <Topic name="Using JSX" path="jsx-using">
        <p>If you have used JSX before, props and children work as you would expect. For example:</p>
        <Example captureOutput={['example', 'jsx-using']}>
            <Example.Src lang="jsx" filename="src/index-html.jsx">{
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
        <Section title="Properties">
            <p>and children</p>
            <p>work as expected.</p>
        </Section>
    </>
);
Page.Render();`
            }</Example.Src>
            <p>is rendered as:</p>
        </Example>
        <p>
            Note the <Inline>{`<>`}</Inline> ... <Inline>{`</>`}</Inline> JSX 'fragment' syntax.
            Fragments allow a group of JSX elements to be passed around in code in the same
            way that a single element can be.
        </p>
        <p>
            JSX tags compile down to functions, and you can export and import a them like any other function.
            A refactored version of the above example might be split into two files like this:
        </p>
        <Code lang="jsx" title="src/common.jsx">{
`export const Section =
    ({ title, children }) =>
    <>
        <h2>{title}</h2>
        {children}
    </>`
        }</Code>
        <Code lang="jsx" title="src/index-html.jsx">{
`import { Page } from '@nakedjsx/core/page'
import { Section } from './common.jsx'

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Using JSX</h1>
        <Section title="Properties">
            <p>and children</p>
            <p>work as expected.</p>
        </Section>
    </>
);
Page.Render();`
        }</Code>
        <p>In this way, libraries of reusable components can be easily shared by multiple pages, or even published in an npm package.</p>
        <p>The usual JSX conditional rendering tricks work. In the following example, the <Inline lang="jsx">{`<h2>`}</Inline> title will only render if a title prop is supplied:</p>
        <Code lang="jsx" title="src/common.jsx">{
`export const Section =
    ({ title, children }) =>
    <>
        {title && <h2>{title}</h2>}
        {children}
    </>`
        }</Code>
    </Topic>