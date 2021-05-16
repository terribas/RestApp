import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Input} from 'react-native-elements';

Icon.loadFont();

export default function Inputs(props) {
   
    return (
        <Input
            containerStyle={{ width: props.width ?? '90%' }}
            inputContainerStyle={{ borderBottomColor: props.color ?? '#60BBDB' }}
            leftIcon={<Icon name={props.leftIcon} size={20} color={props.color ?? '#60BBDB'}/>}
            leftIconContainerStyle={{ marginRight: 5 }}
            rightIcon={props.rightIcon && <Icon name={props.rightIcon} size={20} color={props.color ?? '#60BBDB'} onPress={()=>{props.onChangeText('')}}/>}
            placeholder={props.placeholder}
            value={props.value}
            secureTextEntry={props.isPassword ?? false}
            keyboardType={props.keyboardType ?? 'default'}
            onChangeText={props.onChangeText}
        />

    );
}



/*
    <Inputs
        containerStyle={{ width: "90%" }}
        inputContainerStyle={{ borderBottomColor: '#60BBDB' }}
        leftIcon={<Icon name="mail-outline" size={20} color='#60BBDB'/>}
        leftIconContainerStyle={{ marginRight: 5 }}
        rightIcon={<Icon name="close" size={20} backgroundColor='white' color='#60BBDB' onPress={()=>{setText('')}}/>}
        placeholder="Email"
        value={text}
        secureTextEntry={true}
        keyboardType='default'
        onChangeText={setText}
    />

*/

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