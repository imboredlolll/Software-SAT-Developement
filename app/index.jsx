import { Data } from "@/constants/Todos.jsx";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useContext, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/ThemeContext";

import { Quicksand_500Medium } from '@expo-google-fonts/quicksand/500Medium';
import { useFonts } from '@expo-google-fonts/quicksand/useFonts';
import { useWindowDimensions } from 'react-native';


export default function Index() {

  //Declare Todos
  const [todos, setTodos] = useState(Data)

  let todayTodos = []
  let overdueTodos = []
  let completedTodos = []

  let totalTasks = 0
  let completedTasks = 0


  for (const todo of todos) {
    totalTasks += 1
    if (todo.completed === false && new Date(todo.dueDateTime) > new Date()) {
      todayTodos.push(todo)
    }
    else if (todo.completed === false && new Date(todo.dueDateTime) < new Date()) {
      overdueTodos.push(todo)
    }
    else {
      completedTodos.push(todo)
      completedTasks += 1
    }
  }

  let percentComplete = totalTasks == 0 ? 1 : completedTasks/totalTasks
  percentComplete = percentComplete * 100
  percentComplete = Math.round(percentComplete)
  percentComplete = `${percentComplete}%`

  //Dynamic Sizes
  const { width } = useWindowDimensions();
  let fontSize = Math.max(20, width * 0.04);
  let secondFontSize = Math.max(16, width * 0.03);
  if (fontSize > 24) {
    fontSize = 24
  }
  if (secondFontSize > 20) {
    secondFontSize = 20
  } 

  //Declare colors + themes
  const { colorScheme, setColorScheme ,theme } = useContext(ThemeContext)
  const styles = createStyles(theme, colorScheme, fontSize, secondFontSize, percentComplete)

  //Font
  const [loaded, error] = useFonts(Quicksand_500Medium)

  //Font loaded
  if (!loaded && !error) {
    return null
  }

  console.log("Hello")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.helloText}>Good Morning Josh</Text>
        <Text style={styles.bigText}>Your Tasks</Text>
      </View>
      <View style={styles.progBarContainer}>
        <View style={styles.progBarBack}>
          <View style={styles.progBar}>
            <Text style={styles.progBarText}>{completedTasks} out of {totalTasks}</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.overdueTasksContainer}>
          <Text style={styles.todosSubheaderText}>Overdue Tasks</Text>
          <FlatList
            data={overdueTodos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={<Text>No items</Text>}
            renderItem={({ item }) => (
              <View style={{ ...styles.row, ...styles.overdueContainer}}>
                <View style={styles.todoIconContainer}>
                  <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} style={styles.overdueCircleIcon}/>
                </View>
                <View style={styles.todoTextContainer}>
                  <Text style={{...styles.todoTitleText, ...styles.overdueTodoTitleText}} numberOfLines={1} adjustsFontSizeToFit>{item.title}</Text>
                  <Text style={{...styles.dueTimeText, ...styles.overdueTimeText}}>Overdue From {new Date(item.dueDateTime).toLocaleTimeString("en-AU", {hour: "numeric",minute: "2-digit"})}</Text>
                </View>
                <View style={styles.dotIconContainer}>
                  <Entypo name="dot-single" size={48} style={styles.overdueDot} />
                </View>
              </View>

            )}
          />
        </View>
        <View style={styles.dueTodayTasksContainer}>
          <Text style={styles.todosSubheaderText}>Today</Text>
          <FlatList
            data={todayTodos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={<Text>No items</Text>}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.todoIconContainer}>
                  <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} style={styles.circleIcon}/>
                </View>
                <View style={styles.todoTextContainer}>
                  <Text style={styles.todoTitleText} numberOfLines={1} adjustsFontSizeToFit>{item.title}</Text>
                  <Text style={styles.dueTimeText}>{new Date(item.dueDateTime).toLocaleTimeString("en-AU", {hour: "numeric",minute: "2-digit"})}</Text>
                </View>
                <View style={styles.dotIconContainer}>
                  <Entypo name="dot-single" size={48} style={styles.dot} />
                </View>
              </View>

            )}
          />
        </View>
        <View style={styles.completedTasksContainter}>
          <Text style={styles.todosSubheaderText}>Completed</Text>
          <FlatList
            data={completedTodos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={<Text>No items</Text>}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.todoIconContainer}>
                  <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} style={styles.circleIcon}/>
                </View>
                <View style={styles.todoTextContainer}>
                  <Text style={{...styles.todoTitleText, ...styles.completedTodoText}} numberOfLines={1} adjustsFontSizeToFit>{item.title}</Text>
                  <Text style={styles.dueTimeText}>Done</Text>
                </View>
                <View style={styles.dotIconContainer}>
                  <Entypo name="dot-single" size={48} style={styles.doneDot} />
                </View>
              </View>

            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


function createStyles(theme, colorScheme, fontSize, secondFontSize, percentComplete) {
  return StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: theme.background
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      width: "85%",
      height: 100,
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: theme.card,
      marginHorizontal: 'auto',
      marginBottom: 5
    },
    todoIconContainer: {
      width: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    circleIcon: {
      color: theme.icon
    },
    todoTextContainer: {
      flex: 1,
      justifyContent: "center",
      paddingLeft: 10,
    },
    todoTitleText: {
      paddingTop: "1%",
      fontFamily: 'Quicksand_500Medium',
      fontSize: fontSize,
      color: theme.text
    },
    dueTimeText: {
      paddingTop: 10,
      fontFamily: 'Quicksand_500Medium',
      fontSize: 22,
      color: theme.secondaryText,
      fontSize: secondFontSize,
    },
    dotIconContainer: {
      width: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    dot: {
      color: theme.icon,
    },
    overdueContainer: {
      backgroundColor: theme.dangerBackground,
      borderColor: theme.dangerIcon
    },
    overdueCircleIcon: {
      color: theme.dangerIcon
    },
    overdueDot:{
      color: theme.dangerIcon
    },
    overdueTodoTitleText:{
      color: theme.dangerText
    },
    overdueTimeText:{
      color: theme.dangerText
    },
    completedTodoText: {
      textDecorationLine: "line-through",
      color: theme.secondaryText
    },
    doneDot:{
      color: theme.card
    },
    helloText: {
      color: theme.secondaryText,
      fontSize: 22,
      paddingTop: 15,
      fontFamily: 'Quicksand_500Medium',
      paddingLeft: "8%"
    },
    bigText: {
      color: theme.text,
      fontSize: 34,
      paddingTop: 6,
      fontFamily: 'Quicksand_500Medium',
      paddingLeft: "8%",
      marginBottom: 10
    },
    todosSubheaderText: {
      color: theme.secondaryText,
      fontSize: 22,
      paddingTop: 10,
      paddingBottom: 10,
      fontFamily: 'Quicksand_500Medium',
      paddingLeft: "8%"
    },
    progBarContainer: {
      width: "85%",
      backgroundColor: theme.card,
      height: 40,
      marginHorizontal: "auto",
      borderRadius: 20,
      marginBottom: 10
    },
    progBarBack: {
      backgroundColor: theme.progressTrack,
      width: "95%",
      height: 20,
      marginHorizontal: "auto",
      marginVertical: "auto",
      borderRadius: 20
    },
    progBar: {
      backgroundColor: theme.progressFill,
      width: percentComplete,
      height: 20,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    progBarText: {
      color: theme.text,
      fontSize: 13,
      fontFamily: 'Quicksand_500Medium',
      paddingLeft: "8%"
    },
    scrollView: {
      flex: 1
    }
  })
}
