import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Buttons from 'src/components/Buttons';
import useAuthContext from 'src/hooks/useAuthContext';
import tr from 'src/language/utils';

import {WAITER_CHANGE_PASSWORD} from 'src/consts/screens';


const options = [
  {
    title: tr("cambiar_pw"),
    icon: 'lock',
    screen: WAITER_CHANGE_PASSWORD
  }
]
export default function ProfileScreen({navigation, route}) {
    const {logOut} = useAuthContext();
    function handleOnLogout() {
        Alert.alert(tr("cerrar_sesion"), tr("confirma_cerrar_sesion"), [
            {
                text: tr("cerrar_sesion"),
                onPress: logOut  
            },
            {
                text: tr("cancelar"),
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
        <View style={styles.topContainer}>
        {
            options.map((option, i) => (
            <ListItem key={i} bottomDivider onPress={() => {navigation.navigate(option.screen)}}>
                <Icon name={option.icon} color='#741922'/>
                <ListItem.Content>
                    <ListItem.Title style={{fontFamily: 'Montserrat-Regular'}}>{option.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            ))
        }
        </View>
        <View style={styles.bottomContainer}>
          <Buttons title={tr("cerrar_sesion")} type='outline' onPress={handleOnLogout}/>
        </View>
        </View>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    flex: 9
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8
  }
})