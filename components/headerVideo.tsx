import { Video, ResizeMode } from "expo-av";
import { StyleSheet, View } from "react-native";

const HeaderVideo = () => {
	return (
		<View style={styles.container}>
			<Video
				source={require("../assets/videos/unsa.mp4")}
				style={styles.video}
				resizeMode={ResizeMode.COVER} // Using the enum value, not a string
				shouldPlay
				isLooping
				isMuted
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	video: {
		width: "100%",
		height: 300,
	},
});

export default HeaderVideo;
