import { Tabs } from "expo-router";
import { Image, View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AppLayout() {
	const openLink = (url: string) => {
		Linking.openURL(url);
	};

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: styles.tabBar,
				tabBarActiveTintColor: "#0099FF",
				tabBarInactiveTintColor: "#666666",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="news"
				options={{
					title: "actualité",
					tabBarIcon: () => (
						<View>
							<TouchableOpacity onPress={() => openLink("https://commerces-services.unsa.org/actu/")}>
								<Image source={require("../assets/images/news-icon.png")} style={styles.icoNews} />
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="adh"
				options={{
					title: "adhérents",
					tabBarIcon: () => (
						<View>
							<Image source={require("../assets/images/adh-icon.png")} style={styles.ico} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: "",
					tabBarIcon: () => (
						<View style={styles.centerButton}>
							<Image source={require("../assets/images/unsa-logo.png")} style={styles.logo} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="medias"
				options={{
					title: "médias",
					tabBarIcon: () => (
						<View>
							<TouchableOpacity onPress={() => openLink("https://commerces-services.unsa.org/web-tv/")}>
								<Image source={require("../assets/images/media-icon.png")} style={styles.icoMedia} />
							</TouchableOpacity>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="contact"
				options={{
					title: "contact",
					tabBarIcon: () => (
						<View>
							<TouchableOpacity onPress={() => openLink("https://commerces-services.unsa.org/contact/")}>
								<Image source={require("../assets/images/contact-icon.png")} style={styles.icoContact} />
							</TouchableOpacity>
						</View>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		height: 60,
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#E5E5E5",
		paddingBottom: 5,
		paddingTop: 5,
	},
	tabScreen: {
		color: "#00A3E9",
	},
	centerButton: {
		width: 60,
		height: 60,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		borderWidth: 40,
		borderColor: "#fff",
		boxShadow: "0 0 5px rgba(0, 0, 0, 0.15)",
	},
	logo: {
		width: 80,
		height: 80,
		resizeMode: "contain",
	},
	ico: {
		width: 45,
		height: 45,
		resizeMode: "contain",
	},
	icoNews: {
		width: 33,
		height: 33,
		resizeMode: "contain",
	},
	icoMedia: {
		width: 45,
		height: 45,
		resizeMode: "contain",
	},
	icoContact: {
		width: 42,
		height: 42,
		resizeMode: "contain",
	},
});
