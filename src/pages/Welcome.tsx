import React, {useState} from 'react'
import {SafeAreaView, Text, StyleSheet, Image,TouchableOpacity, Dimensions,View} from 'react-native'
import wateringImg from '../assets/watering.png'
import  {Button} from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';
import { Confirmation } from './Confirmation';

export function Welcome(){
    
    const navigation = useNavigation();

    function handleStart(){
      navigation.navigate('UserIdentification');
    }

    return(<SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                        <Text 
                            style={styles.title}>Gerencie {'\n'}
                            suas plantas de{'\n'}
                            forma fácil
                          </Text>
                          
                          <Image 
                                  resizeMode="contain" 
                                  style={styles.image} 
                                  source={wateringImg}>
                          </Image>
                    
                          <Text 
                                style={styles.subtitle}>
                                Não esqueça mais de regar suas plantas. 
                                Nós cuidamos de lembrar você
                                sempre que precisar.
                          </Text>

                        <TouchableOpacity 
                              style={styles.button} 
                              onPress={handleStart}
                              activeOpacity={0.7}> 
                                  <Feather 
                                    name="chevron-right"
                                    style={styles.buttonIcon}> 
                                  </Feather>
                        </TouchableOpacity>
                  </View>
          </SafeAreaView>)
}


const styles = StyleSheet.create({
  
    container: { 
      flex: 1,
    },
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around', /* nao cola nas bordas */
      paddingHorizontal:20, 
    },
   
    title: {
       fontSize:28,
       textAlign:"center",
       color:colors.heading,
       marginTop:38,
       fontFamily: fonts.heading,
       lineHeight:34
      },
      subtitle: {
        fontSize:18, 
        textAlign:"center",
        color:colors.heading,
        paddingHorizontal:20,
        fontFamily: fonts.text,
       },
       image:{ 
        height: Dimensions.get('window').width * 0.7
       },
       button: {
        backgroundColor:colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:16,
        marginBottom:10,
        height:56,
        width:56
       },
       buttonIcon:{
        fontSize:24,
        color: colors.white
    },
     
  });
  