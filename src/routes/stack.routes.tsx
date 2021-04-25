import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import { Confirmation } from '../pages/Confirmation';
import { UserIdentification } from '../pages/UserIdentification';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/myPlants';
import AuthRoutes from './tab.routes';
const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () =>(

    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle:{
                backgroundColor:colors.white
            }
        }}>

        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        /> 

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />
        
         <stackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <stackRoutes.Screen
            name="MyPlant"
            component={AuthRoutes}
        />

    </stackRoutes.Navigator>
       
     
)

export default AppRoutes;