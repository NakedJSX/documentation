import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import url from 'node:url'
import { spawnSync } from 'node:child_process'

import { Page } from '@nakedjsx/core/page'

import { Code } from './common.jsx'

function relativePathToUriPath(relativePath)
{
    //
    // Convert some/path and some\path to some/path
    //
    // This is a bit convoluted due to windows paths.
    //

    const rootUriPath   = url.pathToFileURL(path.sep).pathname;
    const uriPath       = url.pathToFileURL(path.sep + relativePath).pathname.slice(rootUriPath.length);

    return uriPath;
}

const exampleBuildCache = Page.CacheMapGet(import.meta.url.href);

export const Example =
    ({ captureOutput, wordwrapOutput, buildFlags, context, children }) =>
    {
        buildFlags = buildFlags || ['--pretty'];

        if (captureOutput)
            captureOutput = path.join(...captureOutput);

        //
        // Provide a way for the Src tags to
        // pass their file contents back here.
        //
        // The Src tags could write the files to the tmp src
        // dir themselves, but collating them here allows us
        // to implement a memory cache of the outputs.
        //

        const sourceFiles = {};
        context.sourceFiles = sourceFiles;

        //
        // Make the build command used to any <Example.BuildCmd> child
        //

        const npxArgs = ['nakedjsx', 'src', '--out', 'out', '--quiet', ...buildFlags];
        context.buildCommand = 'npx';
        for (const segment of npxArgs)
            if (segment === '--quiet') // this isn't relevant to the reader
                continue;
            else
                context.buildCommand += ' ' + segment;

        //
        // We need to force child Src tags to render immediately,
        // so that data has been fed back via the context.
        //

        const sources = Page.EvaluateNow(children);

        //
        // Create a cache key from the filenames and their
        // expected contents.
        //

        let cacheKey = `CAPTURE[${captureOutput ? Page.GetOutputPath(captureOutput) : ''}],BUILD[${context.buildCommand}]`;
        for (const [filename, { lang, content }] of Object.entries(sourceFiles))
            cacheKey += `,SOURCE[${filename},${lang},${content}]`;

        let result = exampleBuildCache.get(cacheKey);
        if (!result)
        {
            const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'example-'));
            const src = path.join(tmp, 'src');
            const out = captureOutput ? Page.GetOutputPath(captureOutput) : path.join(tmp, 'out');

            // Update the build command input and output folders
            npxArgs[1] = src;
            npxArgs[3] = out;

            for (const [filename, { content }] of Object.entries(sourceFiles))
            {
                const sourceFilePath = path.join(tmp, filename);
                if (!sourceFilePath.startsWith(tmp + path.sep))
                    throw Error(`Example.Src attempting to create file ${sourceFilePath} outside of ${tmp}`);
                
                fs.mkdirSync(path.dirname(sourceFilePath), { recursive: true });
                fs.writeFileSync(sourceFilePath, content);
            }

            const spawnOptions =
                {
                    cwd: tmp,
                    stdio: 'inherit'
                };

            let spawnResult = spawnSync('npx', npxArgs, spawnOptions);
            if (spawnResult.error)
            {
                if (spawnResult.error.code === 'ENOENT' && spawnResult.error.path === 'npx')
                {
                    //
                    // Node on windows requires npx.cmd -- but i'm not sure if this is true
                    // for all Node.js Windows runtimes, perhaps WSL is different.
                    //
                    // So for now the approach is to try 'npx', look for specific error
                    // details and try 'npx.cmd' if they match
                    //

                    spawnResult = spawnSync('npx.cmd', npxArgs, spawnOptions);
                    if (spawnResult.error)
                        throw spawnResult.error;
                }
                else
                    throw spawnResult.error;
            }

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
            
            exampleBuildCache.set(cacheKey, result);
        }

        function truncateIfNeeded(content)
        {
            const charLimit = 2000;
            const lineLimit = 60;
            const truncatedSuffix = '...\n\n(content too large to display in full)';

            if (content.length > charLimit)
                content = content.substring(0, charLimit - truncatedSuffix.length) + truncatedSuffix;

            let lineCount = 1;
            for(var i = 0; i < content.length; ++i)
                if(content[i] === '\n')
                    if (++lineCount >= lineLimit)
                        return content.substring(0, i + 1) + truncatedSuffix;
            
            return content;
        }

        return  <>
                    {sources}
                    {result.map(
                        ({ lang, filename, content }) =>
                        {
                            //
                            // Convert output folder to URI path.
                            //
                            // This is a bit convoluted due to windows paths.
                            //

                            const title = 'out/' + relativePathToUriPath(filename);

                            if (captureOutput)
                            {
                                const uriPath = relativePathToUriPath(path.join(captureOutput, filename));

                                if (lang === 'html' || lang === 'css' || lang === 'js')
                                    content = truncateIfNeeded(content);
                                else
                                    content = '(no preview available)';

                                return <Code wordwrap={wordwrapOutput} lang={lang} title={title} uri={uriPath} uriTarget="_blank" uriText="(open in new tab)">{content}</Code>
                            }
                        })}
                </>;
    }

Example.BuildCmd =
    ({ context }) =>
    {
        return <Code lang="shell" title="# shell" copyLink="(copy cmd)">$ {context.buildCommand}</Code>
    }

Example.Src =
    ({ hidden, lang, filename, context, content, children }) =>
    {
        //
        // A source can be supplied as a single string child,
        // or as a string or Buffer content prop.
        //

        if (!content)
        {
            if (children.length != 1 || typeof children[0] != 'string')
                throw Error(`Example.Src tag requires either a content prop or single string child to set as file contents of ${filename}`);

            content = children[0];
        }
        
        //
        // Pass the code back to the <Example> tag via context
        //

        const { sourceFiles } = context;
        sourceFiles[filename] =
            {
                lang,
                content
            };

        if (hidden)
            return;
        
        if (typeof content === 'string')
            return <Code lang={lang} title={filename} copyLink="(copy code)">{content}</Code>
        else
            return <Code title={filename}>(no preview available)</Code>
    }

