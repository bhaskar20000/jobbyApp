import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import {FaExternalLinkAlt, FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import Header from '../Header'

import './index.css'

const SkillGetter = props => {
  const {eachskill} = props
  const {imageUrl, name} = eachskill
  return (
    <div className="skill-con">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p className="skill-para">{name}</p>
    </div>
  )
}

const SimilarJob = props => {
  const {eachjob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    title,
  } = eachjob

  return (
    <li className="li-similar-jobs">
      <div className="top-one-similar">
        <div className="logo-container-similar">
          <img
            alt="job details company logo"
            src={companyLogoUrl}
            className="logo-element-similar"
          />
        </div>
        <div className="head-rating-container">
          <h1 className="heading-similar">{title}</h1>
          <div className="rating-con-similar">
            <FaStar className="rating-ele-similar" />
            <p className="rating-para-similar">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading-similar-sec">Description</h1>
      <p className="para-similar-third">{jobDescription}</p>
      <p>{employmentType}</p>
    </li>
  )
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    similarJobs: [],
    skillsList: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {history} = this.props
    const {location} = history
    const {pathname} = location
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in${pathname}`

    const jobFetchOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, jobFetchOption)
    const data = await response.json()
    console.log(data)
    const rawJobDetails = data.job_details
    const modifiedJobDetails = {
      companyLogoUrl: rawJobDetails.company_logo_url,
      companyWebsiteUrl: rawJobDetails.company_website_url,
      employmentType: rawJobDetails.employment_type,
      id: rawJobDetails.id,
      jobDescription: rawJobDetails.job_description,
      location: rawJobDetails.location,
      packagePerAnnum: rawJobDetails.package_per_annum,
      rating: rawJobDetails.rating,
      title: rawJobDetails.title,
    }
    const rawLifeAtCompany = rawJobDetails.life_at_company
    const modifiedLifeAtCompany = {
      description: rawLifeAtCompany.description,
      imageUrl: rawLifeAtCompany.image_url,
    }
    const rawSimilarJobs = data.similar_jobs
    const modifiedSimilarJobs = rawSimilarJobs.map(eachitem => ({
      companyLogoUrl: eachitem.company_logo_url,
      employmentType: eachitem.employment_type,
      id: eachitem.id,
      jobDescription: eachitem.job_description,
      location: eachitem.location,
      rating: eachitem.rating,
      title: eachitem.title,
    }))

    const dataJobDetails = data.job_details
    const rawSkills = dataJobDetails.skills
    const modifiedSkillsList = rawSkills.map(eachitem => ({
      name: eachitem.name,
      imageUrl: eachitem.image_url,
      id: uuidv4(),
    }))

    this.setState({
      jobDetails: modifiedJobDetails,
      lifeAtCompany: modifiedLifeAtCompany,
      similarJobs: modifiedSimilarJobs,
      skillsList: modifiedSkillsList,
    })
  }

  render() {
    const {jobDetails, lifeAtCompany, similarJobs, skillsList} = this.state
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="outer-job-des">
          <div className="job-details-outer-container">
            <div className="company-details-conatiner-job-details">
              <div className="frontend-logo-container">
                <div className="company-profile-job-description-container">
                  <img
                    className="company-logo-image-job-description"
                    src={jobDetails.companyLogoUrl}
                    alt="job details company logo"
                  />
                </div>
                <div className="rating-heading-outer-container-job-description">
                  <h1 className="job-name-heading">{jobDetails.title}</h1>
                  <div className="rating-outer-container-job-des">
                    <FaStar className="star-icon-job-details" />
                    <p className="rating-para-job-details">
                      {jobDetails.rating}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lpa-outer-container-job-details">
                <div className="lpa-one">
                  <div className="icon-outer-container">
                    <div className="icon-container-job-details">
                      <IoLocationSharp className="io-location-style-job-details" />
                    </div>
                    <p className="location-para-job-details">
                      {jobDetails.location}
                    </p>
                  </div>
                  <div className="icon-outer-container">
                    <div className="icon-container-job-details">
                      <IoLocationSharp className="io-location-style-job-details" />
                    </div>
                    <p className="location-para-job-details">
                      {jobDetails.employmentType}
                    </p>
                  </div>
                </div>
                <div className="lpa-two">
                  <p className="lpa-heading">{jobDetails.packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="description-container">
              <div className="head-link-container">
                <h1 className="description-heading-jod-des">Description</h1>
                <div className="link-container">
                  <a
                    href={jobDetails.companyWebsiteUrl}
                    target="_blank"
                    className="visit-anchor-element"
                    rel="noreferrer"
                  >
                    Visit
                  </a>
                  <FaExternalLinkAlt className="link-icon" />
                </div>
              </div>
              <p className="description-para">{jobDetails.jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1 className="skills-heading">Skills</h1>
              <div className="skills-ul-container">
                {skillsList.map(eachitem => (
                  <SkillGetter key={eachitem.id} eachskill={eachitem} />
                ))}
              </div>
            </div>
            <div className="life-at-company-container">
              <div className="inner-life-at-company-container">
                <h3 className="life-at-company-heading">Life at Company</h3>
                <p className="para-life-at-company">
                  {lifeAtCompany.description}
                </p>
              </div>
              <div className="life-at-image-company-container">
                <img
                  className="life-at-company-image-element"
                  src={lifeAtCompany.imageUrl}
                />
              </div>
            </div>
          </div>
          <div className="similar-outer">
            <h2 className="similar-jobs-head-similar">Similar Jobs</h2>
            <ul className="similar-ul-list">
              {similarJobs.map(eachitem => (
                <SimilarJob key={eachitem.id} eachjob={eachitem} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
