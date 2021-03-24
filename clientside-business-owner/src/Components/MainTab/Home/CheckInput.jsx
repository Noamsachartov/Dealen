import React from 'react';
import {Form} from 'react-bootstrap'

const CheckInput = (props) => {
    const getValue=(event)=>{
        props.changeChecked(event.target.id,event.target.checked);
    }
    return ( 
        <Form.Check 
            type='checkbox'
            id={props.id}
            checked={props.checked}
            value={props.label}
            label={props.label}
            onChange={getValue}
        />
     );
}
 
export default CheckInput;