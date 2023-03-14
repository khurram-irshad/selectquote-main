import { createLinkFromMatches, createSpanFromMatches } from "./createElements"

export const addColour = (children = []) => {
    // flatMap returns a flattened array - very useful
    const mappedChildren = children?.flatMap(child => {
        if (typeof child === "string") {
            // the regex that handles parsing the actual string and extracting the text
            const matches = child.match(/\((.+)\)(?=\[(#\w+)\])/)
            if (matches) {
                return createSpanFromMatches(matches, child)
            }
        }
        if (typeof child === "object") {
            const isHyperlink = child?.props?.nodeType === 'hyperlink';
            let content;
            if (isHyperlink) {
                content = child?.props?.content[0].value;
            } else {
                content = child.props?.children;
            }
            const className = child.props?.className
            const matches = typeof content === "string" && content.match(/\((.+)\)(?=\[(#\w+)\])/)
            if (matches && isHyperlink) {
                return createLinkFromMatches(matches, child?.props, { className })
            } else if (matches) {
                return createSpanFromMatches(matches, content, { className })
            }

        }
        // make sure to always return the content if there is no match to the regex
        return child
    })
    return mappedChildren
}