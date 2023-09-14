import { Page } from '@nakedjsx/core/page';

import { ReturnToDocLink, Logo, Inline, Shell, Analytics, Inset } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';
import c64c_640 from ':raw:$ASSET/c64c_640.jpeg?as=Buffer';

const titleSuffix   = "Plugin - @nakedjsx/plugin-asset-image";
const description   = "Generate a HTML <picture> tag with webp & jpeg sourcesets from a single image file.";
const canonicalUrl  = 'https://nakedjsx.org/documentation/plugin/@nakedjsx/plugin-asset-image';

Page.Create('en');
Page.AppendHead(
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`NakedJSX - ${titleSuffix}`} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <title>{`NakedJSX - ${titleSuffix}`}</title>
        {!Page.IsDevelopmentMode() && <Analytics />}
    </>
    );
Page.AppendCss(prismTheme);
Page.AppendBody(
    <main>
        <h1><Logo /> {titleSuffix}</h1>
        <Inset><p>{description}</p></Inset>
        <p><ReturnToDocLink href="../" /></p>
        <p>
            Use of this plugin currently requires that GraphicsMagick is installed and
            that the <Inline>gm</Inline> command is in the path. Support for ImageMagick
            will be added.
        </p>
        <p>
            This plugin is bundled with the <Shell>npx nakedjsx</Shell> command, no installation is necessary.
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
        <p>
            Note that the plugin generated CSS containing the width and aspect-ratio of the image.
        </p>
        <p><ReturnToDocLink href="../" /></p>
    </main>
    );
Page.Render();
