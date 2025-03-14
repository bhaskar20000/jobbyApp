import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ul className="home-nav-container">
        <Link className="home-logo-image-element" to="/">
          <li className="home-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-logo-image-element"
            />
          </li>
        </Link>
        <li className="home-nav-para-container">
          <Link className="nav-home-para" to="/">
            <p className="home-nav-para">Home</p>
          </Link>
          <Link className="nav-home-para" to="/jobs">
            <p className="home-nav-jobs-para">Jobs</p>
          </Link>
        </li>
        <li className="home-logout-button-container">
          <button
            onClick={this.onLogout}
            type="button"
            className="home-nav-logout-button"
            data-testid="logoutButton"
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }
}

export default withRouter(Header)
