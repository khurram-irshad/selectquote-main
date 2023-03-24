import { createDefaultLink, createLinkFromMatches } from "./createElements"

export const addColour = (children = []) => {
    // flatMap returns a flattened array - very useful
    const mappedChildren = children?.flatMap(child => {
        
        if (typeof child === "object") {
            const isHyperlink = child?.props?.nodeType === 'hyperlink';
            let content;
            if (isHyperlink) {
                content = child?.props?.content[0].value;
            } 
            
            const matches = typeof content === "string" && content.match(/\((.+)\)(?=\[(#\w+)\])/)
            if (matches && isHyperlink) {
                return createLinkFromMatches(matches, child?.props)
            } else if (isHyperlink) {
                return createDefaultLink(child?.props)
            } 
        }
        // make sure to always return the content if there is no match to the regex
        return child
    })
    return mappedChildren
}
