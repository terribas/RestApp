import React from 'react';
import {View, Text} from 'react-native';
import InputSpinner from 'react-native-input-spinner';


export default function ClientProductListItem({product, amount, onAmountChanged}) {
    return (
        <View>
            <Text>Producto {product?.name} con precio {product?.price}</Text>
            <InputSpinner
                max={10}
                min={0}
                step={1}
                value={amount}
                onIncrease={onAmountChanged}
                onDecrease={onAmountChanged}
                //onChange={onAmountChanged}
            />
        </View>
    );
}