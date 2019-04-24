export default (props) => {
  return [
    { label: props.LOG_IN && props.LOG_IN.email, name: 'emailRemember', type: 'text', icon: 'mail_outline', noValueError:  props.ERROR && props.ERROR.empty, invalidMailError: props.ERROR && props.ERROR.format}
  ]
}
