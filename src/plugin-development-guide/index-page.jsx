import { Page } from '@nakedjsx/core/page';

import { Logo, Code, Inline, Tag, Analytics, Inset, Topic, Toc, ReturnToDocLink } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

import circleSvgSrc from ':raw:$ASSET/circle.svg';

const titleSuffix   = "Plugin Development Guide";
const description   = "Development of NakedJSX plugins is straightforward. Create project specific plugins in your source directory, or publish them as npm packages for others to use.";
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
        <Toc />
        <Topic name="Overview" path="overview" noBackToTop>
            <p>
                A NakedJSX plugin is an ESM JavaScript file with a default function export
                responsible for initialising the plugin and registering it with NakedJSX.
            </p>
            <p>
                Currently, asset import plugins are the only kind of plugin that NakedJSX supports.
            </p>
        </Topic>
        <Topic name="Asset Plugins" path="asset-plugins">
            <p>
                Asset plugins replace the default NakedJSX behaviour when an
                asset file is added to a build via a JavaScript import statement.
            </p>
            <p>
                An asset import statement that utilises a plugin looks like this:
            </p>
            <Code lang="javascript">{
                `import someAsset from ':<plugin alias>:path/to/asset.file';`
            }</Code>
            <p>
                Where <Inline>{`<plugin alias>`}</Inline> is the alias assigned to the plugin
                on the build command line (or config file).
            </p>
            <Topic name="Boilerplate Code" path="asset-boilerplate-code">
                <p>
                    Here is the boilerplate code for an asset import plugin:
                </p>
                <Code lang="javascript" title="my-asset-plugin.mjs" copyLink="(copy code)">{`
                    export default async function({ logging, register })
                    {
                        // NakedJSX provides access to its logging functions
                        const { log, warn, err, fatal } = logging;

                        //
                        // *** Optional initialisation can go here **
                        //

                        // Let NakedJSX know what sort of plugin it is.
                        register(
                            {
                                // At the moment, asset plugins are the only valid type.
                                type: 'asset',

                                //
                                // Asset plugins are expected to provide an 'importAsset' function.
                                // This may be relaxed in future if the asset plugin system is
                                // extended to support other functionality.
                                //

                                async importAsset(context, asset)
                                {
                                    //
                                    // *** Asset import implementation goes here ***
                                    //

                                    //
                                    // Return JavaScript code exporting whatever results we
                                    // want to pass to the importing code:
                                    //

                                    return 'export default "Hello boilerplate!";';
                                }
                            });
                    }
                `}</Code>
            </Topic>
            <Topic name="Example: Asset File Details Plugin" path="example-asset-file-details-plugin">
                <p>
                    Here is a simple plugin that adds an asset file to the built output normally,
                    but suppliments the returned asset output href with original filename, size,
                    and modification date information.
                </p>
                <Example buildFlags={['--plugin', 'file-details', 'src/file-details.mjs', '--pretty']} captureOutput={['example', 'file-details']}>
                    <p>
                        The example asset file is a small SVG file that we want to add to the build:
                    </p>
                    <Example.Src lang="svg" filename="src/circle.svg">{circleSvgSrc}</Example.Src>
                    <p>
                        The plugin implemenation is a single JavaScript file in the project source directory:
                    </p>
                    <Example.Src lang="javascript" filename="src/file-details.mjs">{`
                        import fsp from 'node:fs/promises';
                        import path from 'node:path';

                        export default async function({ register })
                        {
                            register(
                                {
                                    type: 'asset',

                                    async importAsset(context, asset)
                                    {
                                        // Copy the imported file to the build output
                                        const outputFile    = await context.hashAndCopyAsset(asset.file);
                                    
                                        // Obtain a href/src reference to the output file that pages can use
                                        const outputHref    = await context.assetUriPath(outputFile);
                                    
                                        // Gather the size and modification date of the original file
                                        const stats         = await fsp.stat(asset.file);
                                    
                                        // Assemble the object that the importing code will recieve
                                        const importResult =
                                            {
                                                href:       outputHref,
                                                name:       path.basename(asset.file),
                                                size:       stats.size,
                                                modified:   stats.mtime.toUTCString()
                                            };
                                    
                                        // Generate JavaScript code exporting importResult to the importing code
                                        return \`export default \${JSON.stringify(importResult)}\`;
                                    }
                                });
                        }
                    `}</Example.Src>
                    <p>
                        Then we have a page that imports our SVG file via our plugin, and displays
                        it along with the stats gathered by the plugin:
                    </p>
                    <Example.Src lang="javascript" filename="src/index-page.jsx">{`
                        import { Page } from '@nakedjsx/core/page'

                        //
                        // Import the SVG asset via our plugin. circleAsset will be set
                        // to the 'importResult' object exported by the plugin.
                        //

                        import circleAsset from ':file-details:./circle.svg'

                        Page.Create('en');
                        Page.AppendHead(<meta name="viewport" content="width=device-width, initial-scale=1.0" />);
                        Page.AppendBody(
                            <>
                                <h1>Plugin Development Guide - Hello Plugin</h1>
                                <figure>
                                    <img src={circleAsset.href} />
                                    <figcaption>
                                        <div css={\`
                                            display: grid;
                                            grid-template-columns: max-content max-content;
                                            gap: 0 16px
                                        \`}>
                                            File:       <span>{circleAsset.name}</span>
                                            Size:       <span>{circleAsset.size} bytes</span>
                                            Modified:   <span>{circleAsset.modified}</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </>
                        );
                        Page.Render();
                    `}</Example.Src>
                    <p>
                        Because we're building with a plugin, we need to modify our build command (or project config file)
                        to tell NakedJSX that we want to use our plugin. This is also how we tell NakedJSX what 'alias' we
                        want to use to refer to our plugin (file-details):
                    </p>
                    <Example.BuildCmd/>
                    <p>
                        After running the build commend, the SVG file has been copied to the output directory, with a hash
                        in the filename. The HTML file contains an <Tag>img</Tag> tag that uses
                        the <Inline>href</Inline> returned by the plugin as its <Inline>src</Inline>. The <Tag>figcaption</Tag> tag
                        contains a little table of file information returned by the plugin.
                    </p>
                </Example>
            </Topic>
            <Topic name="API" path="api">
                <p>
                    The <Inline>importAsset(context, asset)</Inline> function is passed two objects containing useful
                    functions and data:</p>
                <p><Code lang="javascript">{`
                    async importAsset(context, asset)
                    {
                        const {
                            hashAndCopyAsset,   // async hashAndCopyAsset(sourceFilepath) -- return outputFilename
                            hashAndMoveAsset,   // async hashAndMoveAsset(sourceFilepath) -- return outputFilename
                            assetUriPath,       // async assetUriPath(outputFilename) -- return href/src
                            mkdtemp,            // async mkdtemp() -- create a new temporary dir and return the absolute path to it
                        } = context;

                        const {
                            id,                 // An ID representing this import and others like it
                            file,               // Absolute path to source asset file
                            optionsString       // A URL style (?key=value&...) query string, if one was used
                        } = asset;
                    }
                `}</Code></p>
                <p>
                    The <Inline>importAsset</Inline> function must return a string containing JavaScript
                    code that exports functions and / or data to the importing code. The returned code may contain
                    inline JSX and may freely import its own depenencies.
                </p>
            </Topic>
        </Topic>
        <p><ReturnToDocLink href="../" /></p>
    </main>
    );
Page.Render();


    //
    // Context contains useful functions (all are async):
    //
    // hashAndMoveAsset:    Moves a file to the build output, inserting a hash
    //                      of the file content in the filename, and return the
    //                      output filename.
    //
    // hashAndCopyAsset:    Copies a file to the build output, inserting a hash
    //                      of the file content in the filename, and return the
    //                      output filename.
    //
    // assetUriPath:        Given an output filename, return a placeholder URI
    //                      path that will later be converted to a relative path
    //                      from any page that imports the asset.
    //
    // mkdtemp:             Create a temporary folder.
    //

    //
    // asset contains information about the requested import:
    //
    // id:              the import string converted to absolute path,
    //                  (':<plugin-alias>:<PATH TO BUILD FOLDER>/src/circle.svg')
    //
    // file:            absolute path to the imported file,
    //                  ('<PATH TO BUILD FOLDER>/src/circle.svg')
    //
    // optionsString:   any options passed via ?key=val URI style query string,
    //                  not used and therefore empty in this example
    //