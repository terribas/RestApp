import React from 'react';
import {View, Text, Button} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import {CLIENT_EDIT_PROFILE, CLIENT_PAYMENT_METHOD} from 'src/consts/screens';


const options = [
  {
    title: 'Editar perfil',
    icon: 'person',
    screen: CLIENT_EDIT_PROFILE
  },
  {
    title: 'Mi tarjeta',
    icon: 'credit-card',
    screen: CLIENT_PAYMENT_METHOD
  }
]



export default function ProfileScreen({navigation, route}) {

    return (
        <View>
        {
            options.map((option, i) => (
            <ListItem key={i} bottomDivider onPress={() => {navigation.navigate(option.screen)}}>
                <Icon name={option.icon} color='#741922'/>
                <ListItem.Content>
                    <ListItem.Title>{option.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            ))
        }
        </View>
    );

}