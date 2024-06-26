# NakedJSX Documentation.

This is the source project for the [NakedJSX documentation](https://nakedjsx.org/documentation/).

NakedJSX is used to build this documentation. Fun fact - the project [implements](https://github.com/NakedJSX/documentation/blob/main/src/example.jsx) an `<Example>` JSX function that itself invokes `npx nakedjsx` to build an inline example and bring the output back into the documentation.

Building this documentation requires prior installation of [@nakedjsx/plugin-asset-mdx](https://github.com/NakedJSX/plugin-asset-mdx), as this is not bundled with `npx nakedjsx`.

To build this documentation into ./dist:

`$ npx nakedjsx <path to documentation>/src --out ./dist`

Or to build into ./dev and launch a development server:

`$ npx nakedjsx <path to documentation>/src --out ./dev --dev`