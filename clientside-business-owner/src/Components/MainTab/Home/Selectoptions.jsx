import React, { Component, createContext } from 'react';
import Select from 'react-select';


export default class Selectoptions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectOptions:null
         };
          
    
      }

      componentDidMount(){
        this.getOptions();
    }
    
    getOptions=(props)=>{
        console.log(this.props.data)

        console.log(this.props.data)
          const options = this.props.data.map(d => ({
            "value" : d.Id,
            "label" : d.Name
          }))
          this.setState({selectOptions: options})
    }

  
    render(props) {
        console.log(this.props.data)
        
        if(this.state.selectOptions){
            console.log(this.state.selectOptions)
        return (
       
       <div style={{ width: '20%', alignItems: "center",margin:"auto"}}>
       
              
                   <Select style={{ width: '40%', alignItems: "center"}}

                    name="selectOptions"
                    //defaultValue={this.state.selectOptions[1]}
                    isMulti
                    options={this.state.selectOptions}
                    formatGroupLabel={formatGroupLabel}
                    onChange={selectedOptions => this.props.onChange(selectedOptions)}
                    />
            </div>
        );
    
        }
        else
        {
            return(<div>
            <h1>loading</h1></div>
        );
        }
    }
}

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

