import React from 'react';
import ReactDOM from 'react-dom';
import Advertising_Deal from "./Advertising_Deal.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from './CheckInput';
import CheckInput from './CheckInput';






export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        deal_name: '',
        start_time: '',
        end_time: '',
        discount: '',
        description: '',
        image: null,
        Categories: [],
        Tags: []
     };
     this.onImageChange = this.onImageChange.bind(this);
     this.apiUrl = 'http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal';


  }

  componentDidMount(){
    this.getCategory();
}
getCategory=()=>{
    const cats = [];
    const url ="http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category"

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach((item) => {
            cats.push(item);
        });
        this.setState({Categories:[...cats]});
    });
    console.log(this.state.Categories)
    alert(this.state.Categories)
}

getTags=()=>{
  const tag = [];
  const url ="http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/GetTags"

  fetch(url)
  .then(response => response.json())
  .then(data => {
      data.forEach((item) => {
          tag.push(item);
      });
      this.setState({Tags:[...tag]});
  });
  console.log(this.state.Tags)
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
    event.preventDefault(); //
    
    var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        business_id: is_logged,
        business_Name: "Uri ha maniak", // Remember to change
        date: "", // Remember to change
        category: "אסייתי", // Remember to change
        cat_id: 1, // Remember to change
        name: this.state.deal_name,
        startime: this.state.start_time,
        endtime: this.state.end_time,
        discount: this.state.discount,
        description: this.state.description,
        image: this.state.image,
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

  changedCheckedValuescat=(itemId,checked)=>{
    let ings = [...this.state.ingredients];
    ings.find(item=>item.ing.id===itemId).checked = checked;
    this.setState({ingredients:[...ings]});
}

changedCheckedValuescat=(itemId,checked)=>{
  let ings = [...this.state.ingredients];
  ings.find(item=>item.ing.id===itemId).checked = checked;
  this.setState({ingredients:[...ings]});
}


  render() {
    if(this.state.Categories)
    { 
      console.log(this.state.Categories)
    return (
      <form onSubmit={this.mySubmitHandler}>
      <h1>פרסום מבצע </h1>
      <input
        type='text'
        onChange={text => this.setState({deal_name: text.target.value})}
      />
      <label className="col-sm-0 control-label"> : שם המבצע <br></br><br></br></label>
      <label className="col-sm-0 control-label"> : בחר קטגוריות <br></br><br></br></label>

      {
                        this.state.Categories?.length>0&&
                        this.state.Categories?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValuescat} id={item.Id} key={key} label={item.Name}/>)
                    }
      <br></br>
      <br></br>

      <label className="col-sm-0 control-label"> : בחר קטגוריות <br></br><br></br></label>

      {
                        this.state.Categories?.length>0&&
                        this.state.Categories?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValues} id={item.Id} key={key} label={item.Name}/>)
                    }
      <br></br>
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

else
{
    return(
    <h1>loading</h1>
  );
  }
}
}







// ReactDOM.render(<MyForm />, document.getElementById('root'));
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));