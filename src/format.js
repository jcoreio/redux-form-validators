import Validators from './validators'
import { prepareMsg, prepare } from './helpers'

export default function format({ with: wit, without, message, msg, if: ifCond, unless, allowBlank }) {
  msg = msg || message

  return prepare(ifCond, unless, allowBlank, function (value) {
    if ((wit && !value.match(wit)) || (without && value.match(without))) {
      return Validators.formatMessage(prepareMsg(msg, 'invalid'))
    }
  })
}
