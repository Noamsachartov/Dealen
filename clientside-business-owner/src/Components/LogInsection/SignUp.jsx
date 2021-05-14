import React from 'react';
import { Component,Fragment, Text  } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { grid } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
import Geocode from "react-geocode";


Geocode.setApiKey("AIzaSyCEsFVwrIkmWHXV6EOJB_mSNu8QTYRxedU");


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Dealen
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      BusinessName: '',
      managerName: '',
      phone: '',
      address: '',
      description: '',
      opentime: '',
      closetime: '',
      email: '',
      password: '',
      latitude:0,
      longitude:0
    };
    
    this.onImageChange = this.onImageChange.bind(this);
  }

  // onImageChange = event => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     console.log(img)
  //     this.setState({
  //       image: URL.createObjectURL(img)
  //     });
  //   }
  // };


  onImageChange = (event) => {
       

    console.log(event.target.files[0]);
    var data = new FormData();
    if (event.target.value.length > 0) {

      var is_logged = 'uri'
      //localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
      is_logged = JSON.parse(is_logged);

        //this.setState({ selectedFile: event.target.files[0].name });
        const file = event.target.files[0];
        console.log(file);
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl);
        this.setState({ imgURL: newUrl })

        data.append("UploadedImage", file);
        data.append("name", is_logged);
        console.log(data)
        console.log("in post img function");

        //this.apiUrl = `http://localhost:54976/api/User/uploadedFiles`;

        this.apiUrl = `http://proj.ruppin.ac.il/igroup49//test2/tar1/api/UploadedFiles/uploadedFiles`;

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

  convertaddress = async () => {
    Geocode.fromAddress(this.state.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({latitude: lat});
        this.setState({longitude: lng})
      },
      (error) => {
        console.error(error);
      }
    );



  }
  mySubmitHandler = (event) => {
    event.preventDefault(); 
    this.convertaddress();
    
    if(this.state.latitude && this.state.longitude){
    
      var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/businesses"
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          bname: this.state.BusinessName,
          manager: this.state.managerName,
          bphone: this.state.phone,
          baddress: this.state.address,
          bdescription: this.state.description,
          opentime: this.state.opentime,
          closetime: this.state.closetime,
          bmail: this.state.email,
          password: this.state.password,
          bimage: this.state.image,
          Btypebus: this.state.btype,
          latitude: this.state.latitude,
          longitude: this.state.longitude

        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert()
          console.log(responseJson);
          window.location = "/Login";

        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.error(error);
        });

      //alert("You are submitting " + this.state.username);
   
    
    }
  }

  handleChange = (event) => {
    this.setState({btype: event.target.value});
    console.log(this.state.btype)

  };


  render() {
    const { classes } = this.props;
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.mySubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="BusinessName"
                variant="outlined"
                required
                fullWidth
                id="BusinessName"
                label="שם בית העסק"
                autoFocus
                onChange={text => this.setState({BusinessName: text.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="managerName"
                label="שם מנהל העסק"
                name="managerName"
                autoComplete="mname"
                onChange={text => this.setState({managerName: text.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="מספר טלפון"
                name="phone"
                autoComplete="phone"
                onChange={text => this.setState({phone: text.target.value})}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="כתובת"
                name="address"
                autoComplete="address"
                onChange={text => this.setState({address: text.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="opentime"
                label="שעת פתיחה"
                name="opentime"
                autoComplete="opentime"
                onChange={text => this.setState({opentime: text.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="closetime"
                label="שעת סגירה"
                name="closetime"
                autoComplete="closetime"
                onChange={text => this.setState({closetime: text.target.value})}
              />
            </Grid>
            <Grid item xs={12} >
              <Select            labelId="demo-simple-select-label"
          id="demo-simple-select"       label="שעת סגירה" value={this.state.btype}
   variant="outlined"
                required
                fullWidth defaultValue={0}  onChange={this.handleChange}      label="Single select" width={12}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select" >
                  <MenuItem value={0}>בחר סוג עסק*</MenuItem>
                  <MenuItem value={1}>מסעדה</MenuItem>
                  <MenuItem value={2}>בר מסעדה </MenuItem>
                  <MenuItem value={3}>בית קפה </MenuItem>
                </Select>
            </Grid>

            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label=" תיאור"
                name="description"
                autoComplete="description"
                onChange={text => this.setState({description: text.target.value})}
              />  
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="כתובת מייל"
                name="email"
                autoComplete="email"
                onChange={text => this.setState({email: text.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={text => this.setState({password: text.target.value})}
              />
            </Grid>
            <Grid>
              <div>
                  <img src={this.state.image} />
                  <input type="file" accept="image/*" id="icon-button-file" capture="environment" onChange={this.onImageChange} ref={fileInput => this.fileInput = fileInput} />
                  <label className="col-sm-0 control-label"> :  העלאת תמונה <br></br><br></br> </label>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
}
export default withStyles(useStyles)(SignUp)