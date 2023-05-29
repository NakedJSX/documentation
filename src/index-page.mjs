import { Page } from '@nakedjsx/core/page';

import GettingStarted from './topic/getting-started.jsx';
import JsxUsing from './topic/jsx.jsx';
import CssUsing from './topic/css.jsx';
import Assets from './topic/assets.jsx';
import ClientJs from './topic/client-js.jsx';
import Plugins from './topic/plugins.jsx';

import PagesDynamic from './topic/pages-dynamic.jsx';
import DefinitionInjection from './topic/definition-injection.jsx';

import { Toc, TopicList, Topic, Fixed, Code, Inline, Analytics } from './common.jsx';
import { Example } from './example.jsx';

import logo from ':raw:$ASSET/logo.svg';
import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

//
// Rather than require each topic import the tags it needs,
// add them all to the global scope.
//

Object.assign(global, { Topic, Fixed, Code, Inline, Example });

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NakedJSX builds static HTML files from JavaScript and JSX." />
        <title>NakedJSX Documentation</title>
        <Analytics />
    </>
    );
Page.AppendCss(prismTheme);
Page.AppendBody(
    <>
        <main>
            <h1><raw-content content={logo} /> Documentation</h1>
            <p>Here you will find a detailed walkthrough of NakedJSX features.</p>
            <p>For a high-level overview, please visit <a href="https://nakedjsx.org">nakedjsx.org</a>.</p>
            <p>This page was built by NakedJSX, <a href={'https://github.com/NakedJSX/documentation/blob/main/src/index-html.mjs'}>and you can look its source</a>.</p>
            <Toc />
            <TopicList>
                <GettingStarted />
                <JsxUsing />
                <CssUsing />
                <Assets />
                <ClientJs />
                {/* <PagesDynamic /> */}
                {/* <DefinitionInjection /> */}
                <Plugins />
            </TopicList>
        </main>
    </>
    );
Page.Render();
