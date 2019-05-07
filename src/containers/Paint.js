import React, {Component} from 'react'

import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Button,
  Image,
  Alert,
  Dimensions
} from 'react-native'

// import Palette from 'react-native-palette-full';
import {getAllSwatches} from 'react-native-palette'
import ImagePicker from 'react-native-image-picker'

export class Paint extends Component {
    constructor(props){
        super(props);
        updateImage = updateImage.bind(this);
        this.state = { 
          isLoading: true,
          canUpdate: false,
          data: null,
          jsonLength: 0,
          // imageUrl: "https://images.unsplash.com/photo-1439930545933-289862b93eb6?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjQzMjI0fQ"
          // imageUrl: "https://media.farandwide.com/1d/f4/1df4065788dc47c082cf829829e71a72.jpg"
          imageUrl: require("../../assets/loginLogo.png"),
          colors: [],
          population: []
        }
    }

    

    componentDidMount(){
      // const that = this
      // const URL = "https://api.unsplash.com/photos/random?client_id=bc37901814227d25f99ac03155e0e111c458e496b2d2bd6a14dab630e5568247&count=30&orientation=landscape&query=nature";
      // fetch(URL)
      //   .then((res) => res.json())
      //   .then((responseJson) => that.setState({data : responseJson}))

      // // 
    }

    alertMe = (a) => {
      Alert.alert(
        a,
        'My Alert Msg',
        [
          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }


    clearArrays = () => {
      this.setState({colors : []})
      this.setState({population : []})
    }

    getColor = () => {
      // const person = {
      //   threshhold: false,
      //   quality: "low"
      // }
      console.log("inGetColor")
      ImagePicker.launchImageLibrary({}, (response)  => {
        var path =  Platform.OS === 'ios' ? response.origURL : response.path;
        // var path =  Platform.OS === 'ios' ? response : response;
        // this.alertMe(JSON.stringify(path))
        const source = { uri: response.uri };
        this.setState({imageUrl : source})
        this.clearArrays()
        getAllSwatches({}, path, (error, swatches) => {
          if (error) {
            console.log(error);
          } else {
            swatches.sort((a, b) => {
              return b.population - a.population;
            });
            
            swatches.forEach((swatch) => {
              // this.alertMe(JSON.stringify((swatch.color)))
              this.setState({colors: [...this.state.colors, swatch.color]})
              this.setState({population: [...this.state.population, swatch.population]})
            });
          }
        });
      });
      // this.alertMe(JSON.stringify(Palette.getNamedSwatches("../../assets/loginBackground.jpg")))
    }

    getArrays = () => {
      this.alertMe(JSON.stringify(this.state.colors))
      this.alertMe(JSON.stringify(this.state.population))
    }

    colorsList = () => {
      return this.state.colors.map((data, index) => {
        return (
          <View key={index} style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 100, height: 100, backgroundColor: data}}><Text>{this.state.population[index]}</Text></View>
        )
      })
  
  }

    render() {
      
      // console.log(this.state.data)
      // if (this.state.data != null){
        // this.setState({jsonLength : Object.keys(this .state.data).length})
        // console.log(this.state.jsonLength)
        const path = "../../assets/loginBackground.jpg"
        // console.log(person)
        // this.setState({imageUrl: "../../assets/loginLogo.png"})
        
      // }

      // pickerCallback = message => {
      //   if (message && message.nativeEvent && message.nativeEvent.data) {
      //     console.log(message.nativeEvent.data); // response from ImageColorPicker
      //   }
      // };
      
      const dimensions = Dimensions.get('window')
      const imageHeight = Math.round(dimensions.width * 9 / 16)
      const imageWidth = dimensions.width

      return (
        

        <View style={styles.container}>
          <Image 
            style={{width: imageWidth, height: imageHeight}}
            // source={{uri: this.state.imageUrl}}
            source={this.state.imageUrl}
            key={this.state.imageUrl}
          />
          <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.colorsList()}
          </View>
          <Button
            title="hi"
            // onPress={() => this.setState({imageUrl : this.state.data[0].urls.full})}
            onPress={this.getColor}
          />
          <Button
            title="hi"
            // onPress={() => this.setState({imageUrl : this.state.data[0].urls.full})}
            onPress={this.getArrays}
          />
        </View>
      );
    }
  }

  
  setDataState = (resJson) => {
    this.setState({data : resJson})
    console.log(resJson)
  }

  updateImage = () => {
    // this.setState({imageUrl : "https://images.unsplash.com/photo-1464973184257-e8780a4bb226?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjQzMjI0fQ"})
  }

    // .then(() => {
    //   console.log(this.state.data);
    // })
    // .catch((error) =>{
    //   console.log("something went wrong")
    // })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      marginTop: 44

    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });