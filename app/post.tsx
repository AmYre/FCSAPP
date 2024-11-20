import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Share, Linking, Platform } from "react-native";
import RenderHtml from "react-native-render-html";
import { useRoute } from "@react-navigation/native";
import Background from "../components/background";
import { useWindowDimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { decode } from "html-entities";

const PostDetail = () => {
	const route = useRoute();
	const { post } = route.params;
	const { width } = useWindowDimensions();
	const wpParse = (content) => {
		// Decode Unicode-escaped characters
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
	};

	const shareUrls = {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.link)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(post.link)}&text=${encodeURIComponent(post.title.rendered)}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.link)}`,
	};

	const sharePost = async (platform) => {
		try {
			// Generic share for Instagram and TikTok
			if (platform === "instagram" || platform === "tiktok") {
				await Share.share({
					message: `${post.title.rendered}\n\n${post.link}`,
					url: post.link, // iOS only
					title: post.title.rendered,
				});
				return;
			}

			// For other platforms, open their sharing URLs
			const url = shareUrls[platform];
			if (url) {
				// Check if the app can open the URL
				const supported = await Linking.canOpenURL(url);

				if (supported) {
					await Linking.openURL(url);
				} else {
					// Fallback to generic share if the platform app isn't installed
					await Share.share({
						message: `${post.title.rendered}\n\n${post.link}`,
						url: post.link, // iOS only
						title: post.title.rendered,
					});
				}
			}
		} catch (error) {
			console.error("Error sharing:", error);
			// Fallback to generic share
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
				<Image source={{ uri: post.yoast_head_json.og_image[0].url }} style={styles.image} />
				<Text style={styles.title}>{decode(post.title.rendered)}</Text>
				<View style={styles.content}>
					<RenderHtml contentWidth={width} source={{ html: processedContent }} tagsStyles={tagsStyles} />
				</View>
			</ScrollView>
			<View style={styles.floatingIcons}>
				<TouchableOpacity onPress={() => sharePost("facebook")}>
					<FontAwesome name="facebook" size={30} color="#3b5998" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => sharePost("linkedin")}>
					<FontAwesome name="linkedin" size={30} color="#0077b5" style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => sharePost("twitter")}>
					<FontAwesome name="twitter" size={30} color="#1DA1F2" style={styles.icon} />
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
	content: {
		paddingHorizontal: 38,
	},
	floatingIcons: {
		position: "absolute",
		bottom: 20,
		right: 10,
		flexDirection: "column",
	},
	icon: {
		backgroundColor: "#fff",
		borderRadius: 100,
		fontSize: 22,
		padding: 5,
		marginVertical: 12,
		boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",
	},
});

export default PostDetail;
