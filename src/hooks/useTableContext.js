import React, {useContext} from 'react';
import TableContext from 'src/contexts/TableContext';


export default function useTableContext() {
    return useContext(TableContext);
}