import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import url from 'node:url'
import { spawnSync } from 'node:child_process'

import { Page } from '@nakedjsx/core/page'
import { addContext, getContext, renderNow } from '@nakedjsx/core/jsx'

export const Example =
    ({ captureOutput, buildFlags, children }) =>
    {
        buildFlags = buildFlags || [];

        const cache = Page.GetCache('nakedjsx.github.io/documentation/example');

        //
        // Provide a way for the Src tags to
        // pass their file contents back here.
        //
        // The Src tags could write the files to the tmp src
        // dir themselves, but collating them here allows us
        // to implement a memory cache of the outputs.
        //

        const sourceFiles = {};
        addContext({ sourceFiles });

        //
        // We need to force child Src tags to render immediately,
        // so that data has been fed back via the context.
        //

        const sources = renderNow(children);

        //
        // Create a cache key from the filenames and their
        // expected contents.
        //

        let cacheKey = `CAPTURE[${captureOutput ? captureOutput.join() : ''}],FLAGS[${buildFlags.join()}]`;
        for (const [filename, { lang, content }] of Object.entries(sourceFiles))
            cacheKey += `,SOURCE[${filename},${lang},${content}]`;

        let result = cache.get(cacheKey);
        if (!result)
        {
            const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'example-'));
            const src = path.join(tmp, 'src');
            const out = captureOutput ? Page.GetOutputPath(path.join(...captureOutput)) : path.join(tmp, 'out');

            for (const [filename, { content }] of Object.entries(sourceFiles))
            {
                const sourceFilePath = path.join(tmp, filename);
                if (!sourceFilePath.startsWith(tmp + path.sep))
                    throw Error(`Example.Src attempting to create file ${sourceFilePath} outside of ${tmp}`);
                
                fs.mkdirSync(path.dirname(sourceFilePath), { recursive: true });
                fs.writeFileSync(sourceFilePath, content);
            }

            spawnSync(
                'npx',
                ['nakedjsx@test', src, '--out', out, '--quiet', '--pretty'],
                {
                    cwd: tmp,
                    stdio: 'inherit'
                });

            //
            // We should now have output files
            //

            function *findFiles(root, subdir = '')
            {
                for (const entry of fs.readdirSync(path.join(root, subdir), { withFileTypes: true }))
                {
                    if (entry.isFile())
                        yield path.join(subdir, entry.name);
                    else if (entry.isDirectory())
                        yield * findFiles(root, path.join(subdir, entry.name));
                }
            }

            result =
                [...findFiles(out)].map(
                    filename =>
                    {
                        let lang = '';

                        if (filename.endsWith('.html'))
                            lang = 'html';
                        else if (filename.endsWith('.css'))
                            lang = 'css';
                        else if (filename.endsWith('.js'))
                            lang = 'javascript';

                        const content = fs.readFileSync(path.join(out, filename)).toString();
                        return  {
                                    lang,
                                    filename,
                                    content
                                };
                    });
            
            cache.set(cacheKey, result);
        }

        return  <>
                    {sources}
                    {result.map(
                        ({ lang, filename, content }) =>
                        {
                            if (lang === 'html' && captureOutput)
                            {
                                // Convert output folder to URI path
                                const filePath  = path.sep + path.join(...captureOutput, filename);
                                const uriPath   = url.pathToFileURL(filePath).pathname.slice(1);

                                return  <Code lang={lang} title={`out/${filename}`} uri={uriPath} uriText="(open page in new tab)">{
                                            content
                                        }</Code>
                            }
                            
                            return  <Code lang={lang} title={`out/${filename}`}>{
                                        content
                                    }</Code>
                        }
                        )}
                </>;
    }

Example.Src =
    ({ hidden, lang, filename, children }) =>
    {
        const content = children[0];

        if (children.length != 1 || typeof content != 'string')
            throw Error(`Example.Src tag requires a single string child to set as file contents of ${filename}`);
        
        //
        // Pass the code back to the <Example> tag via context
        //

        const { sourceFiles } = getContext();
        sourceFiles[filename] =
            {
                lang,
                content
            };

        if (!hidden)
            return <Code lang={lang} title={filename}>{children[0]}</Code>
    }
