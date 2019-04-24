export default (props) => {
  return [
    { label: props.LOG_IN && props.LOG_IN.email, name: 'contrasenaRemember', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty },
    { label: props.LOG_IN && props.LOG_IN.repeat_email, name: 'repetirContrasenaRemember', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty },
  ]
}
