import './styles.css'
import React from 'react'

function getTime (date) {
  const hours = String(date.getHours()).length === 2 ? date.getHours() : '0' + date.getHours()
  const minutes = String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = String(date.getSeconds()).length === 2 ? date.getSeconds() : '0' + date.getSeconds()
  return hours + ':' + minutes + ':' + seconds
}

function extractPaths (paths) {
  const allPaths = []
  function traverse (currentPaths, pathArray) {
    Object.keys(currentPaths).forEach(key => {
      pathArray.push(key)
      if (currentPaths[key] === true) {
        allPaths.push(pathArray.join('.'))
      } else {
        traverse(currentPaths[key], pathArray)
      }
      pathArray.pop()
    })
  }
  traverse(paths, [])

  return allPaths
}

function unique (array) {
  return array.reduce((newArray, item) => {
    if (newArray.indexOf(item) === -1) {
      return newArray.concat(item)
    }

    return newArray
  }, [])
}

export default function Renders (props) {
  return (
    <div className='renders-wrapper'>
      <div className='renders-renderWrapper'>
        {props.renders.map((render, index) => {
          const date = new Date(render.start)

          return (
            <div className='renders-item' key={index}>
              <div className='renders-itemHeader'>
                <strong>{getTime(date)}</strong> - {render.duration}ms
              </div>
              <div className='renders-renderDataWrapper'>
                <div className='renders-paths'>
                  <div className='renders-pathsHeader'><small>Paths changed</small></div>
                  <div className='renders-pathsList'>
                    {extractPaths(render.changes || {}).map((path, index) => {
                      return (
                        <div className='renders-path' key={index}>
                          <strong>{path}</strong>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='renders-components'>
                  <div className='renders-componentsHeader'><small>Components rendered</small></div>
                  <div className='renders-componentsList'>{unique(render.components).join(', ')}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
