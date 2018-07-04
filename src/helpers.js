import Validators from './validators'

export const HAS_PROP = {}.hasOwnProperty
export const TO_STRING = {}.toString

export function regFormat(func, messageType) {
  return function (options) {
    options = options || {}
    let msg = options.msg || options.message

    return prepare(options['if'], options.unless, options.allowBlank, function (value) {
      if (!value.match(func(options))) {
        return Validators.formatMessage(prepareMsg(msg, messageType))
      }
    })
  }
}

export function prepare(ifCond, unlessCond, allowBlank, func) {
  return function (value, allValues = {}, ...args) {
    if (!value || typeof value !== 'object') {
      value = value == null ? '' : '' + value

      if ((allowBlank != null ? allowBlank : Validators.defaultOptions.allowBlank) && !value.trim()) {
        return
      }
    }
    if (
      (typeof ifCond !== 'function' || ifCond(allValues, value)) &&
      (typeof unlessCond !== 'function' || !unlessCond(allValues, value))
    ) {
      return func(value, allValues, ...args)
    }
  }
}

export function trunc(num) {
  /* istanbul ignore next */
  return Math.trunc ? Math.trunc(num) : num < 0 ? Math.ceil(num) : Math.floor(num)
}

export function selectNum(var1, var2) {
  return isNumber(var1) ? +var1 : arguments.length > 1 && isNumber(var2) ? +var2 : null
}

export function isNumber(num) {
  // eslint-disable-next-line
  return !isNaN(num) && (0 != num || '' !== ('' + num).trim())
}

export function prepareMsg(msg, type, values) {
  if (msg == null) {
    return defaultMessage(type, values)
  }
  if (HAS_PROP.call(msg, 'props') && isReactElement(msg)) {
    msg = msg.props
  }
  if (msg[type] != null) {
    msg = msg[type]
  }
  if (isObject(msg)) {
    if (HAS_PROP.call(msg, 'id') || HAS_PROP.call(msg, 'defaultMessage')) {
      return Object.assign({}, msg, { values })
    }
    return defaultMessage(type, values)
  }
  return { id: msg, defaultMessage: msg, values }
}

export function toObjectMsg(msg) {
  if (msg == null) return null
  return isObject(msg) ? msg : { id: msg, defaultMessage: msg }
}

// private
function defaultMessage(type, values) {
  let msg = Validators.messages[type]
  return typeof msg === 'string' ? { defaultMessage: msg, values } : Object.assign({}, msg, { values })
}

function isReactElement(object) {
  return typeof object === 'object' && object !== null && '$$typeof' in object
}

function isObject(obj) {
  return typeof obj === 'object' && TO_STRING.call(obj) === '[object Object]' && obj !== null
}
