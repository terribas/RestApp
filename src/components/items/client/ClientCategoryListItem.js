import React, {useEffect} from 'react';
import {Chip} from 'react-native-elements';


export default function ClientCategoryListItem({category, type, onPress}) {

    return (
        <Chip title={category?.name ?? 'Categoría'} onPress={onPress} type={type ?? 'outline'} style={{marginLeft: 10, marginRight: 5}}/>
    );
}