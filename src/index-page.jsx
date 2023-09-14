import { Page } from '@nakedjsx/core/page';

import HelloWorld from './topic/hello-world.jsx';
import DevelopmentTools from './topic/tools.jsx';
import JsxUsing from './topic/jsx.jsx';
import CssUsing from './topic/css.jsx';
import Assets from './topic/assets.jsx';
import ClientJs from './topic/client-js.jsx';
import MultiplePages from './topic/multiple-pages.jsx';
import Plugins from './topic/plugins.jsx';
import Cookbook from './topic/cookbook.jsx';

import { Logo, Toc, Inset, Analytics } from './common.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const title = "NakedJSX Documentation";
const description = "NakedJSX documentation."

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://nakedjsx.org/documentation/"></meta>
        <meta property="og:title" content={`NakedJSX - ${title}`}></meta>
        <meta property="og:description" content={description}></meta>
        <link rel="canonical" href="https://nakedjsx.org/documentation/" />
        <title>{title}</title>
        {!Page.IsDevelopmentMode() && <Analytics />}
    </>
    );
Page.AppendCss(prismTheme);
Page.AppendBody(
    <>
        <main>
            <h1><Logo /> Documentation</h1>
            <p>A detailed walkthrough of NakedJSX features.</p>
            <Inset><p>For a high-level overview, please visit <a href="https://nakedjsx.org">nakedjsx.org</a>.</p></Inset>
            <p>This page was built using NakedJSX, <a href={'https://github.com/NakedJSX/documentation/blob/main/src/index-page.jsx'}>and you can look its source</a>.</p>
            <Toc />
            <HelloWorld />
            <DevelopmentTools />
            <JsxUsing />
            <CssUsing />
            <Assets />
            <ClientJs />
            <MultiplePages />
            <Plugins />
            <Cookbook />
        </main>
    </>
    );
Page.Render();
