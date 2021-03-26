import React from 'react';


const initialState = {
    isShow: false,
    dealInfo: null,
    coupon: null
}

const actionTypes = {
    SHOW_DEAL: 'SHOW_DEAL'
}



export const DealContext = React.createContext(initialState);

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SHOW_DEAL:

                return {...state, ...action.payload}
    
        default:
            return state
    }
}

export const DealContextProvider = ({ children }) => {
    const [state, setState] = React.useReducer(reducer, initialState);

    const showDeal = (isShow, dealInfo, coupon) => {
        setState({
            type: actionTypes.SHOW_DEAL,
            payload: {isShow, dealInfo, coupon}
        })
    }

    React.useEffect(() => {
      console.log('isShow: ', state.isShow);
    }, [state.isShow])

    return (
        <DealContext.Provider
          value={{
            ...state,
            showDeal
          }}
        >
          {children}
        </DealContext.Provider>
      );
}