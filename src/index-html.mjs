import { Page } from '@nakedjsx/core/page';

import HelloNakedJSX from './topic/hello-nakedjsx.jsx';
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
import Acknowledgements from './topic/acknowledgements.jsx';

import { Toc, TopicList, Topic, Fixed, Code, Inline } from './common.jsx';
import { Example } from './example.jsx';

import logo from ':raw:logo.svg'

const repo = 'https://github.com/NakedJSX/documentation';
const site = 'https://nakedjsx.github.io/documentation';

import { addContext } from '@nakedjsx/core/jsx';
const Test =
    ({ children }) =>
    {
        addContext({ plppr: 'haha' });
        return children;
    }

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
    </>
    );
Page.AppendBody(
    <>
        <main>
            <h1 css="& svg { display: inline }"><raw-content content={logo} /> Documentation</h1>
            <p>NakedJSX builds static HTML files from JavaScript and JSX.</p>
            <p>It also supports:</p>
            <ul>
                <li>Scoped &amp; nested CSS</li>
                <li>Use of JSX in client JavaScript</li>
                <li>Generation of static pages from build-time data</li>
                <li>Asset handling via import statements</li>
                <li>Image sourceset generation (via official plugin)</li>
                <li>A live-refresh development server</li>
                <li>More ...</li>
            </ul>
            <p>This documentation was built by NakedJSX. You can look at the source at <a href={repo}>{repo.replace('https://', '')}</a>.</p>
            <Test>
                <Toc />
            </Test>
            <TopicList>
                <HelloNakedJSX />
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

                <Acknowledgements />
            </TopicList>
        </main>
        <script src="https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js"></script>
	    <script src="https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    </>
    );
Page.Render();
