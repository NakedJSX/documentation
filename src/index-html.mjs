import { Page } from '@nakedjsx/core/page';

import GettingStarted from './topic/getting-started.jsx';
import DevServer from './topic/dev-server.jsx';
import JsxUsing from './topic/jsx-using.jsx';
import CssScoped from './topic/css-scoped.jsx';
import CssNested from './topic/css-nested.jsx';
import CssCommonFile from './topic/css-common-file.jsx';

import AssetsIntroduction from './topic/asset-introduction.jsx';
import ConfigFile from './topic/config-file.jsx';
import JsxRefs from './topic/jsx-refs.jsx';
import PagesDynamic from './topic/pages-dynamic.jsx';
import ClientJsIntroduction from './topic/client-js-introduction.jsx';
import ClientJsJsx from './topic/client-js-jsx.jsx';
import DefinitionInjection from './topic/definition-injection.jsx';
import PluginNakedjsxAssetImage from './topic/plugin-nakedjsx-asset-image.jsx';
import PluginNakedjsxAssetPrism from './topic/plugin-nakedjsx-asset-prism.jsx';
import PluginCustomAsset from './topic/plugin-custom-asset.jsx';

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
            <p>NakedJSX builds static HTML files from JavaScript and JSX.</p>
            <p>This page was built by NakedJSX. <a href={'https://github.com/NakedJSX/documentation/blob/main/src/index-html.mjs'}>You can look at the source</a>.</p>
            <Toc />
            <TopicList>
                <GettingStarted />
                <DevServer />
                <JsxUsing />
                <CssScoped />
                <CssNested />
                <AssetsIntroduction />
                {/* <CssCommonFile /> */}

                {/* <ConfigFile /> */}
                {/* <JsxRefs /> */}
                {/* <PagesDynamic /> */}
                <ClientJsIntroduction />
                <ClientJsJsx />
                {/* <DefinitionInjection /> */}
                {/* <PluginNakedjsxAssetImage /> */}
                {/* <PluginNakedjsxAssetPrism /> */}
                {/* <PluginCustomAsset /> */}
            </TopicList>
        </main>
    </>
    );
Page.Render();
