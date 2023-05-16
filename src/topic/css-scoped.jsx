import { Topic, Inline } from '../common.jsx'

export default
    () =>
    <Topic name="Scoped CSS" path="css-scoped">
        <p>NakedJSX will extract CSS classes based on a <Inline>css</Inline> JSX prop.</p>
        <p>
            If two different JSX tags contain equivalent CSS, they will
            share a class in the final output:
        </p>
        <Example captureOutput={['example', 'css-scoped']}>
            <Example.Src lang="jsx" filename="src/index-html.mjs">{
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