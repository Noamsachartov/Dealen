import React from 'react';
import ReactDOM from 'react-dom';
import Advertising_Deal from "./Advertising_Deal.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from './CheckInput';
import Selectoptions from './Selectoptions';
import CheckInput from './CheckInput';
import TimePicker from 'react-time-picker';
import Select from 'react-select';









export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        deal_name: '',
        start_time: new Date(),
        end_time: new Date(),
        discount: '',
        description: '',
        image: null,
        Categories: null,
        Tags: null,
        select_cats: [],
        select_tags: [],
        today: new Date(),
        selectedcats: null,
        selcectedtags: null,
        pcost: null,
        onplusone: null
     };
     //this.onImageChange = this.onImageChange.bind(this);
     this.apiUrl = 'http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal';


  }

  componentDidMount(){
    this.getCategory();
    this.getTags();
}
getCategory=()=>{
    const cats = [];
    const url ="http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Category"

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach((item) => {
          item.checked=false;
            cats.push(item);
        });
        this.setState({Categories:[...cats]});
    });

    console.log(this.state.Categories,1)
}



getTags=()=>{
  const tag = [];
  const url ="http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/GetTags"

  fetch(url)
  .then(response => response.json())
  .then(data => {
      data.forEach((item) => {
          item.checked=false;
          tag.push(item);
      });
      this.setState({Tags:[...tag]});
  });
  console.log(this.state.Tags)
}

  // onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     var data = new FormData();
  //     let img = event.target.files[0];
  //     console.log(img)
  //     this.setState({
  //       image: URL.createObjectURL(img)
  //     });
  //   }
  //   console.log(this.state.image)
  // };

  onImageChange = (event) => {
       

    console.log(event.target.files[0]);
    var data = new FormData();
    if (event.target.value.length > 0) {

      var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
      is_logged = JSON.parse(is_logged);

        //this.setState({ selectedFile: event.target.files[0].name });
        const file = event.target.files[0];
        console.log(is_logged );

        console.log(file);
        const newUrl = URL.createObjectURL(file);
        //console.log(newUrl);
        this.setState({ imgURL: newUrl })

        data.append("UploadedImage", file);
        data.append("name", is_logged);
        console.log(data)

        console.log("in post img function");

        //this.apiUrl = `http://localhost:54976/api/User/uploadedFiles`;

        this.apiUrl = `http://localhost:57075/api/UploadedFiles/uploadedFiles`;

        fetch(this.apiUrl,
            {
                method: 'POST',
                body: data,
                // headers: new Headers({
                //   // 'Content-Type': 'application/json; charset=UTF-8',
                //   // 'Accept': 'application/json; charset=UTF-8'
                // })
            })
            .then(res => {
                console.log('res=', res);

                if (res.status === 201) {
                    console.log('uploadedFile created:)');
                }
                console.log('res.ok', res.ok);

                if (res.ok) {
                    console.log('post succeeded');
                }

                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch btnFetchuploadedFile= ", result);
                    let imgNameInServer = result.split('\\').pop();
                    console.log(imgNameInServer);
                    this.setState({ urlimg: result, selectedFile: imgNameInServer })

                },
                (error) => {
                    console.log("err post=", error);
                });
        console.log('end');
    }
    else {
        this.setState({ selectedFile: null })
    }
}



  mySubmitHandler = (event) => {
    event.preventDefault(); //
    // const CatsToDB = this.state.Categories.filter(item=>item.checked).map((item)=>item.Id);
    console.log(this.state.selectedcats);
    // const TagsToDB = this.state.Tags.filter(item=>item.checked).map((item)=>item.Id);
    console.log(this.state.selectedtags);

    var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
    var b= new Date();
   var jbody= JSON.stringify({
      business_id: is_logged,
      date: b, // Remember to change
      cat_id: this.state.selectedcats, // Remember to change
      tags: this.state.selectedtags, // Remember to change
      name: this.state.deal_name,
      startime: this.state.start_time,
      endtime: this.state.end_time,
      discount: this.state.discount,
      description: this.state.description,
      image: this.state.image,
      pcost: this.state.pcost

    })

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        business_id: is_logged,
        date: b, // Remember to change
        cat_id: this.state.selectedcats, // Remember to change
        tags: this.state.selectedtags, // Remember to change
        name: this.state.deal_name,
        startime: this.state.start_time,
        endtime: this.state.end_time,
        discount: this.state.discount,
        description: this.state.description,
        image: this.state.image,
        pcost: this.state.pcost
        
      }),
      
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())

      .then((responseJson) => {

        window.location = "/";
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });

    // alert("You are submitting " + is_logged);
    
    console.log(jbody);
  }


  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  changedCheckedValuescat=(itemId,checked)=>{
    let cats = [...this.state.Categories];

    console.log(itemId)
    cats.find(item=>item.Id==itemId).checked = checked;
    this.setState({Categories:[...cats]});
    console.log(this.state.Categories);
    var b= new Date();
    console.log(b)

}

