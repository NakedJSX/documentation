import { Page } from '@nakedjsx/core/page'

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
Page.Render();