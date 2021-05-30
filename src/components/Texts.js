import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';


export default function Texts(props) {
    return (
        <Text
            {...props}
            style={{
                fontFamily: props.bold ? 'Montserrat-Bold' : props.semibold ? 'Montserrat-SemiBold' : 'Montserrat-Regular',
                textAlign: props.center ? 'center' : 'left'
            }}
            h1Style={styles.h1Style}
            h2Style={styles.h2Style}
            h3Style={styles.h3Style}
            h4Style={styles.h4Style}
            >
            {props.children}
        </Text>
    );
}


const styles = StyleSheet.create({
    h1Style: {
        fontSize: 38
    },
    h2Style: {
        fontSize: 26
    },
    h3Style: {
        fontSize: 22
    },
    h4Style: {
        fontSize: 18
    }
})