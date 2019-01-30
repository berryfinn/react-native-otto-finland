import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, Text,
  TouchableHighlight
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';

import { colorOtto, colorTalletus } from './src/constants';
import { Header, ListItem } from './src/components/uikit';
import { DetailsScreen } from './src/pages';

const url = 'https://go-shopping.fi/otto/atms.php';
// lat=61.0526909&lon=28.1010841

class HomeScreen extends Component {

  state = {
    latitude: null,
    longitude: null,
    error: null,
    data: [],
    spinner: false
  };

  static navigationOptions = {
    title: 'OTTO',
    headerStyle: {
      backgroundColor: colorOtto,
    },
    headerTintColor: colorTalletus,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  getData = async (lat, lon) => {
    param = '';
    this.setState({ spinner: true });
    if (lat != null && lon != null) {
      param = '?lat=' + lat + '&lon=' + lon;
    }
    try {
      const response = await fetch(url + param);
      const fullData = await response.json();
      const data = fullData.result;
      this.setState({ data });
      console.log('ready: ', data);
      this.setState({ spinner: false });
    } catch (e) {
      this.setState({ spinner: false });
      throw e;
    }
  }

  onPress = () => {
    alert('pressed');
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log('latitude: ' + position.coords.latitude);
        this.getData(this.state.latitude, this.state.longitude);
      },
      (error) => {
        this.setState({ error: error.message });
        console.log('error: ', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    console.log('render.data: ', this.state.data);

    if (this.state.error == null) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.page} >
            <Header text={'Missä lähin otto on?'} />
            <ScrollView>
              <View style={styles.listStyle}>
                {this.state.data.map(item => (
                  <TouchableHighlight key={item.number}
                    onPress={() => this.props.navigation.push('Details',
                      { item: item, title: item.address.toUpperCase() })}>
                    <ListItem data={item} />
                  </TouchableHighlight>
                ))
                }
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.errPage} >
            <Header text={'Missä lähin otto on?'} />
            <View style={styles.errBox}>
              <Text style={styles.ErrTitle}>In order to see list of nearest ATMs you need enable location.</Text>
              <Text style={styles.ErrText}>Go to Settings App > OTTO > Locations and enable locations services from there.</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  page: {
    flex: 2,
    backgroundColor: colorTalletus,
  },
  listStyle: {
    backgroundColor: 'white',
    padding: 5,
    //opacity: 0.8
  },
  errPage: {
    flex: 2,
    backgroundColor: colorTalletus,
    alignContent: 'center',
    alignItems: 'center'
  },
  errBox: {
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ErrTitle: {
    padding: 10,
    color: 'red',
    fontSize: 16
  },
  ErrText: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 10

  }
})

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}