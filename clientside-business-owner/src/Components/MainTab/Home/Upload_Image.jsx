import React, { Component } from "react";

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
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
    console.log(this.state.image)

  };

  render() {
    return (
      <div>
        <div>
          <div>
            <img src={this.state.image} />
            <h1>העלאת תמונה</h1>
            <input type="file" name="myImage" onChange={this.onImageChange} />
            {/* <input type="file" accept="image/*" id="icon-button-file" capture="environment" onChange={this.onImageChange} ref={fileInput => this.fileInput = fileInput} /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayImage;
