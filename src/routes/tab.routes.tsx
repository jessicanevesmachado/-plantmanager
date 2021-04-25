import React from 'react'
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { color } from 'react-native-reanimated';
import colors from '../styles/colors';
import { PlantSelect } from '../pages/plantSelect';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/myPlants';
import { Platform } from 'react-native';

const AppTab = createBottomTabNavigator();

const  AuthRoutes:React.FC = ()=>{

    return( <AppTab.Navigator
        
        tabBarOptions={{
            activeTintColor:colors.green,
            inactiveTintColor: colors.heading,
            labelPosition:'beside-icon',
            style:{
                paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                height:88
            },
        }}>

         <AppTab.Screen
             name="Nova Planta" 
             component={PlantSelect}
             options={{
                 tabBarIcon:(({size, color}) =>
                  <MaterialIcons
                   name="add-circle-outline"
                   size={size}
                   color={color}
                  > 
                 </MaterialIcons> )
             }}
         ></AppTab.Screen>

        <AppTab.Screen
             name="Minhas Plantas" 
             component={MyPlants}
             options={{
                 tabBarIcon:(({size, color}) =>
                  <MaterialIcons
                   name="format-list-bulleted"
                   size={size}
                   color={color}
                  > 
                 </MaterialIcons> )
             }}
         ></AppTab.Screen>


    </AppTab.Navigator>)
}

export default AuthRoutes;