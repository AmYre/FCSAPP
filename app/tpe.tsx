import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Background from "@/components/background";
import { useWindowDimensions } from "react-native";

const TpeScreen = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const handleSubmit = async () => {
		const mailtoUrl = `mailto:fcs@unsa.org?subject=Contact&body=Name: ${name}%0D%0AMessage: ${message}`;

		try {
			await Linking.openURL(mailtoUrl);
		} catch (error) {
			Alert.alert("Error", "Could not open mail app");
		}
	};

	return (
		<Background>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
				<ScrollView>
					<Image source={require("@/assets/images/tpe.png")} style={isIpad ? styles.imagePad : styles.image} />
					<Text style={styles.mainTitle}>UNSA TPE</Text>
					<Text style={styles.subTitle}>Du 25 Novembre au 9 Décembre 2024 VOTEZ UNSA</Text>
					<Text style={styles.description}>
						À l’UNSA, nous sommes conscients des soucis que peuvent avoir les salariés, tous les salariés. C’est pour ça que nous avons créé UNSA TPE : pour apporter des solutions à
						plusieurs millions d’employés qui ne bénéficient pas des avantages de ceux qui travaillent dans des grands groupes, comme le CE, ou l’assistance des ressources humaines.
					</Text>
					<View style={styles.icos}>
						<FontAwesome style={styles.iconPerc} name="percent" />
					</View>
					<Text style={styles.cta}>Réductions CE exclusives pour sortir voyager, faire du shopping</Text>
					<View style={styles.icos}>
						<FontAwesome5 style={styles.iconBal} name="balance-scale" />
					</View>
					<Text style={styles.cta}>Assistance juridique personnalisée</Text>
					<View style={styles.icos}>
						<Ionicons style={styles.iconInfo} name="information" />
					</View>
					<Text style={styles.cta}>Informations sur vos droits et leur évolution</Text>
					<View style={styles.formContainer}>
						<View style={styles.form}>
							<Image source={require("../assets/images/unsa-logo.png")} style={styles.logo} />
							<Text style={styles.titleForm}>Contactez-nous</Text>

							<TextInput style={styles.input} placeholder="Votre nom" value={name} onChangeText={setName} />

							<TextInput style={[styles.input, styles.textArea]} placeholder="Votre message" value={message} onChangeText={setMessage} multiline numberOfLines={4} />

							<TouchableOpacity style={styles.button} onPress={handleSubmit}>
								<Text style={styles.buttonText}>Envoyer</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	imagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	image: {
		width: "100%",
		height: 250,
		resizeMode: "cover",
	},
	mainTitle: {
		fontSize: 44,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	subTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#fff",
		marginHorizontal: 10,
		marginBottom: 20,
		paddingRight: 10,
		paddingLeft: 10,
		textAlign: "justify",
	},
	icos: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	formContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	form: {
		width: "100%",
		maxWidth: 500,
		paddingHorizontal: 40,
		alignContent: "center",
		justifyContent: "center",
		marginBottom: 40,
	},
	logo: {
		width: 180,
		height: 180,
		alignSelf: "center",
		marginBottom: 20,
	},
	titleForm: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		width: "100%",
		backgroundColor: "white",
		borderColor: "#ddd",
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginBottom: 15,
	},
	textArea: {
		height: 120,
		textAlignVertical: "top",
	},
	button: {
		backgroundColor: "#0099FF",
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	iconPerc: {
		color: "#fff",
		fontSize: 44,
		marginTop: 20,
		backgroundColor: "#00A3E9",
		padding: 20,
		borderRadius: 100,
	},
	iconBal: {
		color: "#fff",
		fontSize: 34,
		marginTop: 20,
		backgroundColor: "#00A3E9",
		padding: 20,
		borderRadius: 100,
	},
	iconInfo: {
		color: "#fff",
		fontSize: 74,
		marginTop: 20,
		backgroundColor: "#00A3E9",
		borderRadius: 100,
	},
	cta: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginTop: 10,
		marginBottom: 10,
	},
});

export default TpeScreen;
