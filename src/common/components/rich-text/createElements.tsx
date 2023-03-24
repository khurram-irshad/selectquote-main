import Link from 'next/link'
import React from 'react'

const createSpanFromMatches = (matches, text, restProps = {}) => {
  const content = text.split(`${matches[0]}[${matches[2]}]`)
  return [...new Set(content)] // get the unique values / avoid ["", ""] - when there are no other parts of text
    .map(text => text === "" ?  // map over the unique values to replace that which was split
      <span {...restProps} style={{ color: `${matches[2]}`, fontWeight: '600' }} >{matches[1]}</span>  // return the element with the colour
      : text) // or return the text
}

const createLinkFromMatches = (matches, data, restProps = {}) => {
  const text = data?.content[0].value;
  const URL = data?.data?.uri;
  const content = text.split(`${matches[0]}[${matches[2]}]`)
  return [...new Set(content)] // get the unique values / avoid ["", ""] - when there are no other parts of text
    .map(text => text === "" ?  // map over the unique values to replace that which was split
      <Link href={URL || "/"}>
        <a {...restProps} className="hover" target="_blank" rel="noopener noreferrer" style={{ color: `${matches[2]}`, textDecoration: "none", fontWeight: 700 }} >{matches[1]}</a>
      </Link>  // return the element with the colour
      : text) // or return the text
}

const createDefaultLink = (data, restProps = {}) => {
  const text = data?.content[0].value;
  const URL = data?.data?.uri;
  return <Link href={URL || "/"}>
    <a {...restProps} className="hover" target="_blank" rel="noopener noreferrer" style={{ color: '#07aec7', textDecoration: "none", fontWeight: 700, cursor: 'pointer' }} >{text}</a>
  </Link>
}

export { createSpanFromMatches, createDefaultLink, createLinkFromMatches }