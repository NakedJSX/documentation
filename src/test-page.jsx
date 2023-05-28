import { Page } from '@nakedjsx/core/page'

const Heading =
    ({ depth, children, ...props }) =>
    {
        if (depth == 1)
            return <h1 {...props}>{children}</h1>
        if (depth == 2)
            return <h2 {...props}>{children}</h2>
        if (depth == 3)
            return <h3 {...props}>{children}</h3>
        if (depth == 4)
            return <h4 {...props}>{children}</h4>
        if (depth == 5)
            return <h5 {...props}>{children}</h5>
        else
            return <h6 {...props}>{children}</h6>
    }

const Section =
    ({ title, context, children }) =>
    {
        // Start a depth of 2, and increment for each nested section.
        context.depth = context.depth ? context.depth + 1 : 2;

        // Keep a reference to the parent counter so we can update it later
        const parentCounter = context.counter;

        // Provide a fresh counter to children
        context.counter = { count: 0 };
        
        // Execute children tag implementations now
        children = Page.EvaluateNow(children);

        // Any children will have updated the context counter we provided
        const subsectionCount = context.counter.count;

        // If we are a child, set the parent count
        if (parentCounter)
            parentCounter.count += subsectionCount + 1;

        return  <div css={`margin-left: 48px`}>
                    <Heading depth={context.depth}>{title}</Heading>
                    This section has {subsectionCount} subsection{subsectionCount != 1 && 's'}.
                    {children}
                </div>
    }

Page.Create('en');
Page.AppendBody(
    <>
        <h1>Context</h1>
        <Section title="h2: Section 1">
            <Section title="h3: Section 1.1">
                <Section title="h4: Section 1.1.1" />
                <Section title="h4: Section 1.1.2">
                    <Section title="h5: Section 1.1.2.1" />
                </Section>
            </Section>
            <Section title="h3: Section 1.2">
            </Section>
        </Section>
        <Section title="h2: Section 2">
        </Section>
    </>
);
Page.Render();