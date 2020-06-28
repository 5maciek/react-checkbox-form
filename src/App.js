import React, { Component } from 'react';
import './App.css';
import ListCompanies from './components/ListCompanies';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    selectedAll: false,
  };

  componentDidMount() {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem('data'));
      if (!data) {
        fetch('http://localhost:3000/companies')
          .then((response) => response.json())
          .then((companies) =>
            this.setState({
              isLoading: false,
              data: companies,
            })
          );
      } else {
        this.setState({
          isLoading: false,
          data,
        });
      }
    }, 2000);
  }

  handleSelectAll = (event) => {
    const data = JSON.parse(JSON.stringify(this.state.data));
    data.forEach((company) =>
      company.departments.forEach(
        (department) => (department.required = event.target.checked)
      )
    );

    this.setState({
      data,
      selectedAll: event.target.checked,
    });
  };

  handleSelectCheckBox = (event, uuid, code) => {
    const data = JSON.parse(JSON.stringify(this.state.data));
    const findIndexCompany = data.findIndex((item) => item.uuid === uuid);
    const findIndexDepartment = data[findIndexCompany].departments.findIndex(
      (department) => department.code === code
    );
    data[findIndexCompany].departments[findIndexDepartment].required =
      event.target.checked;

    const allChecked = data.every((company) =>
      company.departments.every((department) => department.required === true)
    );

    this.setState({
      data: [...data],
      selectedAll: allChecked,
    });
  };

  handleConfirm = () => {
    const { data } = this.state;
    localStorage.setItem('data', JSON.stringify(data));
  };

  render() {
    const { isLoading, data, selectedAll } = this.state;
    return (
      <div className="App">
        <h1>
          Hey, take a moment to <span>adjust your privacy settings</span>
        </h1>
        {isLoading ? (
          <>
            <p>We are gathering available privacy settings...</p>
            <div className="set__loader">
              <span className="loader"></span>
            </div>
          </>
        ) : (
          <div className="set__privacy">
            <ul className="companies">
              <OverlayScrollbarsComponent style={{ height: 380 }}>
                <ListCompanies
                  data={data}
                  handleCheckBox={this.handleSelectCheckBox}
                />
              </OverlayScrollbarsComponent>
            </ul>

            <section className="set__confirmation">
              <section className="inputCheckAll">
                <input
                  type="checkbox"
                  id="select__all"
                  checked={selectedAll}
                  onChange={(event) => this.handleSelectAll(event)}
                />
                <label htmlFor="select__all">Select All</label>
              </section>
              <button onClick={this.handleConfirm}>Confirm</button>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default App;