changedCheckedValuestag=(itemId,checked)=>{
  let tags = [...this.state.Tags];
  tags.find(item=>item.Id==itemId).checked = checked;
  this.setState({Tags:[...tags]});
}


handleChangecats =(selectedOptions) => {
   let value = Array.from(selectedOptions, option => option.value);
    this.setState({selectedcats: value});
    console.log(this.state.selectedcats);
  // alert(selectedOptions)
  }

  handleChangetags =(selectedOptions) => {
    let value = Array.from(selectedOptions, option => option.value);
     this.setState({selectedtags: value});
     console.log(this.state.selectedtags);
   // alert(selectedOptions)
   }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
     onplusone: value
    });
  }




  render() {
    if(this.state.Categories&&this.state.Tags)
    { 
    
        return (
          <form onSubmit={this.mySubmitHandler}>
          <h1>פרסום מבצע </h1>
          <input
            type='text'
            onChange={text => this.setState({deal_name: text.target.value})}
          />
          <label className="col-sm-0 control-label"> : שם המבצע <br></br><br></br></label>
          <label className="col-sm-0 control-label"> : בחר קטגוריות <br></br><br></br></label>
          <Selectoptions data={this.state.Categories} onChange= {this.handleChangecats} />

          {/* {
                            this.state.Categories?.length>0&&
                            this.state.Categories?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValuescat} id={item.Id} key={key} label={item.Name}/>)
                        } */}
          <br></br>
          <label className="col-sm-0 control-label"> : בחר תגיות לחיפוש מבצע <br></br><br></br></label>
          {/* {
                            this.state.Tags?.length>0&&
                            this.state.Tags?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValuestag} id={item.Id} key={key} label={item.Name}/>)
                        } */}

       
          <br></br>
          <Selectoptions data={this.state.Tags} onChange= {this.handleChangetags} />

          {/* <input
            type='text'
            onChange={text => this.setState({start_time: text.target.value})}
            placeholder="09:00 AM"
            pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
          /> */}
          
          <br></br>
            <TimePicker
            onChange={time=>this.setState({start_time: time})}
            value={ this.state.start_time}
          />
        
          <label className="col-sm-0 control-label"> : שעת תחילת מבצע <br></br> <br></br></label>

          {/* <input
            type='text'
            onChange={text => this.setState({end_time: text.target.value})}
            placeholder="09:00 AM"
            pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
          /> */}
            <TimePicker
            onChange={time1=>this.setState({end_time: time1})}
            value={ this.state.end_time}
          />
          <label className="col-sm-0 control-label"> : שעת סיום מבצע <br></br><br></br> </label>
          
          <input
            type='number'
            onChange={text => this.setState({discount: text.target.value})}
          />
          <label className="col-sm-0 control-label"> : אחוז מבצע  <br></br><br></br></label>
          
           
{/*     
          <label>
       
          <input
            name="True"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
            <tab></tab> :אחד פלוס אחד <br></br><br></br> 

        </label> */}

          <input
            type='number'
            onChange={text => this.setState({pcost: text.target.value})}
            cols="40" rows="20"             

            required minLength={5} maxLength={50}
          />
          
          <label className="col-sm-0 control-label"> : עלות ממוצעת למוצר <br></br><br></br> </label>
          
          <input
            type='textarea'
            onChange={text => this.setState({description: text.target.value})}
            cols="40" rows="20" placeholder="Desctiption"
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
    <div><h1>loading</h1></div>
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
const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};
const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};