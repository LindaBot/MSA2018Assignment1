import * as React from 'react';
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
import './App.css';
import * as mDesign from '@material-ui/core';


interface IState {
  cityName: string,
  results: any,
  button: any
}

export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      cityName: "",
      results: "None",
      button: this.onClick.bind(this),
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
    this.upload()
  }


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
      response.json().then((data:any) => this.changeWeather(data))
    }
    return response
  })
}

public changeWeather(weatherJSON: any){
   console.log(weatherJSON.main.humidity)
}


  public render() {
    return (
      <h1>
      <div className="container-fluid">
        <div className="centreText">
          {/* React components must have a wrapper node/element */}
{/*             <section>
            <mDesign.Input 
              defaultValue={this.state.cityName}
              onChange = {this.updateCityName}
              placeholder="Enter topic here..."/>
            </section> */}
            

            <div>
              <mDesign.FormControl aria-describedby="name-helper-text" className="inputField"> 
                <mDesign.InputLabel htmlFor="name-helper" onChange = {this.updateCityName}>Name</mDesign.InputLabel>
                <mDesign.Input id="name-helper"/>
                <mDesign.FormHelperText id="name-helper-text"><mDesign.TextField onChange = {this.updateCityName}>Enter your city here</mDesign.TextField>
                </mDesign.FormHelperText>
                <mDesign.Button type="submit" className="button" onClick={this.onClick}><h4>Click Me!</h4></mDesign.Button>
              </mDesign.FormControl>
            </div>
          <div className="result">
            <p>{this.state.results}</p>
            <p>{this.state.cityName}</p>
          </div>
        </div>
      </div>
      </h1>
    );
  }
}