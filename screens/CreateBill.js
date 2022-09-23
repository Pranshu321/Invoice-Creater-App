import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { PdfCode } from './Invoice';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const CreateBill = () => {
    const [invoice, setInvoice] = useState({
        Name: "",
        Email: "",
        Phone: "",
        City: "",
        Product: "Wheat",
        Qty: 0,
        inv: uuidv4(),
        Tot_amount: 0,
        re_amount: 0,
        pay_type: "Cash",
        remain_amount: 0

    });

    const PrintToPdf = async () => {
        const html = PdfCode(invoice);
        try {
            const { uri } = await Print.printToFileAsync({
                html
            });
            console.log("Filed Saved to ", uri);
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

            setInvoice({
                ...invoice, Name: "",
                Email: "",
                Phone: "",
                City: "",
                Product: "Wheat",
                Qty: 0,
                inv: uuidv4(),
                Tot_amount: 0,
                re_amount: 0,
                pay_type: "Cash",
                remain_amount: 0
            });
        } catch (error) {
            Alert.alert("Please , Check Your Internet Connection");
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.InputContainer}>
                    <Text>Name</Text>
                    <TextInput placeholder='Full Name' style={styles.textinput} onChangeText={text => setInvoice({ ...invoice, Name: text })} />
                </View>

                {/* Address */}
                <View style={styles.InputContainer}>
                    <Text>City</Text>
                    <TextInput placeholder='City' style={styles.textinput} onChangeText={text => setInvoice({ ...invoice, City: text })} />
                </View>

                {/* Email */}
                <View style={styles.InputContainer}>
                    <Text>Email</Text>
                    <TextInput placeholder='Email' style={styles.textinput} keyboardType="email-address" onChangeText={text => setInvoice({ ...invoice, Email: text })} />
                </View>

                {/* Phone */}
                <View style={styles.InputContainer}>
                    <Text>Mobile</Text>
                    <TextInput placeholder='Phone' style={styles.textinput} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, Phone: text })} />
                </View>

                {/* product */}
                <View style={styles.InputContainer}>
                    <Text>Product</Text>
                    <View style={styles.picker_con}>
                        <Picker selectedValue={invoice.Product}
                            style={styles.picker}
                            onValueChange={(item, idx) => {
                                setInvoice({ ...invoice, Product: item })
                            }}
                        >
                            <Picker.Item label='Bajra' value={"Bajra"} />
                            <Picker.Item label='Rice' value={"Rice"} />
                            <Picker.Item label='Jowar' value={"Jowar"} />
                            <Picker.Item label='Apple' value={"Apple"} />
                            <Picker.Item label='Mango' value={"Mango"} />
                        </Picker>
                    </View>
                </View>

                {/* Quantity */}
                <View style={styles.InputContainer}>
                    <Text>Quantity</Text>
                    <TextInput placeholder='Quantity' style={styles.textinput} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, Qty: text })} />
                </View>

                {/* Invoice No */}
                <View style={styles.InputContainer}>
                    <Text>Invoice No</Text>
                    <TextInput editable={false} placeholder='Invoice No' style={styles.textinput} defaultValue={invoice.inv} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, inv: text })} />
                </View>


                {/* Payment Type */}
                <View style={styles.InputContainer}>
                    <Text>Payment Mode</Text>
                    <View style={styles.picker_con}>
                        <Picker selectedValue={invoice.pay_type}
                            style={styles.picker}
                            onValueChange={(item, idx) => {
                                setInvoice({ ...invoice, pay_type: item })
                            }}
                        >
                            <Picker.Item label='Cash' value={"Cash"} />
                            <Picker.Item label='Net banking' value={"Net banking"} />
                            <Picker.Item label='Credit/Debit Card' value={"Card"} />
                        </Picker>
                    </View>
                </View>


                {/* Total */}
                <View style={styles.InputContainer}>
                    <Text>Total Amount</Text>
                    <TextInput placeholder='Amount' style={styles.textinput} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, Tot_amount: text })} />
                </View>


                {/* Recieved Amount */}
                <View style={styles.InputContainer}>
                    <Text>Recieved Amount</Text>
                    <TextInput placeholder='Amount Recieved' style={styles.textinput} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, re_amount: text })} />
                </View>

                {/* Remaning Amount */}
                <View style={styles.InputContainer}>
                    <Text>Remaining Amount</Text>
                    <TextInput placeholder='Amount Pending' style={styles.textinput} keyboardType="number-pad" onChangeText={text => setInvoice({ ...invoice, remain_amount: text })} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={PrintToPdf} style={styles.button_style}>
                        <Text style={styles.butt_text}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateBill

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 50,
        backgroundColor: "#fff"
    },
    InputContainer: {
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16
    },
    textinput: {
        marginTop: 4,
        height: 40,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 8,
        padding: 4,
        fontWeight: "700",
        paddingLeft: 15,
        marginBottom: 6
    },
    picker_con: {
        marginTop: 10,
        borderWidth: 2,
        fontWeight: "700",
        borderRadius: 8
    },
    button_style: {
        height: 50,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 6,
        marginVertical: 15
    },
    butt_text: {
        color: "white",
        fontWeight: "700",
        fontSize: 16
    }

})