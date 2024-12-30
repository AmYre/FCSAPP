import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Background from "@/components/background";
import { useWindowDimensions } from "react-native";

const SectionScreen = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const handleSubmit = async () => {
		const mailtoUrl = `mailto:fcs@unsa.org?subject=Contact&body=Nome : ${name}%0D%0AMessage : ${message}`;

		try {
			await Linking.openURL(mailtoUrl);
		} catch (error) {
			Alert.alert("Error", "Could not open mail app");
		}
	};

	return (
		<Background>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<Image source={require("@/assets/images/section.jpg")} style={isIpad ? styles.imagePad : styles.image} />
					<Text style={styles.title}>Ce que la législation permet</Text>
					<Text style={styles.description}>
						L’article L.2142-1 du Code du Travail permet de créer une section syndicale à partir de 2 adhérents UNSA sur le périmètre du CSE. Dès la création de la section syndicale,
						l’UNSA procède à la désignation d’un RSS (Représentant de la section syndicale). Condition : le·la RSS doit avoir plus d’un an d’ancienneté et ne pas faire l’objet d’une
						procédure de licenciement en cours.
					</Text>
					<Text style={styles.title}>Des moyens pour agir</Text>
					<Text style={styles.description}>
						Les articles L.2142-1-1 à L.2142-1-3 attribuent au RSS UNSA des droits spécifiques, lui permettant de représenter l’UNSA dans l’entreprise : 4 heures mensuelles de délégation
						pour effectuer sa mission syndicale, statut de salarié.e protégé·e, possibilité d’affichage dans l’entreprise, de distribution de tracts syndicaux et d’organisation de réunions
						mensuelles avec les adhérents.
					</Text>
					<Text style={styles.title}>Des élections CSE à préparer</Text>
					<Text style={styles.description}>
						Ce statut de RSS permet de s’implanter en toute protection dans l’entreprise et de préparer les prochaines élections au CSE (Comité social et économique) avec l’aide de l’UNSA.
						Le·la RSS est obligatoirement invité.e à négocier le protocole d’accord préélectoral. Il peut se faire accompagner d’un représentant UNSA, extérieur à l’entreprise, et mandaté.
						Si vous obtenez un score d’au moins 10 % des voix, votre section peut désigner un·e délégué·e syndical·e qui pourra négocier et signer des accords, au nom de l’UNSA, le cas
						échéant.
					</Text>
					<View style={styles.form}>
						<Image source={require("../assets/images/unsa-logo.png")} style={styles.logo} />
						<Text style={styles.titleForm}>Contactez-nous</Text>

						<TextInput style={styles.input} placeholder="Votre nom" value={name} onChangeText={setName} />

						<TextInput style={[styles.input, styles.textArea]} placeholder="Votre message" value={message} onChangeText={setMessage} multiline numberOfLines={4} />

						<TouchableOpacity style={styles.button} onPress={handleSubmit}>
							<Text style={styles.buttonText}>Envoyer</Text>
						</TouchableOpacity>
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
	},
	image: {
		width: "100%",
		height: 250,
		resizeMode: "cover",
	},
	imagePad: {
		width: "100%",
		height: 450,
		resizeMode: "cover",
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
		maxWidth: 700,
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
});

export default SectionScreen;
