import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  

import Login from '../screens/login';
import Registro from '../screens/registro';
import Menu from '../screens/menu';
import Perfis from '../screens/perfis';
import Rotas from '../screens/rotas';
import Viagens from '../screens/viagens';
import Onibus from '../screens/onibus';
import ViagemEmRota from '../screens/viagemEmRota';
import EditarPerfil from '../screens/editarPerfil';

const Stack = createNativeStackNavigator();
import {  PaperProvider } from 'react-native-paper';

const myTheme = {
  myOwnProperty: true,
  "colors": {
    "primary": "#1976d2",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "#B8D9FF",
    "onPrimaryContainer": "#003452",
    "secondary": "#878787",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "#1976d2",
    "onSecondaryContainer": "rgb(35, 37, 41)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "#FAFEFF",
    "onBackground": "#003665",
    "surface": "rgb(35, 37, 41)",
    "onSurface": "#1976d2",
    "surfaceVariant": "#E2E2E2", //COR BACKGROUND TEXT INPUT FLATLINE
    "onSurfaceVariant": "#878787",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(35, 37, 41)",
      "level2": "rgb(35, 39, 45)",
      "level3": "rgb(36, 44, 56)",
      "level4": "rgb(31, 53, 85)",
      "level5": "rgb(20, 52, 101)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
};

const lightTheme = {
  myOwnProperty: true,
  "colors": {
    "primary": "rgb(120, 69, 172)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(240, 219, 255)",
    "onPrimaryContainer": "rgb(44, 0, 81)",
    "secondary": "rgb(102, 90, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(237, 221, 246)",
    "onSecondaryContainer": "rgb(33, 24, 42)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(29, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(29, 27, 30)",
    "surfaceVariant": "rgb(233, 223, 235)",
    "onSurfaceVariant": "rgb(74, 69, 78)",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(248, 242, 251)",
      "level2": "rgb(244, 236, 248)",
      "level3": "rgb(240, 231, 246)",
      "level4": "rgb(239, 229, 245)",
      "level5": "rgb(236, 226, 243)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
  }
};

const darkTheme = {
    myOwnProperty: true,
    "colors": {
      "primary": "rgb(220, 184, 255)",
      "onPrimary": "rgb(71, 12, 122)",
      "primaryContainer": "rgb(95, 43, 146)",
      "onPrimaryContainer": "rgb(240, 219, 255)",
      "secondary": "rgb(208, 193, 218)",
      "onSecondary": "rgb(54, 44, 63)",
      "secondaryContainer": "rgb(77, 67, 87)",
      "onSecondaryContainer": "rgb(237, 221, 246)",
      "tertiary": "rgb(243, 183, 190)",
      "onTertiary": "rgb(75, 37, 43)",
      "tertiaryContainer": "rgb(101, 58, 65)",
      "onTertiaryContainer": "rgb(255, 217, 221)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(29, 27, 30)",
      "onBackground": "rgb(231, 225, 229)",
      "surface": "rgb(29, 27, 30)",
      "onSurface": "rgb(231, 225, 229)",
      "surfaceVariant": "rgb(74, 69, 78)",
      "onSurfaceVariant": "rgb(204, 196, 206)",
      "outline": "rgb(150, 142, 152)",
      "outlineVariant": "rgb(74, 69, 78)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(231, 225, 229)",
      "inverseOnSurface": "rgb(50, 47, 51)",
      "inversePrimary": "rgb(120, 69, 172)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(39, 35, 41)",
        "level2": "rgb(44, 40, 48)",
        "level3": "rgb(50, 44, 55)",
        "level4": "rgb(52, 46, 57)",
        "level5": "rgb(56, 49, 62)"
      },
      "surfaceDisabled": "rgba(231, 225, 229, 0.12)",
      "onSurfaceDisabled": "rgba(231, 225, 229, 0.38)",
      "backdrop": "rgba(51, 47, 55, 0.4)"
    }
};

export default function App() {
  return (
    <PaperProvider theme={myTheme}>
      <NavigationContainer independent>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Perfis" component={Perfis} options={{ headerShown: false }} />
          <Stack.Screen name="Editar Perfil" component={EditarPerfil} options={{ headerShown: false }} />
          <Stack.Screen name="Rotas" component={Rotas} options={{ headerShown: false }} />
          <Stack.Screen name="Viagens" component={Viagens} options={{ headerShown: false }} />
          <Stack.Screen name="Onibus" component={Onibus} options={{ headerShown: false }} />
          <Stack.Screen name="Viagem em Rota" component={ViagemEmRota} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    )
};
