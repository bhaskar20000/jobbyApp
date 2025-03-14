import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-outer-container">
          <div className="home-body-container">
            <div className="home-inner-body-container">
              <h1 className="home-heading">Find The Job That Fits Your Life</h1>
              <p className="home-para">
                Millions of people are searching for jobs, salary information,
                company reviews. Find the job that fits your abilities and
                potential.
              </p>
              <Link to="/jobs">
                <button type="button" className="home-find-jobs-buttons">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
