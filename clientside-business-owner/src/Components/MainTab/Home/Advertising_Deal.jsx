import React from 'react';
import ReactDOM from 'react-dom';
import Advertising_Deal from "./Advertising_Deal.css"




export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        deal_name: '',
        start_time: '',
        end_time: '',
        discount: '',
        description: '',
        image: null
     };
     this.onImageChange = this.onImageChange.bind(this);
     this.apiUrl = 'http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal';


  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        Deal_name: this.state.deal_name,
        Start_time: this.state.start_time,
        End_time: this.state.end_time,
        Discount: this.state.discount,
        Description: this.state.description,
        Image: this.state.image,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });

    alert("You are submitting " + this.state.username);
    console.log(this.state);
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>פרסום מבצע </h1>
      <input
        type='text'
        onChange={text => this.setState({deal_name: text.target.value})}
      />
      <label className="col-sm-0 control-label"> : שם המבצע <br></br><br></br></label>

      <input
        type='text'
        onChange={text => this.setState({start_time: text.target.value})}
        placeholder="09:00 AM"
        pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
      />
      <label className="col-sm-0 control-label"> : שעת תחילת מבצע <br></br> <br></br></label>

      <input
        type='text'
        onChange={text => this.setState({end_time: text.target.value})}
        placeholder="09:00 AM"
        pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
      />
      <label className="col-sm-0 control-label"> : שעת סיום מבצע <br></br><br></br> </label>
      
      <input
        type='text'
        onChange={text => this.setState({discount: text.target.value})}
      />
      <label className="col-sm-0 control-label"> : אחוז מבצע <br></br><br></br> </label>
      
      <input
        type='textarea'
        onChange={text => this.setState({description: text.target.value})}
        cols="40" rows="20" placeholder="Message"
        required minLength={5} maxLength={50}
      />
      <label className="col-sm-0 control-label"> :  תיאור מבצע <br></br><br></br> </label>
      <div>
        <div>
          <div>

            <img src={this.state.image} />
            <input type="file" name="myImage" onChange={this.onImageChange} />
            <label className="col-sm-0 control-label"> :  העלאת תמונה <br></br><br></br> </label>
          </div>
        </div>
      </div>
      
      <input
        type='submit'
      />
      </form>
    );
  }
}

// ReactDOM.render(<MyForm />, document.getElementById('root'));
