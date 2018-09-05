import * as React from 'react';
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
import './App.css';

// import { FormsModule } from '@angular/forms';
// import CircularProgress from '@material-ui/core/CircularProgress';


interface IState {
  cityName: string,
  results: any,
  button: any,
  topicBox: any
}

export default class App extends React.Component<{}, IState>{

/*   constructor(props: any) {
    super(props)
    this.state = {
      imageFiles: [],
      results: "",
      dropzone: this.onDrop.bind(this)
    }
  } */

  constructor(props: any) {
    super(props)
    this.state = {
      cityName: "",
      results: "None",
      button: this.onClick.bind(this),
      topicBox: this.refs.topicBox
    }

    this.onClick = this.onClick.bind(this);
    this.updateCityName = this.updateCityName.bind(this);
  }

  public updateCityName(event: any){
    console.log(event.target.value);
    this.setState({
      cityName: event.target.value,
      results: ""
    })
  }


  public onClick() {
    this.setState({
      cityName: "Auckland",
      results: ""
    })
    this.upload()
  }

/*   public upload(base64String: string) {
    fetch('https://danktrigger.azurewebsites.net/api/dank', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        file: base64String,
      })
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: data[0].class}))
      }
      return response
    })
  }
 */


public upload() {
  const link = "https://api.openweathermap.org/data/2.5/weather?q="+this.state.cityName+"&appid=90b7a75261e2258ad5f148f7536d3411"
  fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    }
  })
  .then((response : any) => {
    if (!response.ok) {
      this.setState({results: response.statusText})
    }
    else {
      // response.json().then((data:any) => this.setState({results: data[0].class}))

      // response.json().then((data:any) => this.setState({results: JSON.stringify(data)}))
      
      response.json().then((data:any) => this.setState(
        {
           results: JSON.stringify(data.weather[0].main)   
          // results: this.refs.input.city.value  
        }))
      
    }
    return response
  })
}


  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          {/* React components must have a wrapper node/element */}
          <div className="dropZone">
            <form action="/action_page.php">
              {/* <input type="text" ref="city" name="input" onChange = {this.handleChange}/> */}

              <input 
                // onChange={this.handle.bind(this)}
                defaultValue={this.state.cityName}
                onChange = {this.updateCityName}
                type="topicBox"
                id="topicBox"
                name="topicBox"
                placeholder="Enter topic here..."/>

              <button type="button" onClick={this.onClick}>Click Me!</button>
            </form>
          </div>
          <div  className="dank">
            <p>{this.state.results}</p>
            <p>{this.state.cityName}</p>
          </div>
        </div>
      </div>
    );
  }
}