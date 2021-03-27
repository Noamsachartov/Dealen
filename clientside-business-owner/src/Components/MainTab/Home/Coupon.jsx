import React from 'react';
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

class Coupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupon_code: '',
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault(); 

    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/DealInCust/used/" + this.state.coupon_code;
    fetch(apiUrl, {
      method: 'PUT',
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

    alert("You are submitting " + this.state.coupon);
  }

  render() {
    return (
        <div>
            <form onSubmit={this.mySubmitHandler}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    
                    id="coupon_code"
                    label="קוד קופון"
                    name="coupon_code"
                    autoFocus
                    onChange={text => this.setState({coupon_code: text.target.value})}
                />
                <br />
                <Button
                    type="submit"
                    
                    variant="contained"
                    color="primary"
                    
                >שלח</Button>
            </form>
        </div>
    );
    }
}
export default Coupon