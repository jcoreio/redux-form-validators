import Validators from './validators'
import { prepareMsg, prepare } from './helpers'

export default function acceptance({ accept, message, msg, if: ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function (value) {
    if (
      []
        .concat(accept || Validators.defaultOptions.accept)
        .map(String)
        .indexOf(value) < 0
    ) {
      return Validators.formatMessage(prepareMsg(msg, 'acceptance'))
    }
  })
}
