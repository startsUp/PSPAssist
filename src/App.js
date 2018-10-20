import React, { Component } from 'react';
import './App.css';
import Keyboard from 'react-simple-keyboard';
import './index.css';


class App extends Component{
  state = {
    layoutName: "ABC",    //Initial state will be the alpabetical keybaord
    input: ""             //Initial input screen will be clear
  };

  onChange = input => {
    if(input == "common" || input === "clear" || input ==='{EMERGENCY}')  //Gets called when a key is pressed on the keyboard and sets the state
      return;
    this.setState({
      input: input
    });
    console.log("Input changed", input);
    document.getElementById('input').focus()
  };


  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * Handles for different button cases
     */

    if (button === "{common}") this.handleCommon();    
    if (button === "{clear}") this.handleClear();
    if (button === "{EMERGENCY}") this.handleEmergency();    
    if (button === "{ABC}") this.handleABC();  
    if (this.state.layoutName === "EMERGENCY") {
      this.handleClear()
      this.emergency()
    };
  };

  handleABC = () => {
    let layoutName = this.state.layoutName;
    if(this.state.layoutName == "common"){    
      this.setState({
      layoutName: layoutName === "common" ? "ABC" : "common" //If user is in the common state, this will switch them into the ABC state if they hit ABC
      });
    }
    else{
      this.setState({
        layoutName: layoutName === "EMERGENCY" ? "ABC" : "EMERGENCY"  //If user is in the emergency state, this will switch them into the ABC state if they hit ABC   
      });
    }                
  };

  handleCommon = () => {
    let layoutName = this.state.layoutName;
    if(this.state.layoutName == "EMERGENCY"){  //If user is in the Emergency state, this will switch them into the common state if they hit common
      this.setState({
        layoutName: layoutName === "EMERGENCY" ? "common" : "EMERGENCY"
      });      
    }
    else{
      this.setState({
        layoutName: layoutName === "ABC" ? "common" : "ABC"
      });
    }
  };

  handleClear = () => {
    this.keyboard.clearInput();  //If user is in any state, this clears the keyboard input
    document.getElementById('input').value = '';
  };

  handleEmergency = () =>{
    let layoutName = this.state.layoutName;
    if(this.state.layoutName == "common"){
      this.setState({
        layoutName: layoutName === "common" ? "EMERGENCY" : "common"
      });      
    }
    else{
      this.setState({
        layoutName: layoutName === "ABC" ? "EMERGENCY" : "ABC"
      });
    }
  };

  emergency = () =>{
      this.keyboard.clearInput();
      document.getElementById('input').value = '';
      let audio = new Audio('./SFX-Beep-Alarm.mp3'); //This will ideally play a certain alarm sound when any button in emergency is pressed 
      audio.play()
      .then()
      .catch(e => console.log(e))
      var emergencyType = new SpeechSynthesisUtterance(this.state.input);
      window.speechSynthesis.cancel();
      for (var i = 0; i < 3; i++){
        window.speechSynthesis.speak(emergencyType);
      }
    }
  
    
  speakText = () => {
    var msg = new SpeechSynthesisUtterance(this.state.input);  //Converts this keyboard input object into speech
    window.speechSynthesis.speak(msg);
  }
  
  render() {    //creates the keyboard object and loads the icons, and layouts 
    var svgIcon = <svg id='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.459 87.459">
        <path d="M37.44 73.283H7.694V55.66A23.819 23.819 0 0 1 0 38.09c0-13.186 10.728-23.913 23.913-23.913 10.765 0 20.254 7.251 23.074 17.634l.088.32.178 3.921 7.217 10.12-6.344 4.608v3.524c0 4.244-3.453 7.698-7.7 7.698h-2.985l-.001 11.281zm-23.746-6H31.44V56.004h8.985c.938 0 1.7-.763 1.7-1.699v-6.58l4.006-2.91-4.794-6.72-.227-5.016c-2.214-7.612-9.241-12.9-17.198-12.9-9.877 0-17.913 8.036-17.913 17.913 0 5.4 2.402 10.458 6.591 13.877l1.103.9.001 14.414zM61.152 56.972L56.91 52.73c2.706-2.707 2.706-7.111-.001-9.819l4.244-4.242c5.045 5.046 5.045 13.258-.001 18.303z"/><path d="M69.251 63.361l-4.242-4.242c6.229-6.229 6.229-16.366 0-22.596l4.242-4.242c8.567 8.569 8.567 22.512 0 31.08z"/>
        <path d="M78.555 69.351l-4.244-4.242c9.531-9.533 9.531-25.043.002-34.575l4.242-4.242c11.872 11.869 11.872 31.186 0 43.059z"/>
        </svg>;
    var btThemes = [
      {
        class: "hg-red",
        buttons: "{EMERGENCY}"
      }]
    return (
      <div className='app-container'>
        <div id='input-area'>
        <input
          id='input'
          value={this.state.input}
      
          placeholder={"What do you want to say Don?"}
        />
        <div onClick={this.speakText} className='speak'>{svgIcon}</div>
        </div> 
        
        <Keyboard
          ref={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          layout={{            //The various keyboard states and layouts

            ABC: [
                '1 2 3 4 5 6 7 8 9 0 {bksp}',
                'Q W E R T Y U I O P',
                '{clear} A S D F G H J K L {enter}',
                '{common} Z X C V B N M ? {EMERGENCY}',
                '{space}'
              ],
              common:[
                'OhYeah Wow Great Bad Good Sad Alright',
                'Hi Bye Sorry Thanks Pardon Nevermind',
                'Yes No Why What Who Where How Help',
                '{ABC} {space} {clear} {EMERGENCY} {bksp}'
              ],
              EMERGENCY:[
                'HUNGRY THIRSTY BATHROOM HELP',
                'Water PhoneCall TV',
                '{common} {ABC} {clear} {bksp}'               
              ],
            }}
          onChange={input => this.onChange(input)}        
          onKeyPress={button => this.onKeyPress(button)}
            />
      </div>
    )
  }

}

export default App;
