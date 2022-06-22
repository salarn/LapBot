import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input, DefaultTheme } from 'react-native-paper'

const TextInput = ({ errorText, ...props }: { errorText: string }) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={DefaultTheme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: DefaultTheme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: '#414757',
    paddingTop: 8,
  },
  error: {
    fontSize: 15,
    color: DefaultTheme.colors.error,
    paddingTop: 8,
    fontWeight: 'bold',
  },
})
export default TextInput
