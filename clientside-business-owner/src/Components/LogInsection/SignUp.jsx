import React from 'react';
import { Component,Fragment   } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { grid } from '@material-ui/system';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';



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
      password: ''
    };
    
    this.onImageChange = this.onImageChange.bind(this);
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
    console.log(this.state.btype)
    
    var apiUrl = "http://localhost:57075/api/businesses"
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
        Btypebus: this.state.btype
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

  handleChange = (event) => {
    this.setState({btype: event.target.value});
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
            <Select defaultValue='cjr '  onChange={this.handleChange}      label="Single select" width={12}
                labelId="demo-customized-select-label"
                id="demo-customized-select" >
                <MenuItem value={0}>בחר סוג עסק</MenuItem>
                <MenuItem value={'מסעדה'}>מסעדה</MenuItem>
                <MenuItem value={'בר מסעדה'}>בר מסעדה </MenuItem>
                <MenuItem value={'בר/מועדון'}>בר/מועדון</MenuItem>
                <MenuItem value={'בית קפה'}>בית קפה </MenuItem>
              </Select>
           
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
                  <input type="file" name="myImage" onChange={this.onImageChange} />
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