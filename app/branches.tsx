import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from "react-native";
import Background from "@/components/background";
import { FontAwesome } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const alimentaire = [
	{ id: "leaf21", name: "Boulangerie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635886" },
	{ id: "leaf22", name: "Pâtisserie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635611" },
	{ id: "leaf23", name: "Charcuterie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635375" },
	{ id: "leaf24", name: "Poissonerie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635410" },
	{ id: "leaf25", name: "Boucherie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635593" },
	{ id: "leaf26", name: "Traiteurs", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000020751473/?idConteneur=KALICONT000005635375" },
];

const detail = [
	{ id: "leaf31", name: "Habillement", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635594" },
	{ id: "leaf32", name: "Sports Loisir", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635645" },
	{ id: "leaf33", name: "Chaussures", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635629" },
	{ id: "leaf34", name: "Horlogerie Bijouterie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635827" },
	{ id: "leaf35", name: "Optique", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635912" },
	{ id: "leaf36", name: "Parfumerie", url: "https://code.travail.gouv.fr/convention-collective/3032-parfumerie-esthetique" },
	{ id: "leaf37", name: "Papeterie", url: "https://code.travail.gouv.fr/convention-collective/1539-papeterie-commerce-de-detail-de-papeterie-fournitures-de-bureau-bureaut" },
	{ id: "leaf38", name: "Librairie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027180935" },
	{ id: "leaf39", name: "Gérants mandataires", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005640320/" },
];

const services = [
	{ id: "leaf41", name: "Prévention Sécurité", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635405" },
	{ id: "leaf42", name: "Propreté", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027172335" },
	{ id: "leaf43", name: "Travail Temporaire", url: "https://code.travail.gouv.fr/convention-collective/1413-salaries-permanents-des-entreprises-de-travail-temporaire" },
	{ id: "leaf44", name: "Médico Technique", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005636023" },
	{ id: "leaf45", name: "Quincaillerie", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000047839180" },
	{ id: "leaf46", name: "Automobile", url: "https://code.travail.gouv.fr/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle" },
	{ id: "leaf47", name: "Pompes Funebres", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635490" },
	{ id: "leaf48", name: "Désinfection 3D", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635437" },
];

const commerces = [
	{ id: "leaf11", name: "Coiffure", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000018563755" },
	{ id: "leaf12", name: "Esthétique", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027065067" },
	{ id: "leaf13", name: "Couture Mode", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635552" },
	{ id: "leaf14", name: "Fleuristes Animaliers", url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000005635507" },
];

const BranchesScreen = () => {
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;
	return (
		<Background>
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView style={styles.container}>
					<Image source={require("@/assets/images/branches.jpg")} style={isIpad ? styles.imagePad : styles.image} />
					<Text style={isIpad ? styles.titlePad : styles.title}>Branches Professionnelles</Text>
					<View style={styles.wrapper}>
						<View style={styles.card}>
							<Text style={isIpad ? styles.textPad : styles.text}>Commerces</Text>
							{commerces.map((branche) => (
								<View style={styles.nodeContainer}>
									<TouchableOpacity key={branche.id} style={styles.node} onPress={() => Linking.openURL(branche.url)}>
										<FontAwesome name="book" size={24} color="#272F6B" />
										<Text style={isIpad ? styles.nodeTextPad : styles.nodeText}> {branche.name}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
						<View style={styles.card}>
							<Text style={isIpad ? styles.textPad : styles.text}>Artisanat Alimentaire</Text>
							{alimentaire.map((branche) => (
								<View style={styles.nodeContainer}>
									<TouchableOpacity key={branche.id} style={styles.node} onPress={() => Linking.openURL(branche.url)}>
										<FontAwesome name="book" size={24} color="#272F6B" />
										<Text style={isIpad ? styles.nodeTextPad : styles.nodeText}> {branche.name}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
						<View style={styles.card}>
							<Text style={isIpad ? styles.textPad : styles.text}>Services</Text>
							{services.map((branche) => (
								<View style={styles.nodeContainer}>
									<TouchableOpacity key={branche.id} style={styles.node} onPress={() => Linking.openURL(branche.url)}>
										<FontAwesome name="book" size={24} color="#272F6B" />
										<Text style={isIpad ? styles.nodeTextPad : styles.nodeText}> {branche.name}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
						<View style={styles.card}>
							<Text style={isIpad ? styles.textPad : styles.text}>Commerce de Details</Text>
							{detail.map((branche) => (
								<View style={styles.nodeContainer}>
									<TouchableOpacity key={branche.id} style={styles.node} onPress={() => Linking.openURL(branche.url)}>
										<FontAwesome name="book" size={24} color="#272F6B" />
										<Text style={isIpad ? styles.nodeTextPad : styles.nodeText}> {branche.name}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 20,
	},
	image: {
		width: "100%",
		height: 200,
	},
	imagePad: {
		width: "100%",
		height: 400,
	},
	wrapper: {
		justifyContent: "center",
		display: "flex",
		flex: 1,
		gap: 20,
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 20,
	},
	card: {
		backgroundColor: "#fff",
		width: "80%",
		maxWidth: 450,
		padding: 40,
		borderRadius: 10,
		overflow: "hidden",
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 10,
		marginBottom: 10,
		color: "#FFF",
	},
	titlePad: {
		fontSize: 36,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 10,
		marginBottom: 10,
		color: "#FFF",
	},
	nodeContainer: {
		paddingLeft: 20,
		marginBottom: 20,
	},
	node: {
		borderRadius: 10,
		boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingLeft: 20,
	},
	text: {
		fontSize: 18,
		color: "#272F6B",
		paddingBottom: 20,
	},
	textPad: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#272F6B",
		paddingBottom: 20,
	},
	nodeText: {
		fontSize: 12,
		color: "#272F6B",
	},
	nodeTextPad: {
		fontSize: 24,
		color: "#272F6B",
	},
	childContainer: {
		paddingLeft: 20,
	},
});

export default BranchesScreen;
