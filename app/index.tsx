import { View, ScrollView, TouchableOpacity, Text, Image, ImageBackground, StyleSheet, Linking, Share } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import Background from "../components/background";
import HeaderVideo from "../components/headerVideo";
import InterimVideo from "../components/interimVideo";
import BlogSlider from "../components/slider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const openLink = (url: string) => {
		Linking.openURL(url);
	};
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const openShare = async (message) => {
		try {
			await Share.share({
				message: message,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<Background>
			<ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
				<SafeAreaView>
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
					<HeaderVideo />

					{/* News Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Ne ratez rien de l’actualité</Text>
						<BlogSlider />
					</View>
					<View style={isIpad ? styles.row : styles.column}>
						<View style={styles.midSection}>
							<ImageBackground source={require("../assets/images/tpe-section.jpg")} style={styles.imageBackground}>
								<View style={styles.overlay}>
									<Text style={styles.imageTitle}>UNSA TPE</Text>
									<TouchableOpacity style={styles.buttonTPE} onPress={() => navigation.navigate("tpe")}>
										<Text style={styles.buttonTPEText}>Je m'informe</Text>
									</TouchableOpacity>
								</View>
							</ImageBackground>
						</View>
						<InterimVideo style={styles.midSection} />
						<View style={styles.midSection}>
							<ImageBackground source={require("../assets/images/droits.jpg")} style={styles.imageBackground}>
								<View style={styles.overlay}>
									<Text style={styles.imageTitle}>VOS DROITS</Text>
									<TouchableOpacity style={styles.buttonTPE} onPress={() => navigation.navigate("juri")}>
										<Text style={styles.buttonTPEText}>Je m'informe</Text>
									</TouchableOpacity>
								</View>
							</ImageBackground>
						</View>
					</View>
					<View style={styles.sectionSocial}>
						<Text style={styles.sectionTitleSocial}>Plus fort ensemble !</Text>
						<View style={styles.socials}>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Facebook: https://www.facebook.com/unsa.fcs/")}>
								<FontAwesome5 style={isIpad ? styles.facebookPad : styles.facebook} name="facebook" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Instagram: https://www.instagram.com/unsafcs/")}>
								<FontAwesome5 style={isIpad ? styles.instaPad : styles.insta} name="instagram" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur LinkedIn: https://www.linkedin.com/in/fatiha-hiraki-775534124/")}>
								<FontAwesome5 style={isIpad ? styles.linkedinPad : styles.linkedin} name="linkedin" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur Twitter: https://x.com/UnsaFcs")}>
								<FontAwesome5 style={isIpad ? styles.twitterPad : styles.twitter} name="twitter" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur TikTok: https://www.tiktok.com/@fcs.unsa")}>
								<FontAwesome5 style={isIpad ? styles.tiktokPad : styles.tiktok} name="tiktok" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => openShare("Découvrez notre application sur YouTube: https://www.youtube.com/channel/UCBcaU-snW_BHsJJvwekDHrA")}>
								<FontAwesome5 style={isIpad ? styles.youtubePad : styles.youtube} name="youtube" size={isIpad ? 80 : 56} color="white" />
							</TouchableOpacity>
						</View>
					</View>
					{/* <View style={styles.sectionPartners}>
					<Text style={styles.sectionTitle}>Nos Partenaires</Text>
					<TouchableOpacity onPress={() => openLink("https://www.malakoffhumanis.com/")}>
						<ImageBackground resizeMode="contain" style={styles.malakoff} source={require("../assets/images/malakoff.jpg")} />
					</TouchableOpacity>
					<View style={styles.line1}>
						<TouchableOpacity style={styles.humanisContainer} onPress={() => openLink("https://www.malakoffhumanis.com/")}>
							<Image style={styles.humanis} source={require("../assets/images/humanis.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.ocirpContainer} onPress={() => openLink("https://www.ocirp.fr/")}>
							<Image style={styles.ocirp} source={require("../assets/images/ocirp.jpg")} />
						</TouchableOpacity>
					</View>
					<View style={styles.line2}>
						<TouchableOpacity style={styles.klesiaContainer} onPress={() => openLink("https://www.klesia.fr/")}>
							<Image style={styles.klesia} source={require("../assets/images/klesia.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.vyvContainer} onPress={() => openLink("https://www.groupe-vyv.fr/")}>
							<Image style={styles.vyv} source={require("../assets/images/vyv.jpg")} />
						</TouchableOpacity>
					</View>
					<View style={styles.line3}>
						<TouchableOpacity style={styles.apicilContainer} onPress={() => openLink("https://mon.apicil.com/")}>
							<Image style={styles.apicil} source={require("../assets/images/apicil.jpg")} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.ag2rContainer} onPress={() => openLink("https://www.ag2rlamondiale.fr/")}>
							<Image style={styles.ag2r} source={require("../assets/images/ag2r.jpg")} />
						</TouchableOpacity>
					</View>
				</View> */}
				</SafeAreaView>
			</ScrollView>
		</Background>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	column: {
		flexDirection: "column",
		justifyContent: "space-between",
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 50,
	},
	banner: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	midSection: {
		flex: 1,
	},
	section: {
		padding: 16,
	},
	sectionTitle: {
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
	sectionImage: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
		borderRadius: 8,
	},
	video: {
		width: "100%",
		height: 200,
	},
	socialLinks: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 16,
	},
	partners: {
		padding: 16,
		alignItems: "center",
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
	imageBackground: {
		width: "100%",
		height: 300,
		resizeMode: "cover",
	},
	overlay: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
	},
	imageTitle: {
		color: "#FFF",
		fontSize: 38,
		fontWeight: "bold",
		textShadowColor: "rgba(0, 0, 0, 0.65)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
	},
	buttonTPE: {
		width: "50%",
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
		borderColor: "#00A3E9",
		borderWidth: 2,
	},
	buttonTPEText: {
		fontSize: 16,
		color: "#00A3E9",
		fontWeight: "bold",
		textAlign: "center",
	},
	videoINTERIM: {
		width: "100%",
		height: 300,
	},
	sectionSocial: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	sectionTitleSocial: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		textShadowColor: "rgba(0, 0, 0, 0.55)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginTop: 30,
		marginBottom: 50,
		color: "#FFF",
	},
	socials: {
		position: "relative",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center",
		padding: 16,
		maxWidth: 600,
		height: 300,
	},
	facebook: {
		transform: [{ translateX: -120 }, { translateY: 50 }],
	},
	insta: {
		transform: [{ translateX: 0 }, { translateY: 80 }],
	},
	linkedin: {
		transform: [{ translateX: 30 }, { translateY: -90 }],
	},
	twitter: {
		transform: [{ translateX: -130 }, { translateY: 0 }],
	},
	tiktok: {
		transform: [{ translateX: 30 }, { translateY: 20 }],
	},
	youtube: {
		transform: [{ translateX: 130 }, { translateY: -170 }],
	},
	facebookPad: {
		transform: [{ translateX: -120 }, { translateY: 50 }],
	},
	instaPad: {
		transform: [{ translateX: 0 }, { translateY: 80 }],
	},
	linkedinPad: {
		transform: [{ translateX: 130 }, { translateY: -90 }],
	},
	twitterPad: {
		transform: [{ translateX: -130 }, { translateY: 0 }],
	},
	tiktokPad: {
		transform: [{ translateX: 30 }, { translateY: 0 }],
	},
	youtubePad: {
		transform: [{ translateX: 170 }, { translateY: -170 }],
	},
	sectionPartners: {
		marginTop: 20,
	},
	malakoff: {
		width: "100%",
		height: 100,
		backgroundColor: "#FFF",
	},
	humanisContainer: {
		width: "50%",
		height: 70,
	},
	ocirpContainer: {
		width: "50%",
		height: 70,
	},
	klesiaContainer: {
		width: "60%",
		height: 80,
	},
	vyvContainer: {
		width: "40%",
		height: 80,
	},
	apicilContainer: {
		width: "45%",
		height: 70,
	},
	ag2rContainer: {
		width: "55%",
		height: 70,
	},
	humanis: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	ocirp: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	klesia: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	vyv: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	apicil: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	ag2r: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
	line1: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
	line2: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
	line3: {
		flexDirection: "row",
		width: "100%",
		backgroundColor: "#FFF",
	},
});
