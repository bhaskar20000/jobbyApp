import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    isError: false,
    usernameEntered: '',
    passwordEntered: '',
    errorMsg: '',
  }

  onUserEnter = event => {
    this.setState({
      usernameEntered: event.target.value,
    })
  }

  onPasswordEnter = event => {
    this.setState({
      passwordEntered: event.target.value,
    })
  }

  verifyDetails = async () => {
    const {usernameEntered, passwordEntered} = this.state
    const {history} = this.props
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: usernameEntered,
      password: passwordEntered,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        this.setState({
          isError: true,
          errorMsg: data.error_msg,
        })
      }
    } catch (e) {
      this.setState({
        isError: true,
        errorMsg: e.message,
      })
    }
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {usernameEntered, passwordEntered} = this.state
    if (usernameEntered === '' || passwordEntered === '') {
      this.setState({
        errorMsg: 'enter correct credentials',
        isError: true,
      })
    } else {
      this.setState({
        isError: false,
      })
    }

    this.verifyDetails()
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {isError, errorMsg} = this.state
    return (
      <div className="login-container">
        <form className="login-form-conatiner" onSubmit={this.onSubmitForm}>
          <div className="login-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-image-element"
            />
          </div>
          <div className="login-username-container">
            <label className="login-username-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-username-element"
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.onUserEnter}
            />
          </div>
          <div className="login-password-container">
            <label className="login-password-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-password-input-element"
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.onPasswordEnter}
            />
          </div>
          <button
            onClick={this.onSubmitForm}
            className="button-login-element"
            type="submit"
          >
            Login
          </button>
          {isError && <p className="login-error-para">{`* ${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default Login
