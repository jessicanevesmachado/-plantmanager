import React, {useEffect,useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userImg from '../assets/jessica.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){

    const [userName,setuserName] = useState<string>();

    useEffect(()=>{

        async function loadStorageUserName() {
          var user = await AsyncStorage.getItem('@plantmanager:user');
          setuserName(user || ''); //se tiver algo colocar o user se nao o ''
        }

        loadStorageUserName();
        
            
    },[userName]) // toda vz que o username mudar ele dispara essa funcao, quando deixa sem nda ele carrega uma vez so.

    return(
        <View style={styles.container}>
                <View>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
                <Image style={styles.image} source={userImg} />
        </View>
    )
}


const styles = StyleSheet.create({
  
    container: { 
     width: '100%',
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     paddingVertical:20, 
     marginTop:getStatusBarHeight(), 
     
    },
    image:{
        width:70,
        height:70,
        borderRadius:40,
    },
    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text, 
    },
    userName:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:40

    }

  });