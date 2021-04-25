import React, {useState} from 'react'
import {SafeAreaView, Text, StyleSheet, Image,TouchableOpacity, Dimensions,View,Alert, Platform} from 'react-native'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {SvgFromUri} from 'react-native-svg'
import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/core'
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantsProps, savePlant } from '../libs/storage';
import { ScrollView } from 'react-native-gesture-handler';

interface Params{
    plant:PlantsProps
}


export function PlantSave(){

    const route = useRoute();
    const [selectedDateTime,setSelectedDateTime] = useState(new Date);
    const [showDatePicker,setShowDatePicker] = useState(Platform.OS === 'ios');

    const {plant} = route.params as Params;
    const navigation = useNavigation();

    function handleChangeTimer(event:Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState=> !oldState); 
        }

        if(dateTime && isBefore(dateTime,new Date())){
            setSelectedDateTime(new Date());
            Alert.alert('Escolha uma data no futuro! ⏰');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    
    }

    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){
        
      /**  debugger
        const data = await loadPlant();

        console.log(data); */

        try {
            await savePlant({
                ...plant,
                dateTimerNotification:selectedDateTime
            })

            //Alert.alert('Salvo com sucesso');
        } catch (error) {
            Alert.alert('Não foi possível salvar. 😥');
        }

        navigation.navigate('Confirmation',{
            title:'Tudo certo',
            subTitle:'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha, com muito cuidado.',
            buttonTitle:'Muito Obrigado',
            icon: 'hug',
            nextScreen: 'MyPlant'
        }); 

    }

    return(
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
            <View style={styles.container}>
                 <View style={styles.plantInfo}>
                        <SvgFromUri
                        uri= {plant.photo}
                        height={150}
                        width={150}
                        ></SvgFromUri>

                        <Text style={styles.plantName}>
                            {plant.name}
                        </Text>

                        <Text style={styles.plantAbout}>
                             {plant.about}
                        </Text>

                 </View>

                 <View style={styles.controller}>

                    <View style={styles.tipContainer}>
                        <Image source={waterdrop} style={styles.tipImage}></Image>

                        <Text style={styles.tipText}>
                        {plant.water_tips}
                        </Text>

                    </View> 

                    <Text style={styles.alertLabel}>
                            Escolha o melhor horário para ser lembrado.
                    </Text>

                    {
                        showDatePicker &&
                        <DateTimePicker value={selectedDateTime} mode="time" display="spinner" onChange={handleChangeTimer}></DateTimePicker>
                    }
                    {
                        Platform.OS === 'android' && (
                           <TouchableOpacity
                           style={styles.dateTimerPickerButton}
                           onPress={handleOpenDateTimePickerForAndroid}
                           >
                                <Text style={styles.dateTimerPickerText}>
                                   { `Mudar ${format(selectedDateTime,"HH:mm")}`}
                                 </Text>
                           </TouchableOpacity>
                        )

                    }
                    
                    <Button title="Cadastrar Planta" onPress={handleSave}></Button> 
                 </View>
            </View>
        </ScrollView>
        )
}


const styles = StyleSheet.create({
  
 
    container: { 
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.shape,

    },
    plantInfo:{
        flex:1,
        paddingHorizontal:30,
        paddingVertical:50,
        alignItems:'center',
        backgroundColor: colors.shape,
    },
    controller:{
        backgroundColor:colors.white,
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom:getBottomSpace() || 20 // aqui pega do iphone, se for no android retorna 0 entao forca 20

    },
    plantName:{
        fontFamily:fonts.heading,
        fontSize:24,
        color:colors.heading,
        marginTop:15,
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily:fonts.text,
        color:colors.heading,
        fontSize:17,
        marginTop:10,

    },
    
    tipContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.blue_light,
        padding: 20,
        borderRadius:20,
        position: 'relative',
        bottom:60

    },
    tipImage:{
        width:56,
        height:56,

    },
    tipText:{
        flex:1,
        marginLeft:20,
        fontFamily:fonts.text,
        color:colors.blue,
        fontSize:17,
        textAlign: 'justify',
    },

    alertLabel:{
        textAlign:'center',
        fontFamily:fonts.complement,
        color:colors.heading,
        fontSize:12,
        marginBottom:5
    },

    dateTimerPickerText:{   
        color:colors.heading,
        fontSize:24,
        fontFamily:fonts.text
    },
    dateTimerPickerButton:{
        width:'100%',
        alignItems: 'center',
        paddingVertical:40,
       
    }
     
  });
  