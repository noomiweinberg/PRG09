import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Create from "../crud/Create";
import Edit from "../crud/Edit";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

//Screen imports


const screens = {
    Home: {
        screen: Home
    },
    Settings: {
        screen: Settings
    },
    Create: {
        screen: Create
    },
    Edit: {
        screen: Edit
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {}
})

export default createAppContainer(HomeStack)