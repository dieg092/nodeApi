export default (props) => {
  return [
    { label: props.LOG_IN && props.LOG_IN.email, name: 'emailSignUp', type: 'text', icon: 'mail_outline', noValueError: props.ERROR && props.ERROR.empty, invalidMailError: props.ERROR && props.ERROR.format },
    { label: props.LOG_IN && props.LOG_IN.pass, name: 'passwordSignUp', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty },
    { label: props.LOG_IN && props.LOG_IN.repeat_pass, name: 'passwordSignUpRepeat', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty }
  ]
}
