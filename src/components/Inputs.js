import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';


export default function Inputs(props) {

    const [isFocused, setIsFocused] = useState(false);

    onFocusChange = () => {
        setIsFocused(true);
    }


    return (
        <View style={[styles.inputContainer, {borderColor: isFocused ? '#0779ef' : '#eee'}]}>
            <Input
                placeholder={props?.placeholder}
                onfocus={onFocusChange}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                secureTextEntry={props?.secureTextEntry}
                leftIcon={
                    <Icon
                        name={props?.icon}
                        size={22}
                        color={isFocused ? '#007e94' : 'grey'}
                    />
                }
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 50,
        borderRadius: 100,
        marginVertical: 10,
        //borderWidth: 3.5
    },

    inputContainer: {
        //borderBottomWitdth: 0
    },

    inputText: {
        color: '#007e94',
        //fontWeigth: 'bold',
        marginLeft: 5
    }
});