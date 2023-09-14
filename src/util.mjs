/** Trim string, then strip the first indent from all lines. */
export function fixIndent(stringOrStrings, ...templateExpressions)
{
    let code;

    //
    // First, assemble the string normally and trim it.
    //

    if (Array.isArray(stringOrStrings))
    {
        //
        // Being used as a tag function, i.e. fixIndent`() =>\n       { ...\n           // code\n       }`
        //

        const strings   = stringOrStrings;
        code            = strings[0];

        for (let i = 1; i < strings.length; i++)
        {
            code += String(templateExpressions.shift());
            code += strings[i];
        }
    }
    else
        code = stringOrStrings;

    if (!code?.trim)
        return;

    code = code.trim();

    //
    // Find the first indented line - if it's more than 4 spaces,
    // assume that we need to remove that much indent from each
    // line to fix the indent.
    //

    const leadingIndent = code.match(/^[ ]+/m);

    if (leadingIndent)
        if (leadingIndent[0].length > 4)
            return code.replaceAll(new RegExp(`^${leadingIndent[0]}`, 'mg'), '');
    
    return code;
}