import { Topic, Inline, Shell, Fixed, Tag, Inset } from "$SRC/common.jsx";

export default
    () =>
    <Topic name="Plugins" path="plugins">
        <p>
            Plugins can be enabled by passing <Shell>{'--plugin <alias> <plugin-package-name-or-path>'}</Shell> on
            the command line.
        </p>
        <p>
            Each plugin loaded must be given a unique alias. For an asset import plugin, the alias correspondes to the
            label between <Inline>::</Inline> characters in an asset import string.
        </p>
        <p>
            The <Shell>npx nakedjsx</Shell> command bundles in <Fixed>@nakedjsx/plugin-asset-image</Fixed> and <Fixed>@nakedjsx/plugin-asset-prism</Fixed>,
            but other plugins need to be installed either globally (<Shell>npm install -g</Shell>) or locally
            (<Shell>npm install</Shell>) in the project source directory or a parent of it. You can also pass a path to
            a JavaScript file that implements the plugin interface.
        </p>

        <Topic  name="@nakedjsx/plugin-asset-image"
                path="@nakedjsx/plugin-asset-image"
                indexUrl="plugin/@nakedjsx/plugin-asset-image"
                noBackToTop noCopyLink
        >
            <p>
                Generate a <Tag>picture</Tag> HTML tag with multi-resolution webp & jpeg sourcesets from an image file.
            </p>
            <p>
                <a href="plugin/@nakedjsx/plugin-asset-image">Documentation for @nakedjsx/plugin-asset-image</a>.
            </p>
        </Topic>

        <Topic  name="@nakedjsx/plugin-asset-prism"
                path="@nakedjsx/plugin-asset-prism"
                indexUrl="plugin/@nakedjsx/plugin-asset-prism"
                noBackToTop noCopyLink
        >
            <p>
                Provides a <Tag>PrismCode</Tag> tag that uses <a href="https://prismjs.com">Prism</a> to
                render source code to HTML with syntax highlighting, and an optional CSS theme that handles
                both light and dark modes. Handy for creating technical documentation sites.
            </p>
            <p>
                <a href="plugin/@nakedjsx/plugin-asset-prism">Documentation for @nakedjsx/plugin-asset-prism</a>.
            </p>
        </Topic>

        <Topic  name="@nakedjsx/plugin-asset-mdx"
                path="@nakedjsx/plugin-asset-mdx"
                indexUrl="plugin/@nakedjsx/plugin-asset-mdx"
                noBackToTop noCopyLink
        >
            <p>
                This plugin allows MDX files to be imported and used as JSX tags within NakedJSX Pages.
            </p>
            <p>
                <a href="plugin/@nakedjsx/plugin-asset-mdx">Documentation for @nakedjsx/plugin-asset-mdx</a>.
            </p>
        </Topic>

        <Topic  name="Plugin Development Guide"
                path="plugin-development-guide"
                indexUrl="plugin-development-guide/"
                noCopyLink
        >
            <p>
                Development of asset plugins is straightforward. Create project specific plugins, or publish them
                in <Fixed>npm</Fixed> packages for others to use.
            </p>
            <p>
                <a href="plugin-development-guide/">Plugin development guide</a>.
            </p>
        </Topic>
    </Topic>