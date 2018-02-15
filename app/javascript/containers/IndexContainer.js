import React, { Component } from 'react'
import { Link } from 'react-router'

import AllEmployeesList from '../components/AllEmployeesList'

class IndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      company: {},
      employees: [],
      showList: false
    }
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/users.json`, { credentials: 'same-origin' })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        user: body.current_user,
        company: body.company,
        employees: body.employees
       })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleShow(event) {
    this.setState({showList: true})
  }

  handleHide(event) {
    this.setState({showList: false})
  }

  render() {

    let currentUser = this.state.user
    let userFirstName = currentUser.first_name
    let userLastName = currentUser.last_name
    let companyName = this.state.company.name

    let listAllEmployees = null;
    if (this.state.showList) {
      listAllEmployees = <AllEmployeesList
        employees={ this.state.employees }
        handleHide={ this.handleHide }
       />
    }

    return(
      <div className="index">
        <div id="company-user-title">
          <h2>{companyName}</h2>
          <h3>Welcome, {userFirstName} {userLastName}!</h3>
        </div>

        <div className="button-holder">
          <div>
            <Link to={'/employees/new'}>
              <button className='button'>ADD EMPLOYEES</button>
            </Link>
          </div>

          <div>
            <Link to={'/employees/search'}>
              <button className='button'>SEARCH EMPLOYEES</button>
            </Link>
          </div>

          <div onClick={this.handleShow}>
            <button className='button'>VIEW EMPLOYEES</button>
          </div>
        </div>

          {listAllEmployees}

      </div>
    )
  }
}

export default IndexContainer;
