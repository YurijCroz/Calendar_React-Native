import React, {useState} from 'react';
import { format } from 'date-fns';
import { startOfMonth } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { addDays } from 'date-fns';
import { subDays } from 'date-fns';
import { isToday } from 'date-fns';
import { isSameMonth } from 'date-fns';
import { addMonths } from 'date-fns';
import { subMonths } from 'date-fns';
// import { isFirstDayOfMonth } from 'date-fns';
// import { isLastDayOfMonth } from 'date-fns';
import { isWeekend } from 'date-fns';
import { StyleSheet, Text, View, Button } from 'react-native';
import cn from 'react-native-classnames';

const WEEK_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getMonthArray(dayStart, dayEnd){
  return eachDayOfInterval({start: dayStart, end: dayEnd})
}

function createStartArray(dataDay){
  const startMonthNum = Number(format(startOfMonth(dataDay), 'e'));
  return subDays(startOfMonth(dataDay), (startMonthNum-1))
}

function createEndArray(startDateArray){
  const TOTAL_CELLS = 42
  return addDays(startDateArray, TOTAL_CELLS-1)
}


export default function Calendar() {
  const [dataDay, setDataDay] = useState(new Date());
  const startDateArray = createStartArray(dataDay);
  const endDateArray = createEndArray(startDateArray)
  const dayMonthArray = getMonthArray(startDateArray, endDateArray);
  const seqMonth = (action) => {setDataDay(action(dataDay, 1))};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Button title="prev" onPress={()=>seqMonth(subMonths)}/>
        <View style={styles.month}>
          <Text style={{fontSize: 22}}>{format(dataDay, 'MMMM yyyy')}</Text>
        </View>
        <Button title="next" onPress={()=>seqMonth(addMonths)}/>
      </View>
      <View style={styles.dayContainer}>
        {WEEK_DAY_NAMES.map((name, index) =>
          <View key={index} style={styles.day}>
            <Text style={cn(styles, 'dayText', {
              weekend : index == 0 || index == 6,
            })} >{name}</Text>
          </View>
        )}
        {dayMonthArray.map((day, index) =>
          <View key={index} style={cn(styles, 'day', {
            toDay : isToday(day),
            toDayNotThisMonth : isToday(day) && !isSameMonth(day, dataDay)
          })}>
            <Text style={cn(styles, 'dayText', {
              weekend : isWeekend(day),
              notThisMonth : !isSameMonth(day, dataDay),
              notThisMonthWeekend : !isSameMonth(day, dataDay) && isWeekend(day)
            })}>{format(day, "d")}</Text>
          </View>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 30,
    paddingTop: 30,
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center"
  },
  header:{
    height: 70,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    flexDirection: "row",
  },
  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between"
  },
  day: {
    backgroundColor: "powderblue",
    width: `${(100/7)-0.5}%`,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 5,
    marginTop: 5,
  },
  toDay: {
    borderColor: "rgb(30,144,255)",
    borderWidth: 2.5
  },
  toDayNotThisMonth: {
    borderColor: "rgb(0,191,255)",
    borderWidth: 2.5
  },
  dayText: {
    fontSize: 18
  },
  weekend: {
    color: "red"
  },
  notThisMonthWeekend: {
    color: "lightcoral"
  },
  notThisMonth: {
    color: "gray"
  }
});

