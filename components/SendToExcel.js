import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { writeFile, readFile } from 'react-native-fs';

function SendToExcel(props) {
    return (
        <View style={styles.container}></View>
    );

}

const styles = StyleSheet.create({
    container: {}
});

export default SendToExcel;
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import ReactExport from "react-export-excel";
// function SendToExcel(props) {
//     const ExcelFile = ReactExport.ExcelFile;
//     const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
//     const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//     const dataSet1 = [
//         {
//             name: "Johson",
//             amount: 30000,
//             sex: 'M',
//             is_married: true
//         },
//         {
//             name: "Monika",
//             amount: 355000,
//             sex: 'F',
//             is_married: false
//         },
//         {
//             name: "John",
//             amount: 250000,
//             sex: 'M',
//             is_married: false
//         },
//         {
//             name: "Josef",
//             amount: 450500,
//             sex: 'M',
//             is_married: true
//         }
//     ];
//     const sendArray = () => {


//     }
//     return (
//         // <View style={styles.container}>
//         //     <TouchableOpacity onPress={sendArray}>
//         //         <Text style={styles.text}>שלח לאקסל</Text>

//         //     </TouchableOpacity>
//         // </View>
//         <ExcelFile>
//             <ExcelSheet data={dataSet1} name="Employees">
//                 <ExcelColumn label="Name" value="name" />
//                 <ExcelColumn label="Wallet Money" value="amount" />
//                 <ExcelColumn label="Gender" value="sex" />
//                 <ExcelColumn label="Marital Status"
//                     value={(col) => col.is_married ? "Married" : "Single"} />
//             </ExcelSheet>
//         </ExcelFile>
//     );

// }

// const styles = StyleSheet.create({
//     container: {
//         width: "100%",
//         alignItems: "center",
//     },
//     text: {
//         fontSize: 32,
//         textAlign: "center"
//     },
// });

// export default SendToExcel;