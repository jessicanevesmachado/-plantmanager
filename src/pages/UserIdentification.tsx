import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native'
import  {Button} from '../components/Button'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'


export function UserIdentification(){
    
    const[isFocused,setIsFocused] = useState(false); // aqui quando coloco o valor ele ja indentifica que é booleano
    const[isFilled,setIsFilled] = useState(false);
    const[name,setName] = useState<string>();
    const navigation = useNavigation()

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }
    function handleInputChange(value:string){
        setIsFocused(!!value); //se tem conteudo true se não tem é false
        setName(value);
    }
 
    async function handleSubmit(){
    
        if(!name)
         return Alert.alert('Me diz como chamar você 😥')

        try {
            await AsyncStorage.setItem('@plantmanager:user',name); // segue um padrao o nome do app e o que to salvando? exemplo user

        } catch (error) {
            Alert.alert('Não foi possível salvar o seu nome. 😥')
        }

        navigation.navigate('Confirmation',{
            title:'Prontinho',
            subTitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            buttonTitle:'Começar',
            icon: 'smile',
            nextScreen: 'PlantSelect'
        });
    }

    return(<SafeAreaView style={styles.container}>
             <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS ==='ios'?'padding':'height'}>
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                     <View style={styles.form}>

                            <View style={styles.header}>  
                                <Text style={styles.emoji}>
                                            {isFilled? '😄': '😃'}
                                    </Text>
                                    <Text style={styles.title}>
                                        Como podemos {'\n'}
                                        chamar você?
                                    </Text> 

                                    <TextInput
                                        style={[styles.input,
                                                (isFocused || isFilled) && {borderColor:colors.green}
                                        ]}
                                        onBlur={handleInputBlur}
                                        onFocus={handleInputFocus}
                                        onChangeText={handleInputChange} 
                                        placeholder="Digite um nome"> 
                                    </TextInput>
                            </View>

                            <View style={styles.footer}>
                                    <Button   onPress={handleSubmit} title="Confirmar"></Button>
                            </View>
                     </View>
                </View>
                </TouchableWithoutFeedback>
             </KeyboardAvoidingView>
          </SafeAreaView>)
}


const styles = StyleSheet.create({
  
    container: { 
      flex: 1,
      width:'100%',
      alignItems:'center',
      justifyContent: 'space-around',
      
    },
    content:{
        flex:1,
        width:'100%', 

    },
    form:{
        flex:1,
        justifyContent: 'center',
        paddingHorizontal:54,
        alignItems:'center',
      
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        width: '100%',
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign: 'center'
    },
    title:{
        fontSize:24,
        textAlign:'center',
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:32,
        marginTop:20
    },
    footer:{
        width:'100%',
        marginTop:40,
        paddingHorizontal:20
    },
    header:{
        alignItems:'center'
    }
    
});