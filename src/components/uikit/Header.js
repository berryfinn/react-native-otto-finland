import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colorOtto} from '../../../src/constants';

const Header = ({text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}> { text } </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding: 10,
        alignItems: 'center'
    }, 
    h1: {
        fontSize: 22, 
        color: 'gold'
    }
})

export  {Header};