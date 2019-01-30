import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { colorOtto, colorTalletus } from '../constants';

class DetailsScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'otto'),
            
            headerStyle: {
                backgroundColor: colorOtto,
                headerTintColor: colorTalletus,
                headerTitleStyle: {
                    fontWeight: 'normal'
                }
            }
        };
    };


    render() {

        const { navigation } = this.props;
        const item = navigation.getParam('item', null);
        const lat = Number(item.lat);
        const lon = Number(item.lon);

        return (
            <View style={styles.page}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }} >
                    <Marker coordinate={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    }}
                        title={item.address}
                        description={item.city}
                    />
                </MapView>
                <View style={styles.description}>
                    <Text style={styles.text}>
                        {item.address}, {item.city}
                    </Text>
                    <Text style={styles.text}>
                        {item.place}
                    </Text>
                    <Text style={styles.text}>
                        {sType(item.type)}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: 'lightsteelblue',
        //padding: 5,
        //   opacity: 0.8
    },
    map: {
        flex: 5,
        width: '100%',
        //height: '90%' 
    },
    description: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colorTalletus,
        padding: 5
    },
    text: {
        color: 'whitesmoke',
        fontSize: 16,
        textTransform: 'capitalize'
    }
})

function sType(type) {
    var sType = '*';
    switch (type) {
        case 'o':
            sType = 'Otto';
            break;
        case "o+":
            sType = 'OttoPlus';
            break;
        case 't':
            sType = 'Talletus';
            break;
        case 'p':
            sType = 'Puhetuettu Otto';
            break;
        case 'ep':
            sType = 'Esteetön ja puhetuettu Otto';
            break;
        default:
            sType = 'Otto';
            break;
    }
    return sType;
}

export { DetailsScreen };