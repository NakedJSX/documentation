import { Page } from '@nakedjsx/core/page';

import { Inset, ReturnToDocLink, Logo, Fixed, Code, Inline, Shell, Analytics } from '$SRC/common.jsx';
import { Example } from '$SRC/example.jsx';

import prismTheme from ':raw:@nakedjsx/plugin-asset-prism/theme.css';

const titleSuffix   = "Using JSX with jQuery";
const description   = "You can use JSX with jQuery if you build your client JavaScript with NakedJSX.";
const canonicalUrl  = 'https://nakedjsx.org/documentation/cookbook/jquery/';

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
    <>
        <main>
            <h1><Logo /> {titleSuffix}</h1>
            <Inset><p>{description}</p></Inset>
            <p><ReturnToDocLink href="../../" /></p>
            <p>JSX elements and fragments can be passed directly to jQuery functions such as <Inline lang="js">.append()</Inline>:</p>
            <Code lang="jsx">{
`$('body').append(
    <p css="color: fuchsia">
        jQuery ❤️ NakedJSX!
    </p>
    );`
            }</Code>
            <p>Here is a complete example that retrieves and displays cat facts from <a href="https://catfact.ninja/fact">https://catfact.ninja/fact</a>.</p>
            <Example buildFlags={[]} captureOutput={['example']} wordwrapOutput>
                <p>First we have a file named <Fixed>src/index-client.jsx</Fixed>, which NakedJSX treats as client JavaScript for a HTML file called <Fixed>index.html</Fixed>:</p>
                <Example.Src lang="jsx" filename="src/index-client.jsx">{
`const catFactApi = "https://catfact.ninja/fact";

const CatFactError =
    ({ children }) =>
    <p css="color: red">
        {children}
    </p>

function getCatFact()
{
    // Disable the button and set a temporary status message
    $("#fact-get").prop('disabled', true);
    $("#fact")
        .empty()
        // Passing a JSX element to jQuery works
        .append(<p>Retrieving cat fact ...</p>);

    // Retrieve a cat fact using jQuery
    $.ajax(
        {
            url: catFactApi,
            success:
                function({ fact })
                {
                    // Re-enable the button and display the fact
                    $("#fact-get").prop('disabled', false);
                    $("#fact")
                        .empty()
                        // Passing a JSX fragment to jQuery also works
                        .append(
                            <>
                                <p>According to {catFactApi}:</p>
                                <p css="margin: inherit 16px">{fact}</p>
                            </>
                            );
                },
            error:
                function(result)
                {
                    // Re-enable the button and display an error
                    $("#fact-get").prop('disabled', false);
                    $("#fact")
                        .empty()
                        // Passing JSX functions to jQuery works too.
                        .append(<CatFactError>oh no, error getting cat fact</CatFactError>);
                },
        });
}` 
                }</Example.Src>
                <p>
                    Then we have <Fixed>src/index-page.jsx</Fixed>, which NakedJSX uses to build the <Fixed>index.html</Fixed> HTML file:
                </p>
                <Example.Src lang="jsx" filename="src/index-page.jsx">{
`import { Page } from '@nakedjsx/core/page'

const Head =
    () =>
    <>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js" />
    </>

const Body =
    () =>
    <>
        <h1>jQuery plus NakedJSX</h1>
        <p>This example demonstrates that jQuery and NakedJSX work well together.</p>
        <button id="fact-get" onClick="getCatFact()">Get Cat Fact NOW!</button>
        <div id="fact" />
    </>

Page.Create('en');
Page.AppendHead(<Head />);
Page.AppendCss(\`
    html { font-family: sans-serif }
    body { font-size: 1.25rem; max-width: 40ch; margin: 0 auto; padding: 16px; }
    \`);
Page.AppendBody(<Body />);
Page.Render();`
                }</Example.Src>
                <p>With these files created, if you have Node.js installed, you can now build them into a folder called <Fixed>out</Fixed> by running an npx command from the parent directory:</p>
                <Example.BuildCmd />
                <p>The result is a single file <Fixed>out/index.html</Fixed>, which contains HTML, CSS, and JavaScript built from the above code. The compiled result is visible below, and you can <a href="example/">test it in your browser</a>.</p>
                <p>(Note: a minority of facts in the cat facts database appear to have some encoding issues and may display an excess of slashes or quotes. This is a data problem, not a problem with NakedJSX.)</p>
                <p>
                    By adding <Shell>--dev</Shell> to the build command, you can launch a development build and web server that will automatically reload your browser as you save changes.
                </p>
            </Example>
            <p><ReturnToDocLink href="../../" /></p>
        </main>
    </>
    );
Page.Render();
