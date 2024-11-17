import React, { useState, useRef } from "react";
import { Video, ResizeMode } from "expo-av";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const InterimVideo = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pauseAsync();
			} else {
				videoRef.current.playAsync();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.videoContainer} onPress={handlePlayPause}>
				<Video
					ref={videoRef}
					source={require("../assets/videos/interim.mp4")}
					style={styles.video}
					resizeMode={ResizeMode.COVER}
					useNativeControls={false}
					posterSource={require("../assets/images/thumb.jpg")}
					posterStyle={styles.poster}
					usePoster
				/>
			</TouchableOpacity>
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
	poster: {
		width: "100%",
		height: 300,
		resizeMode: "cover",
		zIndex: 10,
	},
	videoContainer: {
		width: "100%",
		height: 300,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default InterimVideo;
