# Otto Finland
Find the nearest ATM machine in Finland. React Native project for mobile phone.
## At first to get geolocation
In file App.js:
```js
  state = {
    latitude: null,
    longitude: null,
    error: null
};
```
Good place to get location in componentDidMount() function (App.js)
```js
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        this.setState({ error: error.message });
        console.log('error: ', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
}
```
And view coordinats: (in App.js)
```js
  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
```
