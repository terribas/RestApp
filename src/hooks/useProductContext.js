import React, {useContext} from 'react';
import ProductContext from 'src/contexts/ProductContext';


export default function useProductContext() {
    return useContext(ProductContext);
}