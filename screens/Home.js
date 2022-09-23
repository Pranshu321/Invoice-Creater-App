import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={styles.container}  >
      <View>
        <Image source={require('../assets/logo.png')} 
         style={styles.img}
          />
      </View>
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate("bill")} style={styles.button_style}>
            <Text style={styles.butt_text}>Create Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    img:{
        width: 300,
        height: 300
    },
    button_style:{
       height: 50,
       width: 120,
       alignItems: "center",
       justifyContent: "center",
       backgroundColor: "black",
       borderRadius: 12
    },
    butt_text:{
        color: "white",
        fontWeight: "700",
        fontSize: 14
    }

})