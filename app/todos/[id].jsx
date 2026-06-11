import { ThemeContext } from "@/context/ThemeContext";
import { Quicksand_500Medium } from '@expo-google-fonts/quicksand/500Medium';
import { useFonts } from '@expo-google-fonts/quicksand/useFonts';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function EditScreen() {
    const { id } = useLocalSearchParams()
    const [todo, setTodo] = useState({})
    const router = useRouter()

    //Declare colors + themes
    const { colorScheme, setColorScheme ,theme } = useContext(ThemeContext)

     //Font
    const [loaded, error] = useFonts(Quicksand_500Medium)

    //Font loaded
    if (!loaded && !error) {
        return null
    }

    const styles = createStyles(theme, colorScheme)

    useEffect(() => {

        

    }, [])

    return (
        <View>
            <Text>{id}</Text>
        </View>
    )
}