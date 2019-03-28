/**
 * @return {Object}
 *根据newObj找出与originObj不相同的地方
 */
export function findDiff(originObj, newObj) {
  if (
    !({}.toString.call(originObj) === '[object Object]') ||
    !({}.toString.call(newObj) === '[object Object]')
  ) {
    throw 'arguments need two object'
  }

  return diff(originObj, newObj)

  function diff(originObj, newObj, data = {}) {
    for (let key in newObj) {
      if (JSON.stringify(originObj[key]) === JSON.stringify(newObj[key])) {
        continue
      }

      if ({}.toString.call(newObj[key]) !== '[object Object]') {
        data[key] = JSON.parse(JSON.stringify(newObj[key]))
        continue
      }
      data[key] = {}
      diff(originObj[key], newObj[key], data[key])
    }
    return data
  }
}


/**
 *
 * @param {Object} fromObj
 * @param {any} node
 * @return {Array} [key1,key2]
 * 从对象中，查找某个值，返回key的路径 深度优先
 */

export function findKeyPath(originObj, data) {
  if (!(typeof originObj === 'object')) {
    throw 'arguments need  object'
  }
  if (!data) return []

  const type = {}.toString.call(data)

  function findObj(obj, dataobj) {
    return Reflect.ownKeys(dataobj).every(key => {
      if ({}.toString.call(dataobj[key]) !== '[object Object]') {
        return JSON.stringify(dataobj[key]) === JSON.stringify(obj[key])
      }

      if ({}.toString.call(obj[key]) !== '[object Object]') {
        return false
      }
      return findObj(obj[key], dataobj[key])
    })
  }

  const find = function(obj, keyPath = []) {
    if (
      type === '[object Object]' &&
      {}.toString.call(obj) === '[object Object]'
    ) {
      if (findObj(obj, data)) {
        return keyPath
      }
    }

    for (let key in obj) {
      const value = obj[key]
      if (value === data || JSON.stringify(value) === JSON.stringify(data)) {
        keyPath.push(key)
        return keyPath
      }

      if (typeof obj[key] === 'object') {
        const findKey = find(obj[key], [...keyPath, key])
        if (findKey) return findKey
      }
    }
  }

  return find(originObj) || []
}


/**
 *
 * @param {需要处理的对象} obj
 * @param {删除此对象中值为type中包含的数据} type
 */
export function delPickedValue(obj, type = ['', undefined, null]) {
  if ({}.toString.call(obj) !== '[object Object]') {
    throw 'argument need object'
  }

  function clear(obj) {
    Reflect.ownKeys(obj).forEach(key => {
      if (type.includes(obj[key])) {
        return Reflect.deleteProperty(obj, key)
      }
      if ({}.toString.call(obj[key]) === '[object Object]') {
        clear(obj[key])
      }
    })
    return obj
  }

  return clear(obj)
}

/**
 * @params [json1, json2...]
 * 生成二维数组
 */
export const jsonsToArray = function(locales, needPath = true) {
  locales = JSON.parse(JSON.stringify(locales))
  const { toString } = Object.prototype
  const datas = []

  function go(jsons, path = []) {
    const keys = getKeys(jsons)

    keys.forEach(key => {
      const nwPath = [...path, key]

      const data = []
      const values = jsons.map(json => {
        if (!json) {
          return ''
        }
        return json[key]
      })

      const simpleValues = values.map(it => {
        if (toString.call(it) === '[object Object]' || !it) {
          return ''
        }
        if (toString.call(it === '[object Array]')) {
          return it
        }
        return it
      })

      data.push(...simpleValues)
      if (data.filter(it => it).length) {
        if (needPath) {
          data.unshift(nwPath.join('.'))
        }
        datas.push(data)
      }
      if (values.some(it => toString.call(it) === '[object Object]')) {
        const childObjArr = values.map(it => {
          if (toString.call(it) === '[object Object]') {
            return it
          }
          return ''
        })

        return go(childObjArr, nwPath)
      }
    })
  }
  function getKeys(jsons) {
    const assignJson = jsons.reduce((old, nw) => {
      if (toString.call(nw) === '[object Object]') {
        return { ...old, ...nw }
      }
      return old
    }, {})
    return Reflect.ownKeys(assignJson)
  }
  go(locales)
  return datas
}

export const downloadCsv = function(arr) {
 
  // csv 换行'\n' 换列 ','
  arr = arr.map(it => {
    it = it.map(val => JSON.stringify(val))
    return it.join(',')
  })

  const str = arr.join('\n')

  const blob = new Blob([str])

  const a = document.createElement('a')
  a.download = 'aa.csv'
  a.href = URL.createObjectURL(blob)
  document.body.appendChild(a)

  a.click()
  document.body.removeChild(a)
}

