import React from 'react';
import { View, Button, Alert } from 'react-native';

const TabItem = ({bundle}) => {
    return (
        <View style={{ flex: 1, backgroundColor: bundle.background }} > 
            <Button
                onPress={() => {
                    Alert.alert('You tapped the button!');
                }}
                title={bundle.title}
                color={bundle.color}
            />
        </View>
    )
}

export  {TabItem};