import React from 'react'
import { View , Text, TouchableWithoutFeedback} from 'react-native'
import { DealContext} from './Context/DealContext';



const HeaderForDeal = () => {
  const {isShow, dealInfo,  showDeal, coupon} = React.useContext(DealContext);
    console.log(dealInfo)

    CancelDiscount= () => {
        showDeal(false, null, null)
    }
    return (
        
        <View>
          {isShow &&<View><Text>{dealInfo[0].Name}</Text>
         <Text>{dealInfo[0].Description}</Text>
          <Text>{coupon}</Text>
              <TouchableWithoutFeedback onPress={CancelDiscount} >
                <View>
                  <Text >ביטול</Text>
                </View>
              </TouchableWithoutFeedback>
          </View>}
          
        </View>
    )
}


export default HeaderForDeal