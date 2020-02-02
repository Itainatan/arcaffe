import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      thank: false,
      name: null,
      lastname: null,
      phone: null,
      company: null
    };
  }

  componentWillMount() {
    document.title = 'Arccafe'
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (
      this.state.name &&
      this.state.lastname &&
      this.state.phone &&
      this.state.company
    ) {
      const { name, lastname, phone, company } = this.state;
      const sign = {
        name,
        lastname,
        phone,
        company
      };
      const res = await axios.post("/api/submit/newSubmit", { sign });
      res && res.status === 200 && this.setState({ thank: true });
    }
    else this.setState({ error: true });
  };

  showForm = () => (
    <form onSubmit={this.handleSubmit}>
      <input
        onChange={e => this.setState({ name: e.target.value, error: false })}
        className="name"
        placeholder=":שם"
      ></input>
      <input
        onChange={e =>
          this.setState({ lastname: e.target.value, error: false })
        }
        type="text"
        placeholder=":שם משפחה"
        className="lastname"
      ></input>
      <input
        onChange={e => this.setState({ phone: e.target.value, error: false })}
        placeholder=":טלפון"
        type="digits"
        className="phone"
      ></input>
      <input
        placeholder=":שם החברה"
        onChange={e => this.setState({ company: e.target.value, error: false })}
        type="text"
        className="company"
      ></input>
      <div className="theButton">
        <button type="submit"> הרשם </button>
      </div>
    </form>
  );

  render() {
    return (
      <div className="main">
        <div className="arcaffe"></div>
        <div className="headers">
          <h1>THE RIGHT COFFEE</h1>
          <h1>DONE THE RIGHT WAY</h1>
          <h6>אירוע חברה מיוחד במינו עם חוויה</h6>
          <h6>!קולינרית בלתי נשכחת</h6>
        </div>
        <div className="divs">
          <div className="picA"></div>
          <div className="form">
            {this.state.error && (
              <div className="error">
                <h6>!אנא שים לב שמילאת את כל הפרטים</h6>
              </div>
            )}
            {this.state.thank ?
              <div>
                <h6>!תודה רבה על הרשמתך, ניפגש באירוע</h6>
              </div>
              : this.showForm()}

          </div>
          <div className="picB"></div>
        </div>
      </div>
    );
  }
}

export default Main;
