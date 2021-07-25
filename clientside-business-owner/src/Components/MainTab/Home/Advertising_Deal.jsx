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
import Selectoptioncreate from './Selectoptioncreate';
import CheckInput from './CheckInput';
import TimePicker from 'react-time-picker';
import Select from 'react-select';
import { FreeBreakfastOutlined, TransferWithinAStationRounded } from '@material-ui/icons';

// import { FaPercent } from "react-icons/Fa";

// import { FaPercent } from 'react-icons/fa';
import { FaPercent } from 'react-icons/fa';
import {GiSandsOfTime} from 'react-icons/gi'
import {AiFillPicture} from 'react-icons/ai'




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
        Products: null,
        select_cats: [],
        select_tags: [],
        today: new Date(),
        selectedcats: null,
        selcectedtags: null,
        selectedprods: null,
        pcost: null,
        onplusone: null,
        iscreatedprod:0
     };
     //this.onImageChange = this.onImageChange.bind(this);
    
    this.apiUrl = 'http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal';
    //  this.apiUrl = 'http://localhost:57075/api/Deal';


  }

  componentDidMount(){
    this.getCategory();
    this.getTags();
    this.getProducts();
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


getProducts=()=>{
  const tag = [];
  var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;

  const url ="http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/Productlist/"+is_logged

  fetch(url)
  .then(response => response.json())
  .then(data => {
      data.forEach((item) => {
          item.checked=false;
          tag.push(item);
      });
      this.setState({Products:[...tag]});
  });
  console.log(this.state.Products)
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
        // http://localhost:57075/api/UploadedFiles/uploadedFiles
         this.apiUrl = `http://proj.ruppin.ac.il/igroup49/test2/tar1/api/UploadedFiles/uploadedFiles`;
        // this.apiUrl = `http://localhost:57075/api/UploadedFiles/uploadedFiles`;

        fetch(this.apiUrl,
            {
                method: 'POST',
                body: data,
                // redirect: 'follow'
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
                    var uri = result.split("\\")
                    var new_result = "http://proj.ruppin.ac.il/igroup49/test2/tar1/uploadedFiles/" + uri[uri.length-1]
                    this.setState({ urlimg: new_result, selectedFile: imgNameInServer })

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
    console.log("---------");
    console.log(this.state.urlimg);




    var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;

    if(this.state.iscreatedprod==1)
    {
      this.AddProduct();

    }
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
      image: this.state.urlimg,
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
        image: this.state.urlimg,
        pcost: this.state.pcost,
        product:  this.state.selectedprods
        
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


  AddProduct=()=>{
    // alert( this.state.selectedprods)

    var is_logged = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/product"
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({
        business_id: is_logged,
        product: this.state.selectedprods
      
        
      }),
      
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())

      .then((responseJson) => {

      })
      .catch((error) => {
        alert(JSON.stringify(error));
        console.error(error);
      });


  }


  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
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


   handleChangetproducts =(selectedOptions) => {
     if(selectedOptions){
      this.setState({iscreatedprod: 0});
     this.setState({selectedprods: selectedOptions.label});
     console.log(this.state.selectedprods);
     }
   // alert(selectedOptions)
   }

   handleChangetinputproducts =(selectedOptions) => {
    // let value = Array.from(selectedOptions, option => option.value);
    this.setState({iscreatedprod: 1});
    this.setState({selectedprods: selectedOptions.label});
    console.log(this.state.selectedprods);
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
    if(this.state.Categories&&this.state.Tags&& this.state.Products)
    { 
    
        return (
//           <form onSubmit={this.mySubmitHandler}>
//           <h1>פרסום מבצע </h1>
//           <input
//             type='text'
//             onChange={text => this.setState({deal_name: text.target.value})}
//           />
//           <label className="col-sm-0 control-label"> : שם המבצע <br></br><br></br></label>
//           <label className="col-sm-0 control-label"> : בחר קטגוריות <br></br><br></br></label>
//           <Selectoptions data={this.state.Categories} onChange= {this.handleChangecats} />

//           {/* {
//                             this.state.Categories?.length>0&&
//                             this.state.Categories?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValuescat} id={item.Id} key={key} label={item.Name}/>)
//                         } */}
//           <br></br>
//           <label className="col-sm-0 control-label"> : בחר תגיות לחיפוש מבצע <br></br><br></br></label>
//           {/* {
//                             this.state.Tags?.length>0&&
//                             this.state.Tags?.map((item,key)=><CheckInput checked={item.checked} changeChecked={this.changedCheckedValuestag} id={item.Id} key={key} label={item.Name}/>)
//                         } */}

       
//           <br></br>
//           <Selectoptions data={this.state.Tags} onChange= {this.handleChangetags} />

//           <br></br>
//           <label className="col-sm-0 control-label"> : בחר מוצר למבצע   <br></br><br></br></label>
//           <Selectoptioncreate data={this.state.Products} onChange= {this.handleChangetproducts} onInputChange={this.handleChangetinputproducts}/>

//           {/* <input
//             type='text'
//             onChange={text => this.setState({start_time: text.target.value})}
//             placeholder="09:00 AM"
//             pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
//           /> */}
          
//           <br></br>
//             <TimePicker
//             onChange={time=>this.setState({start_time: time})}
//             value={ this.state.start_time}
//           />
        
//           <label className="col-sm-0 control-label"> : שעת תחילת מבצע <br></br> <br></br></label>

//           {/* <input
//             type='text'
//             onChange={text => this.setState({end_time: text.target.value})}
//             placeholder="09:00 AM"
//             pattern="(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))"
//           /> */}
//             <TimePicker
//             onChange={time1=>this.setState({end_time: time1})}
//             value={ this.state.end_time}
//           />
//           <br></br>

//           <label className="col-sm-0 control-label"> : שעת סיום מבצע <br></br><br></br> </label>
//           <br></br>

//           <input
//             type='number'
//             onChange={text => this.setState({discount: text.target.value})}
//           />
//           <br></br>

//           <label className="col-sm-0 control-label"> : אחוז מבצע  <br></br><br></br></label>
          
           
// {/*     
//           <label>
       
//           <input
//             name="True"
//             type="checkbox"
//             checked={this.state.isGoing}
//             onChange={this.handleInputChange} />
//             <tab></tab> :אחד פלוס אחד <br></br><br></br> 

//         </label> */}

//           <input
//             type='number'
//             onChange={text => this.setState({pcost: text.target.value})}
//             cols="40" rows="20"             

//             required minLength={5} maxLength={50}
//           />
          
//           <label className="col-sm-0 control-label"> : עלות ממוצעת למוצר <br></br><br></br> </label>
          
//           <input
//             type='textarea'
//             onChange={text => this.setState({description: text.target.value})}
//             cols="40" rows="20" placeholder="Desctiption"
//             required minLength={5} maxLength={50}
//           />
//           <label className="col-sm-0 control-label"> :  תיאור מבצע <br></br><br></br> </label>
//           <div>
//             <div>
//               <div>

//                 <img src={this.state.image} />
//                 <input type="file" name="myImage" onChange={this.onImageChange} />
//                 <label className="col-sm-0 control-label"> :  העלאת תמונה <br></br><br></br> </label>
//               </div>
//             </div>
//           </div>
          
//           <input
//             type='submit'
//           />
//           </form>


<div>

<div className="titler">
    <h1>פרסום מבצע </h1>
  </div>
<div className="d-flex flex-row justify-content-between  all-div  ">
  <div className="p-2">
    <div className="preview-div d-flex flex-column">
      <div className="inside-row d-flex flex-row justify-content-start">
        <div className="p-2 "><label className="pic-area"><AiFillPicture size={70} className="missing-pic"/> </label></div>

        <div className=" d-flex flex-column">
          <div className="title-prev d-flex flex-row justify-content-start">
            <div className="p-2 "><label className="">{this.state.deal_name}</label></div>
          </div>
          <div className="desc-prev d-flex flex-row justify-content-start">
            <div className="p-2 "><label className="">{this.state.description}</label></div>
          </div>
          <div style={{marginTop:'50px'}} className="percent-prev d-flex flex-row ">
            <div className="p-2 "><label className="percent-font"><FaPercent className="percent-icon"/>{this.state.discount}</label></div>
            <div className="p-2 "><label className="time-font"><GiSandsOfTime className=""/>30</label></div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div className="p-2 flex-fill ">
  <div>
      <form className="former" onSubmit={this.mySubmitHandler}>

  {/* <div className="titler">
    <h1>פרסום מבצע </h1>
  </div> */}
      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-2 background-name"><input
              type='text'
              placeholder="שם מבצע"
              onChange={text => this.setState({deal_name: text.target.value})}
            />
        </div>
        <div className="p-2"><label className=""> : שם המבצע </label></div>
      </div>

      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-desc ">
            <textarea
              className="input-desc "
              type='textarea'
              onChange={text => this.setState({description: text.target.value})}
              cols="30" rows={3} placeholder="תיאור מבצע"
              required minLength={5} maxLength={50}
            />
        </div>
          <div className="p-2 "><label className=""> : תיאור מבצע </label></div>
      </div>

      <div className="d-flex flex-row justify-content-center spacer ">
        <div className="p-1  background-red">
          <Selectoptions className="selecionopt" data={this.state.Categories} onChange= {this.handleChangecats} />
        </div>
        <div className="p-2 "><label className=""> : בחר קטגוריות </label></div>
      </div>


      <div className="d-flex flex-row justify-content-center spacer ">
        <div className="p-1  selectoption-tags">
        <Selectoptions data={this.state.Tags} onChange= {this.handleChangetags} />
        </div>
        <div className="p-2 "><label className=""> : בחר תגיות לחיפוש מבצע </label></div>
      </div>


      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-product ">
          <Selectoptioncreate data={this.state.Products} onChange= {this.handleChangetproducts} onInputChange={this.handleChangetinputproducts}/>
        </div>
          <div className="p-2 "><label className=""> : בחר מוצר למבצע </label></div>
      </div>


      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-Timer ">
          <TimePicker
              onChange={time=>this.setState({start_time: time})}
              value={ this.state.start_time}
            />
        </div>
          <div className="p-2 "><label className=""> : שעת תחילת מבצע </label></div>
      </div>


      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-Timer2 ">
        <TimePicker
              onChange={time1=>this.setState({end_time: time1})}
              value={ this.state.end_time}
            />
        </div>
          <div className="p-2 "><label className=""> : שעת סיום מבצע </label></div>
      </div>

      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-discount ">
        <input
              type='number'
              placeholder="אחוז מבצע"
              onChange={text => this.setState({discount: text.target.value})}
            />
        </div>
          <div className="p-2 "><label className=""> : אחוז מבצע </label></div>
      </div>

      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-avg ">
        <input
              type='number'
              onChange={text => this.setState({pcost: text.target.value})}
              cols="40" rows="20"           
              placeholder="עלות ממוצאת"  
              required minLength={5} maxLength={50}
            />
        </div>
          <div className="p-2 "><label className=""> : עלות ממוצעת למוצר </label></div>
      </div>





      <div className="d-flex flex-row justify-content-center spacer">
        <div className="p-1  selectoption-img ">
        <input type="file" name="myImage" onChange={this.onImageChange} />
        </div>
          <div className="p-2 "><label className=""> :  העלאת תמונה </label></div>
      </div>

      <img src={this.state.image} />

  <input
    type='submit'
  />
  </form>
  </div>
</div>

</div> 
</div>

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
    // display: 'block',
    // marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
}));
const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
const groupBadgeStyles = {
  // backgroundColor: '#EBECF0',
  // borderRadius: '2em',
  // color: '#172B4D',
  // display: 'inline-block',
  // fontSize: 12,
  // fontWeight: 'normal',
  // lineHeight: '1',
  // minWidth: 1,
  // padding: '0.16666666666667em 0.5em',
  // textAlign: 'center',
};
const groupStyles = {
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'space-between',
};