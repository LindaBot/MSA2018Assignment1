import * as React from 'react';
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
import './App.css';
import * as mDesign from '@material-ui/core';
// import * as mDesignIcons from '@material-ui/icons';
import WeatherIcon from 'react-icons-weather';



interface IState {
  cityName: string,
  results: any,
  button: any,
  response: any
}

export default class App extends React.Component<{}, IState>{

  constructor(props: any) {
    super(props)
    this.state = {
      cityName: "",
      results: "None",
      button: this.onClick.bind(this),
      response: JSON
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
  const link = "https://api.openweathermap.org/data/2.5/weather?q="+this.state.cityName+"&appid=90b7a75261e2258ad5f148f7536d3411&units=metric"
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
  this.setState({
    response : weatherJSON
  })
  console.log(weatherJSON.main)
  console.log(weatherJSON.weather[0].main)
  console.log(weatherJSON.weather[0].icon)
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
                <mDesign.InputLabel htmlFor="name-helper" onChange = {this.updateCityName} defaultValue="brazil">Name</mDesign.InputLabel>
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
        <div>
          { 
            this.state.response === JSON ?

          
            <div>
            <p>THere is something</p>
          </div>
          
          :

          <div>
          <mDesign.List>

            <mDesign.ListItem>
              <mDesign.Avatar>
              <WeatherIcon name="owm" iconId={JSON.stringify((this.state.response.weather[0].id))} flip="horizontal" rotate="90" />
              </mDesign.Avatar>
              <mDesign.ListItemText primary="Weather" secondary={JSON.stringify((this.state.response.weather[0].main))}/>
            </mDesign.ListItem>

            <mDesign.ListItem>
              <mDesign.Avatar>
              <i className="wi wi-humidity"/>   
              </mDesign.Avatar>
              <mDesign.ListItemText primary="Humidity" secondary={JSON.stringify((this.state.response.main.humidity))}/>
            </mDesign.ListItem>

            <mDesign.ListItem>
              <mDesign.Avatar>
              <i className="wi wi-thermometer"/>   
              </mDesign.Avatar>
              <mDesign.ListItemText primary="Temp" secondary={JSON.stringify((this.state.response.main.temp))}/>
            </mDesign.ListItem>

          </mDesign.List>

          </div>
          }
      </div>
      </div>
      </h1>
    );
  }
}