import Validators from './validators'
import { prepareMsg, prepare } from './helpers'
import { isFileList } from './file'

export default function absence({ message, msg, if: ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (typeof value === 'string' ? value.trim() : isFileList(value) && !isNaN(value.length) ? value.length : value) {
      return Validators.formatMessage(prepareMsg(msg, 'absence'))
    }
  })
}
