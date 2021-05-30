import React from 'react';
import {Chip} from 'react-native-paper';


export default function WaiterCategoryListItem({category, mode, onPress}) {

    return (
        <Chip
            onPress={onPress}
            mode={mode}
            style={{
                backgroundColor: mode == 'flat' ? '#741922' : 'white',
                borderWidth: 1.5,
                marginLeft: 10,
                alignItems: 'center',
                borderColor: '#741922',
                height: '95%'
            }}
            textStyle={{
                color: mode == 'flat' ? 'white' : '#741922',
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
                textTransform: 'uppercase'
            }}
            >
            {category}
            </Chip>
    );
    
}