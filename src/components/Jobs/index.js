import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FaStar, FaRegEnvelope} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const ErrorResponse = props => {
  const {onretry} = props
  const onRetry = () => {
    onretry()
  }
  return (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={onRetry()}
        data-testid="retryButton"
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )
}

const NoProducts = () => (
  <div className="not-found-div">
    <img
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
      className="not-found-image"
    />
    <h1 className="not-found-heading">No Jobs Found</h1>
    <p className="not-found-para">
      We could not find any jobs. Try other filters.
    </p>
  </div>
)

const JobItem = props => {
  const {eachjob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachjob
  return (
    <Link to={`/jobs/${id}`} className="link-job-item">
      <li className="job-item-li-element">
        <div className="logo-container-job">
          <img className="job-logo" alt="company logo" src={companyLogoUrl} />
          <div className="job-name-container">
            <h1 className="job-name-element">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="second-container">
          <div className="second-first-container">
            <div className="second-first-inner-container">
              <div className="icon-container">
                <IoLocationSharp className="io-location-style" />
              </div>
              <p className="location-para">{location}</p>
            </div>
            <div className="second-second-inner">
              <div className="icon-container">
                <FaRegEnvelope className="fa-envelop" />
              </div>
              <p className="location-para">{employmentType}</p>
            </div>
          </div>
          <div className="second-right-container">
            <p className="lpa-para">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="job-description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

const Employee = props => {
  const {eachvalue, onEmployee} = props
  const {employmentTypeId, label} = eachvalue
  const onClickCheck = () => {
    const inputEle = document.getElementById(`${employmentTypeId}`)
    if (inputEle.checked) {
      onEmployee(employmentTypeId)
    } else {
      onEmployee('uncheck')
    }
  }
  return (
    <li className="employee-li-item">
      <input
        id={employmentTypeId}
        onClick={onClickCheck}
        className="input-item"
        type="checkbox"
      />
      <label htmlFor={employmentTypeId} className="li-para">
        {label}
      </label>
    </li>
  )
}

const SalaryRange = props => {
  const {eachSalary, onSalary} = props
  const {salaryRangeId} = eachSalary
  const onSalaryCheck = () => {
    const searhEle = document.getElementById(salaryRangeId)
    if (searhEle.checked) {
      onSalary(salaryRangeId)
    } else {
      onSalary('')
    }
  }
  return (
    <li className="salary-li-item">
      <input
        id={salaryRangeId}
        onClick={onSalaryCheck}
        className="input-item"
        type="radio"
        name="salary"
      />
      <label htmlFor={salaryRangeId} className="li-para">
        {eachSalary.label}
      </label>
    </li>
  )
}

const LoadingElement = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

class Jobs extends Component {
  state = {
    name: '',
    userProfileUrl: '',
    userBio: '',
    jobsData: [],
    typedText: '',
    searchText: '',
    employmentVal: [],
    minimumPackageVal: '',
    search: '',
    resposeFailJob: false,
    responseFailProfile: false,
    isResponseOfProfileGot: false,
    isJobResponseGot: false,
  }

  componentDidMount() {
    this.getUserDetails()
    this.getJobDetails()
  }

  onClickCheckEmployee = value => {
    if (value === 'uncheck') {
      this.setState(
        {
          employmentVal: [],
        },
        this.getJobDetails,
      )
    } else {
      this.setState(
        prev => ({
          employmentVal: [...prev.employmentVal, value],
        }),
        this.getJobDetails,
      )
    }
  }

  onClickCheckedSalary = value => {
    this.setState(
      {
        minimumPackageVal: value,
      },
      this.getJobDetails,
    )
  }

  getJobDetails = async () => {
    const {search, employmentVal, minimumPackageVal} = this.state
    console.log(employmentVal)
    const jobUrl = `htps://apis.ccbp.in/jobs?employment_type=${employmentVal.join()}&minimum_package=${minimumPackageVal}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(jobUrl, options)
      if (response.ok) {
        const data = await response.json()
        const tailoredJobArray = data.jobs.map(eachitem => ({
          id: eachitem.id,
          companyLogoUrl: eachitem.company_logo_url,
          employmentType: eachitem.employment_type,
          jobDescription: eachitem.job_description,
          location: eachitem.location,
          packagePerAnnum: eachitem.package_per_annum,
          rating: eachitem.rating,
          title: eachitem.title,
        }))
        this.setState({
          jobsData: tailoredJobArray,
          responseFailJob: false,
          isJobResponseGot: true,
        })
      } else {
        this.setState({
          resposeFailJob: true,
        })
      }
    } catch (e) {
      this.setState({
        resposeFailJob: true,
      })
    }
  }

  getUserDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    try {
      const jwtToken = Cookies.get('jwt_token')

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const profileResponse = await fetch(profileUrl, options)
      if (profileResponse.ok) {
        const data = await profileResponse.json()
        const dataProfileobj = data.profile_details
        this.setState({
          name: dataProfileobj.name,
          userProfileUrl: dataProfileobj.profile_image_url,
          userBio: dataProfileobj.short_bio,
          responseFailProfile: false,
          isResponseOfProfileGot: true,
        })
      } else {
        this.setState({
          responseFailProfile: true,
        })
      }
    } catch (e) {
      this.setState({
        responseFailProfile: true,
      })
    }
  }

  onTypeSearch = event => {
    this.setState({
      typedText: event.target.value,
    })
  }

  onSearch = event => {
    event.preventDefault()
    const {typedText} = this.state
    this.setState({
      searchText: typedText,
    })
  }

  render() {
    let isFilteredEmpty = false
    const {
      name,
      resposeFailJob,
      userBio,
      typedText,
      userProfileUrl,
      searchText,
      jobsData,
      isResponseOfProfileGot,
      responseFailProfile,
      isJobResponseGot,
    } = this.state
    const filtered = jobsData.filter(eachitem => {
      if (
        eachitem.title.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return eachitem
      }
    })

    const ErrorProfile = () => (
      <div className="retry-container">
        <button
          onClick={this.getUserDetails}
          type="button"
          className="retry-button"
        >
          Retry
        </button>
      </div>
    )

    if (filtered.length === 0) {
      isFilteredEmpty = true
    } else {
      isFilteredEmpty = false
    }
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    const getCorrectProfile = () => {
      if (responseFailProfile) {
        return <ErrorProfile />
      }

      if (isResponseOfProfileGot === false) {
        return <LoadingElement />
      }

      if (responseFailProfile === false) {
        return (
          <div className="profile">
            <img className="profile-image" src={userProfileUrl} alt="profile" />
            <h1 className="profile-heading">{name}</h1>
            <p className="profile-para">{userBio}</p>
          </div>
        )
      }
    }

    const getCorrectListEle = () => {
      if (resposeFailJob) {
        return <ErrorResponse onretry={this.getJobDetails} />
      }

      if (isJobResponseGot) {
        if (isFilteredEmpty) {
          return <NoProducts />
        }
        return (
          <>
            {filtered.map(eachitem => (
              <JobItem key={eachitem.id} eachjob={eachitem} />
            ))}
          </>
        )
      }

      if (isJobResponseGot === false) {
        return <LoadingElement />
      }
    }

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="job-profile-section">
            {getCorrectProfile()}
            <hr />
            <h1 className="left-heading">Types of Employment</h1>
            <ul className="employee-ul-list">
              {employmentTypesList.map(eachitem => (
                <Employee
                  key={eachitem.employmentTypeId}
                  eachvalue={eachitem}
                  onEmployee={this.onClickCheckEmployee}
                />
              ))}
            </ul>
            <hr />
            <h1 className="left-heading">Salary Range</h1>
            <ul className="salary-ul-list">
              {salaryRangesList.map(eachitem => (
                <SalaryRange
                  key={eachitem.salaryRangeId}
                  eachSalary={eachitem}
                  onSalary={this.onClickCheckedSalary}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-display-section">
            <form onSubmit={this.onSearch} className="search-container">
              <input
                className="input-search-element"
                placeholder="Search"
                type="search"
                onChange={this.onTypeSearch}
                value={typedText}
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.onSearch}
                className="search-container-icon"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            <ul className="job-ul-element">{getCorrectListEle()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
