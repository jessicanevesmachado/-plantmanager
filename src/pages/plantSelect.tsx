import React, {useEffect, useState} from 'react'
import {FlatList, Text, StyleSheet,View, ActivityIndicator} from 'react-native'
import  {Button} from '../components/Button'
import  {Header} from '../components/Header'
import  {Load} from '../components/loading'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';
import { color } from 'react-native-reanimated';
import { EnvironmentButton } from '../components/EnvironmentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantsProps } from '../libs/storage'

interface EnviromentProps {
  key:string;
  title:string;
}
 

export function PlantSelect(){
    
    const [enviroments,setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants,setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants,setFilteredPlants] = useState<PlantsProps[]>([]);
    const [enviromentSelected,setEnviromentSelected] = useState('all');
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [loadingMore,setLoadingMore] = useState(true);
     
    const navigation = useNavigation()

    function handleEnviromentSelected(enviroment:string){
      setEnviromentSelected(enviroment);

      if(enviroment == 'all'){
        return setFilteredPlants(plants);
      }else{

        const filtered = plants.filter(plant=> 
              plant.environments.includes(enviroment));

        setFilteredPlants(filtered);
      }
    }

    async function fetchPlants() { 

      const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`); 

      console.log('BUSCANDO DADOS');
      console.log(data);

      if(!data)
        return setLoading(true);

      if(page >1){
        setPlants(oldValue=> [...oldValue,...data]);
        setFilteredPlants(oldValue=>[...oldValue, ...data]);
      }
      else{
        setPlants(data);
        setFilteredPlants(data);
      }
      
       setLoading(false)
       setLoadingMore(false);

    }

    function handleFetchMore(distance:number){

      if(distance <1)
          return;

          setLoadingMore(true);
          setPage(oldValue => oldValue +1);
          fetchPlants()


    }

    function handlePlantSelect(plant:PlantsProps){
      navigation.navigate('PlantSave', {plant});
    }
  
    useEffect(()=>{

      async function fetchEnviroment() { 

        const {data} = await api.get('plants_environments?_sort=title&_order=asc'); 
        setEnviroments([{
            key: 'all',
            title: 'Todos',
            
        },...data])

      }

     fetchEnviroment();

    },[])

    useEffect(()=>{ 
      fetchPlants();

    },[])

    
    if(loading)
    return <Load/>

    return( <View style={styles.container}>
                        
                        <View style={styles.header}>
                          <Header/>
                          <Text style={styles.title}>
                            Em qual ambiente
                          </Text>
                          <Text style={styles.subTitle}>
                            você quer colocar sua planta?
                          </Text>
                        </View>

                        <View>
                            <FlatList
                              data={enviroments} 
                              keyExtractor={(item)=> String(item.key)} // extrai da propria lista um item.key
                              renderItem={({item}) =>(
                                <EnvironmentButton 
                                              key={item.key} 
                                              title={item.title} 
                                              active={item.key === enviromentSelected}
                                              onPress={()=> handleEnviromentSelected(item.key)}
                                ></EnvironmentButton>
                              )}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              contentContainerStyle={styles.environmentList} 
                            />
                        </View>

                        <View style={styles.plants}>
                          <FlatList
                            data={filteredPlants} 
                            keyExtractor={(item)=> String(item.id)}
                            renderItem={({item}) =>(
                              <PlantCardPrimary 
                                    key={item.id} data={item}
                                    onPress={()=>{handlePlantSelect(item)}}
                              ></PlantCardPrimary>
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            onEndReachedThreshold={0.1} /*quando chegar a 10% final da tela */
                            onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}  /* e se chegar o que vou fazer? */
                             ListFooterComponent={
                               loadingMore
                               ?  <ActivityIndicator color={colors.green}></ActivityIndicator>
                               : <></>
                             }
                          />
                        </View>

                        
                        
            </View> 
           )
}


const styles = StyleSheet.create({
  
    container: { 
      flex: 1, 
      backgroundColor: colors.background,
      
    },
    header:{
      paddingHorizontal:30
    },
    title:{
      fontSize:17,
      color:colors.heading,
      fontFamily:fonts.heading,
      lineHeight:20,
      marginTop:15
    },
    subTitle:{
      fontFamily: fonts.text,
      fontSize:17,
      lineHeight:20,
      color:colors.heading,
    },
    environmentList:{
      height:40,
      justifyContent: 'center',
      paddingBottom:5,
      marginLeft:32,
      marginVertical:32,
      
    },
    plants:{
      flex:1,
      paddingHorizontal:32,
      justifyContent:'center'
    } 
    
  });
  