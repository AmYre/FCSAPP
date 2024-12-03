import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, Linking } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Background from "../components/background";

export default function AdhScreen() {
	const openLink = (url: string) => {
		Linking.openURL(url);
	};
	const navigation = useNavigation();

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.leftButton} onPress={() => navigation.navigate("section")}>
							<FontAwesome6 name="hand-fist" size={38} color="white" style={styles.leftIcon} />
							<Text style={styles.buttonText}>CRÉER SECTION</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.rightButton} onPress={() => openLink("https://commerces-services.unsa.org/adhesion/")}>
							<FontAwesome5 name="file-signature" size={34} color="white" style={styles.rightIcon} />
							<Text style={styles.buttonText}>ADHÉSION EN LIGNE</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("team")}>
						<Image source={require("../assets/images/team.jpg")} style={styles.image} />
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							Découvrez notre équipe
						</Text>
						<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
							Les membres du bureaux, de la comission administrative et vos référents PAP sont à votre entière disposition pour échangez de vos difficultés, vous accompagner pour trouver
							des solutions et vous rencontrer. Nous sommes une équipe de terrain !
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("branches")}>
						<Image source={require("../assets/images/branches.jpg")} style={styles.image} />
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							Toutes nos Branches
						</Text>
						<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
							Nos équipes suivent de près les négociations et l'actualité de chaque secteur afin de porter vos voix de auprès des organisations patronales, obtenir des avancées concrètes
							sur les salaires, la formation, et vos conditions de travail du quotidien.
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("accords")}>
						<Image source={require("../assets/images/accords.jpg")} style={styles.image} />
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							Les accords de Branches
						</Text>
						<Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
							Retrouvez toutes les négociations que nous avons obtenu pour vous à travers le temps. Notres boussole, le justice sociale et l’améliorations de vos conditions de travail
							dans tous les secteurs ou nous sommes représentatifs.
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
		paddingBottom: 30,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		marginVertical: 40,
	},
	leftButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#00A3E9",
		padding: 15,
		borderRadius: 5,
		width: "45%",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: "#FFF",
	},
	rightButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#DA2E2E",
		padding: 15,
		borderRadius: 5,
		width: "45%",
		justifyContent: "center",
	},
	leftIcon: {
		position: "absolute",
		left: -10,
	},
	rightIcon: {
		position: "absolute",
		left: -10,
	},
	buttonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
	card: {
		width: "90%",
		marginHorizontal: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		shadowColor: "rgba(0, 0, 0, 0.75)",
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		elevation: 5,
	},
	image: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00A3E9",
		textAlign: "center",
		paddingRight: 20,
		paddingLeft: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		color: "#666",
		marginHorizontal: 10,
		marginBottom: 20,
		paddingRight: 10,
		paddingLeft: 10,
		textAlign: "justify",
	},
});
