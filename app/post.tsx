import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";
import { useRoute } from "@react-navigation/native";
import Background from "../components/background";
import { useWindowDimensions } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { decode } from "html-entities";

const PostDetail = () => {
	const route = useRoute();
	const { post } = route.params;
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		const checkLiked = async () => {
			try {
				const liked = await AsyncStorage.getItem(`${post.id}`);
				setIsLiked(liked !== null);
			} catch (error) {
				console.error("Error checking liked:", error);
			}
		};

		checkLiked();
	}, [post.id]);

	const toggleLiked = async (liked, id) => {
		try {
			if (liked) {
				await AsyncStorage.removeItem(`${id}`);
			} else {
				await AsyncStorage.setItem(`${id}`, "liked");
			}
			setIsLiked(!liked);
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const { width } = useWindowDimensions();
	const isIpad = width >= 768;

	const wpParse = (content) => {
		return content
			.replace(/\\u003C/g, "<")
			.replace(/\\u003E/g, ">")
			.replace(/&rsquo;/g, "'")
			.replace(/&nbsp;/g, " ");
	};

	const processedContent = wpParse(post.content.rendered);
	const tagsStyles = {
		p: {
			color: "#fff",
			textAlign: "justify",
		},
		h1: {
			color: "#fff",
			textAlign: "center",
		},
		h2: {
			color: "#fff",
			textAlign: "center",
		},
		h3: {
			color: "#fff",
			textAlign: "center",
		},
		ul: {
			color: "#fff",
			textAlign: "justify",
		},
		div: {
			color: "#fff",
			textAlign: "justify",
		},
	};

	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title.rendered)}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.link)}`,
	};

	const sharePost = async (platform) => {
		try {
			if (platform === "instagram" || platform === "tiktok") {
				await Share.share({
					message: `${post.title.rendered}\n\n${post.link}`,
					url: post.link,
					title: post.title.rendered,
				});
				return;
			}

			const url = shareUrls[platform];
			if (url) {
				// Check if the app can open the URL
				const supported = await Linking.canOpenURL(url);

				if (supported) {
					await Linking.openURL(url);
				} else {
					await Share.share({
						message: `${post.title.rendered}\n\n${post.link}`,
						url: post.link,
						title: post.title.rendered,
					});
				}
			}
		} catch (error) {
			console.error("Error sharing:", error);
			try {
				await Share.share({
					message: `${post.title.rendered}\n\n${post.link}`,
					url: post.link, // iOS only
					title: post.title.rendered,
				});
			} catch (shareError) {
				console.error("Error using fallback share:", shareError);
			}
		}
	};

	return (
		<Background>
			<ScrollView style={styles.container}>
				<Image source={{ uri: post.yoast_head_json.og_image[0].url }} style={isIpad ? styles.mainImagePad : styles.mainImage} />
				<Text style={isIpad ? styles.titlePad : styles.title}>{decode(post.title.rendered)}</Text>

				<View style={styles.content}>
					<RenderHtml contentWidth={width} source={{ html: processedContent }} tagsStyles={tagsStyles} />
				</View>
			</ScrollView>
			<View style={styles.floatingIcons}>
				<TouchableOpacity style={styles.iconWrapH} onPress={() => toggleLiked(isLiked, post.id)}>
					{isLiked ? <FontAwesome name="heart" color="#f00" style={styles.iconH} /> : <FontAwesome name="heart" color="#ccc" style={styles.iconH} />}
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconWrap} onPress={() => sharePost("facebook")}>
					<FontAwesome name="facebook" color="#3b5998" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconWrap} onPress={() => sharePost("linkedin")}>
					<FontAwesome name="linkedin" color="#0077b5" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconWrap} onPress={() => sharePost("twitter")}>
					<FontAwesome name="twitter" color="#1DA1F2" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconWrap} onPress={() => sharePost("instagram")}>
					<FontAwesome name="instagram" color="#C13584" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconWrap} onPress={() => sharePost("tiktok")}>
					<FontAwesome5 name="tiktok" color="#000" style={styles.iconTK} />
				</TouchableOpacity>
			</View>
		</Background>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 30,
	},
	mainImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	mainImagePad: {
		width: "100%",
		height: 400,
		resizeMode: "cover",
	},
	image: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	title: {
		fontSize: 14,
		color: "#272F6B",
		textTransform: "uppercase",
		backgroundColor: "#fff",
		textAlign: "center",
		borderRadius: 8,
		fontWeight: "bold",
		marginHorizontal: 24,
		paddingHorizontal: 24,
		paddingVertical: 8,
		transform: [{ translateY: -34 }],
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
	},
	titlePad: {
		fontSize: 24,
		color: "#272F6B",
		textTransform: "uppercase",
		backgroundColor: "#fff",
		textAlign: "center",
		borderRadius: 8,
		fontWeight: "bold",
		marginHorizontal: 24,
		paddingHorizontal: 24,
		paddingVertical: 8,
		transform: [{ translateY: -40 }],
		boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.25)",
	},
	content: {
		paddingHorizontal: 38,
		textAlign: "justify",
	},
	floatingIcons: {
		position: "absolute",
		bottom: 20,
		right: 10,
		flexDirection: "column",
	},
	iconWrap: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: "#fff",
		borderRadius: 100,
		boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
	},
	iconWrapH: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: "#fff",
		borderRadius: 100,
		boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
	},
	icon: {
		fontSize: 22,
		padding: 5,
	},
	iconH: {
		fontSize: 22,
		paddingTop: 6,
		padding: 5,
	},
	iconTK: {
		fontSize: 18,
		padding: 5,
	},
});

export default PostDetail;
