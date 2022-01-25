import './App.css';
import 'tachyons';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Rank from './component/Rank/Rank'
import Particles from "react-tsparticles";
import { Component } from 'react';
import Clarifai from 'clarifai';

const options = {
  preset: "links",
};

const app = new Clarifai.App({
  apiKey: 'd635f81a848745c48596e752f525562e'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })

  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        },
        function (err) {

        }
      )

  }

  render() {
    return (
      <div className="App" >
        <Particles className='particles' options={options} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
