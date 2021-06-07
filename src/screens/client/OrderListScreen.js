import React from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import LoadingScreen from 'src/screens/status/LoadingScreen';
import ClientOrderListItem from 'src/components/items/client/ClientOrderListItem';
import Texts from 'src/components/Texts';
import useMyOrders from 'src/hooks/useMyOrders';
import tr from 'src/language/utils';

export default function OrderListScreen({navigation, route}) {
    
    const {isLoading, isSuccess, data} = useMyOrders();

    if (isLoading) return (<LoadingScreen message={tr('cargando_pedidos')} />)

    if (!isSuccess) {
        Alert.alert(tr('error_cargando_pedidos'));
        navigation.goBack();
        return <View />;
    }
    
    return (
        <View style={styles.container}>
            <Texts h3 semibold>{tr("tus_pedidos")}</Texts>
            <View style={{marginTop: 5}} />
            <FlatList
                keyExtractor={item => item._id}
                data={data}
                renderItem={({item}) => (
                    <ClientOrderListItem order={item} />
            )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },

})