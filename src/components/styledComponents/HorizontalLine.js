import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HorizontalLine = () => {
    return (
        <View style={styles.lineView}>
            <View style={styles.horizonLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    lineView : {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10,
    },
    horizonLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#bcbcbc',
    }
})