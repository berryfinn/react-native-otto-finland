import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colorTalletus } from '../../constants';

function distanceKM(distance) {
    var dist = distance + 0;
    if (dist < 1000) {
        dist = Math.round(dist) + ' m';
    } else {
        dist = Math.round(dist / 100) / 10 + ' km';
    }
    return dist;
}

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
            sType = 'Esteetön ja puhetuettu';
            break;
        default:
            sType = 'Otto';
            break;
    }
    return sType;
}

const ListItem = ({ data }) => {
    return (
        <View style={styles.container}>
            <View style={styles.col1}>
            <Text style={styles.distance}>{distanceKM(data.distance)}</Text>
            </View>
            <View style={styles.col2}>
                <Text style={styles.title}>{data.address}, {data.city}</Text>
                <Text style={styles.text}>{data.place}</Text>
                <Text style={styles.text}>{sType(data.type)}</Text>
            </View>
            {/* <View style={styles.col3}>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        //padding: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'steelblue',
        borderBottomWidth: 1
    },
    col1: {
        flex: 1,
        padding: 10
    },
    col2: {
        flex: 3,
        padding: 10
    },
    // col3: {
    //     flex: 1,
    //     padding: 10
    // }, 
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colorTalletus, 
        textTransform: 'capitalize'
    }, 
    text: {
        fontSize: 12,
        color: colorTalletus,
        textTransform: 'capitalize'
    },
    distance: {
        fontSize: 14,
        fontWeight: 'bold', 
        textAlign: 'right',
        color: colorTalletus
    }
})

export { ListItem };