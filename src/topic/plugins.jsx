import c64c_640 from ':raw:$ASSET/c64c_640.jpeg?as=Buffer'

export default
    () =>
    <Topic name="Plugins" path="plugins">
        <p>
            Plugins can be enabled by passing <Inline lang="shell">{'--plugin <alias> <plugin-package-name-or-path>'}</Inline> on
            the command line.
        </p>
        <p>
            Each plugin loaded must be given a unique alias. For an asset import plugin, the alias correspondes to the
            label between <Inline>::</Inline> in an asset import string.
        </p>
        <p>
            Asset import plugins are currently the only supported type of plugin.
        </p>

        <Topic name="@nakedjsx/plugin-asset-image" path="@nakedjsx-plugin-asset-image">
            <p>
                Generate a <Inline>{'<picture>'}</Inline> tag with webp & jpeg sourcesets from an image asset.
            </p>
            <p>
                Use of this plugin currently requires that GraphicsMagick is installed and
                that the <Inline>gm</Inline> command is in the path. Support for ImageMagick
                will be added.
            </p>
            <p>
                By default, it is assumed that source images are at 2x resolution for high-dpi displays and scaled
                desktop resolutions. It is possible to override this by passing <Inline>srcDensity=x</Inline> on
                the import query string. <Inline>sd</Inline> can be used as a short form of <Inline>srcDensity</Inline>.
            </p>
            <p>
                The plugin will then generate jpeg and webp image assets at 1x and 2x resolutions. If the source
                density is lower than 2, then it will not generate 2x assets.
            </p>
            <p>
                It is possible to request a different set of destination images by specifying multiple <Inline>dstDensity=x</Inline> options
                on the import query string. <Inline>dd=x</Inline> can be used as a short form.
            </p>
            <p>
                The display width and display height are calculated based on the source asset dimensions and the <Inline>srcDensity</Inline>.
                For example, a 640 pixel wide 2x image will display at the same width as a 320 pixel wide 1x image, but will be up to twice as
                detailed on displays that support it.
            </p>
            <Example buildFlags={['--plugin', 'image', '@nakedjsx/plugin-asset-image', '--pretty']} captureOutput={['example', 'plugins', '@nakedjsx', 'plugin-asset-image']}>
                <Example.Src filename="src/c64c_640.jpeg" content={c64c_640} />
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'
import { Image } from '@nakedjsx/plugin-asset-image/jsx'

import c64c_2x from ':image:./c64c_640.jpeg'

Page.Create('en');
Page.AppendHead(<meta name="viewport" content="width=device-width, initial-scale=1.0" />);
Page.AppendCss(\`
    h1 {
        text-align: center;
    }
    img {
        display: block;
        margin: 0 auto;
    }
    \`);
Page.AppendBody(
    <>
        <h1>@nakedjsx/plugin-asset-image</h1>
        <Image src={c64c_2x} alt="Photo of a Commodore 64C"/>
    </>
);
Page.Render();`
                }</Example.Src>
                <Example.BuildCmd/>
            </Example>
        </Topic>

        <Topic name="@nakedjsx/plugin-asset-prism" path="@nakedjsx-plugin-asset-prism">
            <p>
                Good use cases for NakedJSX include technical documentation (like this page) and static blog generation.
                Therefore NakedJSX provides an official plugin for formatting source code at build time using <a href="https://prismjs.com">Prism</a>.
            </p>
            <p>
                A Prism theme that automatically handles light/dark mode is also provided.
            </p>
            <p>
                Here is an example that displays its own source code formatted using Prism:
            </p>
            <Example buildFlags={['--plugin', 'prism', '@nakedjsx/plugin-asset-prism', '--pretty']} captureOutput={['example', 'plugins', '@nakedjsx', 'plugin-asset-prism']}>
                <Example.Src lang="javascript" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page';
import { PrismCode } from '@nakedjsx/plugin-asset-prism/jsx';

import prismTheme from '::@nakedjsx/plugin-asset-prism/theme.css';
import selfSource from ':raw:./index-page.jsx'

const Code =
    ({ lang, children }) =>
    <pre className={\`language-\${lang ?? ''}\`}><code><PrismCode lang={lang} code={children.join('')} /></code></pre>

Page.Create('en');
Page.AppendHead(
    <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={prismTheme} />
    </>
    );
Page.AppendBody(
    <>
        <h1>@nakedjsx/plugin-asset-image</h1>
        <p>Try changing between light and dark mode in your OS settings.</p>
        <p>Here is the source code of this Example:</p>
        <Code lang="jsx">{selfSource}</Code>
    </>
);
Page.Render();`
                }</Example.Src>
                <Example.BuildCmd/>
            </Example>
        </Topic>

        <Topic name="Custom Plugins" path="plugin-custom-asset">
            <p>TODO: Document how to build your custom asset import plugins.</p>
        </Topic>
    </Topic>