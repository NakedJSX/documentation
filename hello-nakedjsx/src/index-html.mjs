import { JSX } from '@nakedjsx/core/jsx'
import { Page } from '@nakedjsx/core/page'

Page.Create('en');
Page.AppendHead(
    <title>Hello NakedJSX</title>
    );
Page.AppendBody(
    <>
        <h1>Hello NakedJSX</h1>
        <p>
            This is a minimal NakedJSX example,
            it has no CSS, so it looks yucky.
        </p>
    </>
    );
Page.Render();
