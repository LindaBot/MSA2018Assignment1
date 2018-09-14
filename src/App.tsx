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
  response: any,
  open: any
}

export default class App extends React.Component<{}, IState>{


  constructor(props: any) {
    super(props)
    this.state = {
      cityName: "",
      results: "None",
      button: this.onClick.bind(this),
      response: JSON,
      open: false
    }

    this.onClick = this.onClick.bind(this);
    this.updateCityName = this.updateCityName.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
      this.handleClickOpen()
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

public handleClickOpen(){
  this.setState({ open: true });
}

public handleClose(){
  this.setState({ open: false });
}

  public render() {
    return (
      <div>
        <mDesign.Button onClick={this.handleClickOpen}>Open alert dialog</mDesign.Button>
        
        <mDesign.FormHelperText id="name-helper-text"><mDesign.TextField onChange = {this.updateCityName}>Enter your city here</mDesign.TextField>
                </mDesign.FormHelperText>
                <mDesign.Button type="submit" className="button" onClick={this.onClick}><h4>Click Me!</h4></mDesign.Button>
        
        <mDesign.Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <mDesign.DialogTitle id="alert-dialog-title">{"Weather in " + JSON.stringify(this.state.response.name)}</mDesign.DialogTitle>
          <mDesign.DialogContent>
          <div>
          { 
            this.state.response === JSON ?

          
            <div/>
/*               <p>THere is something</p>
            </div> */
          
          :

          <div className = "width80">
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
          </mDesign.DialogContent>
          <mDesign.DialogActions>
            <mDesign.Button onClick={this.handleClose} color="primary">
              Close
            </mDesign.Button>
          </mDesign.DialogActions>
        </mDesign.Dialog>
      </div>
      
    );
  }
}