import { Box, Typography } from '@mui/material'
import React from 'react'

function Mark({title, type, text, children, bold, italicized, underlined, variableType, color, clauseCounter}) {

  console.log(type, text, children, clauseCounter)

  const getChildren = () => children.map((child, index) => {
    const isBold = child.bold || bold
    const isItalicized = child.italicized || italicized
    const isUnderlined = underlined || child.underlined
    const variable = child.variableType || variableType
    const childColor = color || child.color
    const isList = type === "ul" || type === "ol"
    const childJsx = <Mark
      key={!isList && index}
      title={child.title}
      type={child.type}
      text={child.text}
      bold={isBold}
      italicized={isItalicized}
      underlined={isUnderlined}
      variableType={variable}
      color={childColor}
      clauseCounter={clauseCounter}
      children={child.children}
    />
    if (isList) return <li key={index}>{childJsx}</li>
    else return childJsx
  })

  const getTypeWrapper = () => {
    switch(type) {
      case "block":
        return (children) => <Box component="div" sx={{ display: 'block' }}>{children}</Box>
      case "p":
        // we do span here because we can't nest lists, paragraphs, etc. in a paragraph
        return (children) => <span>{children}</span>
      case "h1":
        return (children) => <Typography variant="h3" component="h3">{children}</Typography>
      case "h2":
        return (children) => <Typography variant="h3" component="h3">{children}</Typography>
      case "h3":
        return (children) => <Typography variant="h4" component="h4">{children}</Typography>
      case "h4":
        return (children) => <Typography variant="h6" component="h6">{children}</Typography>
      case "h5":
        return (children) => <Typography variant="h6" component="h6">{children}</Typography>
      case "h6":
        return (children) => <Typography variant="h6" component="h6">{children}</Typography>
      case "ul":
        return (children) => <ul>{children}</ul>
      case "ol":
        return (children) => <ol>{children}</ol>
      case "span":
        return (children) => <span>{children}</span>
      case "clause":
        const current = clauseCounter.current++
        return (children) => <Box component="div" sx={{ display: 'block' }}><Box component="span" mt={0.3} sx={{display: 'inline-flex', position: 'absolute'}} >{current}.</Box> <Box ml={4}>{children}</Box></Box>
      default:
        return (children) => <span>{children}</span>
    }
  }

  const renderText = (text) => {
    let output = text
    if (bold) output = <b>{output}</b>
    if (italicized) output = <i>{output}</i>
    if (underlined) output = <Box underlined={underlined}>{output}</Box>
    return <span style={{whiteSpace: "pre-wrap", backgroundColor: color, color: color && "white"}}>{output}</span> 
  }

  if(text !== undefined) return renderText(text)
  else return (
    getTypeWrapper()(getChildren())
  )
}


export default Mark