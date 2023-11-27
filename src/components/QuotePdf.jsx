import React from "react";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Text,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    padding: 5,
    textAlign: "center",
    backgroundColor: "#E4E4E4",
  },
  section1: {
    padding: 5,
    marginLeft: "20px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mar10: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  marl20: {
    marginLeft: 20,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
  },
  textBody: {
    fontSize: 12,
  },
  textRight: {
    fontSize: 12,
    textAlign: "right",
  },
  header: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 50,
    height: 50,
  },
  section2: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 5,
    justifyContent: "space-between",
  },
  section3: {
    height: "45vh",
  },
  section4: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "50px",
    marginRight: "10px",
    marginTop: "30px",
  },
  sec4: {
    backgroundColor: "#FFF2CC",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Create Document Component
const QuotePdf = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>PRICE QUOTE</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <View>
              <Image
                style={styles.image}
                src="https://5.imimg.com/data5/CA/AU/FF/SELLER-3619257/img-20200618-wa0238-90x90.jpg"
              />
            </View>
            <View style={styles.flexCol}>
              <Text style={styles.textBold}>Navin Plastic Tech</Text>
              <Text style={styles.textBody}>​No:1/110-f,Kaniyampoondi,</Text>
              <Text style={styles.textBody}>
                ​Vanjipalayam(Post),Tirupur-641663
              </Text>
              <Text style={styles.textBody}>
                ​Ph: 0421 - 4334690 / Mob:9944423690
              </Text>
              <Text style={styles.textBody}>​GSTIN/UIN: ARUPN2905N1Z9</Text>
            </View>
          </View>
          <View style={styles.section1}>
            <Text style={styles.textBold}>Quote To:</Text>
            <View style={styles.marl20}>
              <View style={styles.flexCol}>
                <Text style={styles.textBold}>{props.quote.customer.name}</Text>
                <Text style={styles.textBody}>
                  {props.quote.customer.billingAddress.addressLine1}
                </Text>
                <Text style={styles.textBody}>
                  {props.quote.customer.billingAddress.addressLine2}
                </Text>
                <Text style={styles.textBody}>
                  {props.quote.customer.phoneNumber}
                </Text>
                <Text style={styles.textBody}>
                  ​GSTIN/UIN: {props.quote.customer.gstin}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.flexCol}>
          <View style={styles.flexRow}>
            <View style={styles.mar10}>
              <View style={styles.flexCol}>
                <Text style={styles.textBold}>Quote No:</Text>
                <Text style={styles.textRight}>123</Text>
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <View style={styles.flexCol}>
                <Text style={styles.textBold}>Date:</Text>
                <Text style={styles.textRight}>13/11/2023</Text>

                <Text style={styles.textBold}>Payment Mode&Terms:</Text>
                <Text style={styles.textRight}>
                  {props.quote.customer.paymentTerms}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.flexRow}>
              <View style={styles.mar10}>
                <Text style={styles.textBold}>Buyer's Order No:</Text>
                <Text style={styles.textRight}>123</Text>
              </View>
              <View style={styles.mar10}>
                <Text style={styles.textBold}>Other Refrence(s)</Text>
                <Text style={styles.textRight}>EX-Factory</Text>
              </View>
            </View>
            <View>
              <View style={styles.flexRow}>
                <View style={styles.mar10}>
                  <Text style={styles.textBold}>Despatch Through</Text>
                  <Text style={styles.textRight}>
                    {props.quote.customer.transporter.name}
                  </Text>
                </View>
                <View style={styles.mar10}>
                  <Text style={styles.textBold}>Destination</Text>
                  <Text style={styles.textRight}>ND</Text>
                </View>
              </View>
            </View>
            <Text style={styles.textBold}>
              Terms of Delivery:{props.quote.customer.transporter.terms}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexCol}>
        <View style={styles.section2}>
          <Text style={styles.textBold}>SI No</Text>
          <Text style={styles.textBold}>Hanger Code</Text>
          <Text style={styles.textBold}>Material</Text>
        
          <Text style={styles.textBold}>Print</Text>
          <Text style={styles.textBold}>Image</Text>
          <Text style={styles.textBold}>HSN/SAC</Text>
          <Text style={styles.textBold}>Price</Text>
        </View>
        <View style={styles.section3}>
          {props.quote.hangers.map((hanger, index) => (
            <View key={index} style={styles.section4}>
              <Text style={styles.textBody}>{index+1}</Text>
              <Text style={styles.textBody}>{hanger.hanger.code}</Text>
              <Text style={styles.textBody}>{hanger.material.name}</Text>
              <Text style={styles.textBody}>{hanger.print.name==="NONE"?"":hanger.print.name}</Text>
              <View>
                <Image style={styles.image} src={hanger.hanger.imageUrl} />
              </View>
              <Text style={styles.textBody}>54025210</Text>
              <Text style={styles.textBody}>{hanger.price}</Text>
            </View>
          ))}
        </View>
        <View style={styles.flexRow}>
          <View style={styles.flexCol}>
            <Text>Remarks</Text>
            <View style={styles.sec4}>
              <Text style={styles.textBold}>
                NOTE : GST @ 18% Applicable from the above Price
              </Text>
            </View>
          </View>
          <View style={styles.flexCol}>
            <Text>E. & O.E</Text>
            <View style={{}}>
              <Text fontWeight="bold" textAlign="center">
                Authorised Signatory
              </Text>
              <View>
                <Image
                  style={styles.image}
                  src="https://uc255d59652b6359afd6d58953d6.previews.dropboxusercontent.com/p/thumb/ACGwr1ZN1k-S1-VP-Q8OFvXOPjAHDF0Lb-9X-iuDnZEqEGloSBhsB2ROZLJaU-Bc_4uLhegIPbkPpweagiWUed3OZDVJyUaEne9bR0tQ1o8YxALCvRZGjdOKgYo6Qq5JDETkWKpAxr8vwK0Nddv6FJTW5MdE-xSAqfFw2Sqy4JEX2Ygj9MQIujD0wz9x8Wkl0HcuWGzwex6MehXl-PMMKnO5lT6VGFOb6Lxa67ZlRBWmPEO-wAHRdGD6mT3i2qGJmzqA61qhxHiL-piyh2niqju_UTP7WCD_sDkZVbcx1EW115b7GLCtmhDbYLvaVfQbfWgW-_tKdFFZfja_OEUth-NBTmbd-4vjUJByXqqfOPQNPCv6VETZUaoQBZgKsS86GwA/p.jpeg"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default QuotePdf;
