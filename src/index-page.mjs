import { Page } from '@nakedjsx/core/page';

import HelloWorld from './topic/hello-world.jsx';
import DevelopmentTools from './topic/tools.jsx';
import JsxUsing from './topic/jsx.jsx';
import CssUsing from './topic/css.jsx';
import Assets from './topic/assets.jsx';
import ClientJs from './topic/client-js.jsx';
import MultiplePages from './topic/multiple-pages.jsx';
import Plugins from './topic/plugins.jsx';



import { Toc, TopicList, Topic, Fixed, Code, Inline, Inset, Tag, Analytics } from './common.jsx';
import { Example } from './example.jsx';

import logo from ':raw:$ASSET/logo.svg';
import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const title = "NakedJSX Documentation";
const description = "NakedJSX documentation."

//
// Rather than require each topic import the tags it needs,
// add them all to the global scope.
//

Object.assign(global, { Topic, Fixed, Code, Inline, Inset, Tag, Example });

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://nakedjsx.org/documentation"></meta>
        <meta property="og:title" content={`NakedJSX - ${title}`}></meta>
        <meta property="og:description" content={description}></meta>
        <title>{title}</title>
        <Analytics />
    </>
    );
Page.AppendCss(prismTheme);
Page.AppendBody(
    <>
        <main>
            <h1><raw-content content={logo} /> Documentation</h1>
            <p>Here you will find a detailed walkthrough of NakedJSX features.</p>
            <Inset>For a high-level overview, please visit <a href="https://nakedjsx.org">nakedjsx.org</a>.</Inset>
            <p>This page was built using NakedJSX, <a href={'https://github.com/NakedJSX/documentation/blob/main/src/index-html.mjs'}>and you can look its source</a>.</p>
            <Toc />
            <TopicList>
                <HelloWorld />
                <DevelopmentTools />
                <JsxUsing />
                <CssUsing />
                <Assets />
                <ClientJs />
                <MultiplePages />
                <Plugins />
            </TopicList>
        </main>
    </>
    );
Page.Render();
