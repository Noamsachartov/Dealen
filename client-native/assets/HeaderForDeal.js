import React, { useState } from 'react'
import { View , Text, TouchableWithoutFeedback} from 'react-native'
import { DealContext} from './Context/DealContext';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import CancelIcon from 'react-native-vector-icons/MaterialIcons';


const HeaderForDeal = () => {
  const {isShow, dealInfo,  showDeal, coupon} = React.useContext(DealContext);
    console.log(dealInfo)
const [viewHeight, setHeight] = useState(35);
const [details, setdetails] = useState(false);
const [title, setTitle] = useState('פרטי מבצע נבחר');
const [arrow, setarrow] = useState('keyboard-arrow-down');
    CancelDiscount= () => {
        showDeal(false, null, null)
    }
    OpenView= () => {
        console.log("123")
        if (viewHeight == 175){
            setarrow('keyboard-arrow-down')
            setTitle('פרטי מבצע נבחר')
            setHeight(35)
            setdetails(false)
        }else if (viewHeight == 35){
            setarrow('keyboard-arrow-up')
            setHeight(175)
            setdetails(true)
            setTitle('')
        }

    }
    return (
        
        <View>
    
          {isShow &&
          <View style={{ height: viewHeight, backgroundColor: '#003f5c'}}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableWithoutFeedback onPress={OpenView}>
                            <ArrowIcon color={'whitesmoke'} name={arrow} size={40} />
                </TouchableWithoutFeedback>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color:'whitesmoke'}}>{title}</Text>
                    </View>
            </View>
            
                {details && 
                <View style={{flex:5}}>   
                    <View style={{marginHorizontal: 10}}>
                       <Text style={{fontSize: 20, fontWeight: 'bold', color:'whitesmoke'}}>{dealInfo[0].Name}</Text>
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={{fontSize: 15, color:'whitesmoke'}}>{dealInfo[0].Description}</Text>
                    </View>
                    <View style={{marginHorizontal: 10,marginTop: -10}}>
                        <Text style={{fontSize: 15, color:'whitesmoke'}}>הגעה ל{dealInfo[0].Business_Name} בכתובת: {dealInfo[0].Bus_rest.Baddress}</Text>
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={{fontSize: 15, color:'whitesmoke'}}>הצג קופון: {coupon}</Text>
                    </View>
                    <TouchableWithoutFeedback style={{}} onPress={CancelDiscount}>
                        <CancelIcon color={'whitesmoke'} name="cancel" size={20}><Text style={{fontSize: 15, color:'whitesmoke'}}> ביטול מבצע</Text></CancelIcon>
                    </TouchableWithoutFeedback>
                </View>}
        </View>       
        }
    </View>
    )
}

export default HeaderForDeal