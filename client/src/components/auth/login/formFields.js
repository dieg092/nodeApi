export default (props) => {
  return [
      { label: props.LOG_IN && props.LOG_IN.email, name: 'email', type: 'text', icon: 'mail_outline', noValueError: props.ERROR && props.ERROR.empty, invalidMailError: props.ERROR && props.ERROR.format },
      { label: props.LOG_IN && props.LOG_IN.pass, name: 'password', type: 'password', icon: 'lock_outline', noValueError: props.ERROR && props.ERROR.empty }
  ];
}
