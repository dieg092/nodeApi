export default (props) => {
  return [
    { label: props.LOG_IN && props.LOG_IN.email, name: 'emailSignUpRequest', type: 'text', icon: 'mail_outline', noValueError: props.ERROR && props.ERROR.empty, invalidMailError: props.ERROR && props.ERROR.format },
    { label: props.LOG_IN && props.LOG_IN.pass, name: 'passwordSignUpRequest', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty },
    { label: props.LOG_IN && props.LOG_IN.repeat_pass, name: 'passwordSignUpRepeatRequest', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty }
  ]
}
