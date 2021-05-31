import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Texts(props) {
    return (
        <Text
            {...props}
            style={[{
                fontFamily: props.bold ? 'Montserrat-Bold' : props.semibold ? 'Montserrat-SemiBold' : 'Montserrat-Regular',
                textAlign: props.center ? 'center' : 'left'
            },
                props.h1 && styles.h1Style,
                props.h2 && styles.h2Style,
                props.h3 && styles.h3Style,
                props.h4 && styles.h4Style,
                props.h5 && styles.h5Style,
                props.color && {color: props.color}
            ]}
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
    },
    h5Style: {
        fontSize: 14
    }
})