import { Topic } from "$SRC/common.jsx";

export default
    () =>
    <Topic name="Cookbook" path="cookbook">
        <Topic name="Using JSX with jQuery" path="jquery" indexUrl="cookbook/jquery/" noBackToTop>
            <p>
                With NakedJSX, you can pass inline JSX directly to jQuery functions.
                See the <a href="cookbook/jquery/">NakedJSX jQuery cookbook entry</a> for an example.
            </p>
        </Topic>

        {/* <Topic name="JSX Template Engine for Express" path="jquery" indexUrl="cookbook/express/">
            <p>
                NakedJSX's template engine mode can be used to live-render pages in response to Express requests.
                See the <a href="cookbook/express/">NakedJSX Template Engine for Express cookbook entry</a> for an example.
            </p>
        </Topic> */}
    </Topic>