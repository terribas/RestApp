import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Buttons({title, onPress, disabled, loading, type, icon}) {
    return (
        <Button
            title={title}
            titleStyle={{color: type === 'outline' ? '#741922' : 'white', fontFamily: 'Montserrat-Medium'}}
            buttonStyle={{backgroundColor: type === 'outline' ? 'white' : '#741922'}}
            containerStyle={{borderWidth: 0.5, borderColor: '#741922', borderRadius: 2}}
            onPress={onPress}
            disabled={disabled}
            loading={loading}
            icon={icon &&
                <Icon
                    name={icon}
                    size={15}
                    color='white'
                    style={{marginRight: 10}}
                />
            }
            />
    );
}


const styles = StyleSheet.create({
})