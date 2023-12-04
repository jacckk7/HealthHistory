import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

type DateInputProps = {
  label: string
  onDateChange: (date: string) => void
}

export default function DateInput({ label, onDateChange } :DateInputProps) {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const showDatepicker = () => {
    setShowDatePicker(true)
  }

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false)
    if (date) {
      const onlyDate = date.toISOString().split('T')[0];
      setSelectedDate(date)
      onDateChange(onlyDate)
    }
  }

  return (
    <View style={styles.dateInputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString('en-US')}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dateInputContainer: {
    marginVertical: 10,
    backgroundColor: '#D9D9D9',
    marginBottom:20,
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  dateText: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  }
})
