import React, {useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Alert

} from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { loadPlant, PlantsProps, removerPlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/loading'
 

export function MyPlants(){

    const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
    const [loading,setLoading] = useState(true);
    const [nextWaterd,setNextWaterd] = useState<string>('');
    

    useEffect(()=>{

        async function loadStorageData() {

            const plantsStorage = await loadPlant(); 
            const nextTime = formatDistance(
                new Date(plantsStorage[0].dateTimerNotification).getTime(),
                new Date().getTime(),
                {locale:pt}
            )
            setNextWaterd (`Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime} horas`)
            console.log('oi');
            console.log(plantsStorage);
            console.log('xau');
            setMyPlants(plantsStorage);
            setLoading(false);
        }

        loadStorageData();
        
         
    },[])

    function handleRemove(plant:PlantsProps){
        Alert.alert('Remover',`Deseja remover a  ${plant.name}?`,[
            {
                text: 'Não 🙏',
                style:'cancel'
            },
            {
                text: 'Sim 😥',
                onPress: async ()=>{
                    try {

                        await removerPlant(plant.id);

                        setMyPlants((oldDate) => (
                            oldDate.filter((item)=> item.id !== plant.id) 
                        ));

                        
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 😥')
                        
                    }
                }
            }
        ]);
    }

    if(loading)
        return <Load/>

    return (
        <View style={styles.container}>
              <Header/>
            <View style={styles.spotlight}>
                     <Image source={waterdrop} style={styles.spotlightImage}></Image>
                     <Text style={styles.spotlightText}>{nextWaterd}</Text>
            </View>

            <View style={styles.plants}>

                     <Text style={styles.plantsTitle}>Próximas regadas</Text>

                     <FlatList
                              data={myPlants} 
                              keyExtractor={(item)=> String(item.id)} // extrai da propria lista um item.key
                              renderItem={({item}) =>(
                                  <PlantCardSecondary handleRemove={()=>{handleRemove(item)}}  data={item}/>
                              )} 
                              showsVerticalScrollIndicator={false}
                             
                            >
                                
                            </FlatList>

                    
            </View>  
        </View>
    )

}

const styles = StyleSheet.create({
  
    container: { 
      flex: 1,
      alignItems:'center', 
      justifyContent: 'space-between',
      paddingHorizontal:30,
      paddingTop:50,
      backgroundColor: colors.background

    },
    spotlight:{
     backgroundColor: colors.blue_light,
     paddingHorizontal:20,
     borderRadius:20,
     height:110,
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center'
    },
    spotlightImage:{
        width:60,
        height:60,
    },
    spotlightText:{
        flex:1,
        color:colors.blue,
        paddingHorizontal:20,
        
    },
    plants:{
        flex:1,
        width:'100%'
        
    },
    plantsTitle:{
        fontSize:24,
        fontFamily:fonts.heading,
        color:colors.heading,
        marginVertical:20,
    }
})