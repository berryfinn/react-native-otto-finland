import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
                <TouchableOpacity style={styles.description}>
                    <View style={styles.descriptionRow}>
                        <View style={styles.column1}>
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
                        <View style={styles.column2}>
                            <Text style={styles.button}>Ottaa</Text>
                            <Text style={styles.button}>Reitti</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        backgroundColor: 'lightsteelblue',
        //padding: 5,
        //   opacity: 0.8
    },
    map: {
        flex: 6,
        width: '100%',
        //height: '90%' 
    },
    description: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: colorTalletus,
        padding: 5,
        //paddingBottom: 16
    },
    descriptionRow: {
        flex: 1,
        flexDirection: 'row'
    },
    column1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    column2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'whitesmoke',
        fontSize: 12,
        textTransform: 'capitalize'
    },
    button: {
        color: 'whitesmoke',
        fontSize: 24,
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