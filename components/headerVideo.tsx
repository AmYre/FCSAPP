import { Video, ResizeMode } from "expo-av";
import { StyleSheet, View } from "react-native";
import { useWindowDimensions } from "react-native";

const HeaderVideo = () => {
	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	return (
		<View style={styles.container}>
			<Video
				source={require("../assets/videos/unsa.mp4")}
				style={isIpad ? styles.videoPad : styles.video}
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
	videoPad: {
		width: "100%",
		height: 600,
	},
});

export default HeaderVideo;
