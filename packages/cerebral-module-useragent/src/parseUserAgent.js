import UaParser from 'ua-parser-js'

const uaParser = new UaParser()
uaParser.setUA(navigator.userAgent)

export default function parseUserAgent (options) {
  const parse = options.parse

  return Object.keys(parse)
    .filter(isEnabled)
    .reduce((all, key) => {
      const parseFunction = getParseFunction(key, uaParser)

      if (typeof parseFunction !== 'function') {
        throw new Error(`Parsing the ${key} from useragent is not supported.`)
      }

      all[key] = parseFunction.call(uaParser)
      return all
    }, {})

  function isEnabled (key) {
    return parse[key] === true
  }
}

function getParseFunction (prop, uaParser) {
  const parseFunctionName = getParseFunctionName(prop)
  return uaParser[parseFunctionName]
}

function getParseFunctionName (prop) {
  return `get${prop.charAt(0).toUpperCase() + prop.slice(1)}`
}
