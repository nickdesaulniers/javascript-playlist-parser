DOMParser = window?.DOMParser or require?('xmldom').DOMParser or () ->

# pre order, depth first
find = (node, list) ->
  if node.hasChildNodes()
    childNodes = node.childNodes
    for i in [0...childNodes.length]
      childNode = childNodes[i]
      childNodeName = childNode.nodeName
      if /REF/i.test childNodeName
        attributes = childNode.attributes
        for x in [0...attributes.length]
          match_href = attributes[x].nodeName.match(/HREF/i)[0] 
        list.push file: childNode.getAttribute(match_href).trim()
      else if childNodeName isnt '#text'
        find childNode, list
  null

parse = (playlist) ->
  ret = []
  doc = (new DOMParser()).parseFromString(playlist, 'text/xml').documentElement
  return ret unless doc
  find doc, ret
  ret

(if module? then module.exports else window).ASX =
  name: "asx"
  parse: parse

