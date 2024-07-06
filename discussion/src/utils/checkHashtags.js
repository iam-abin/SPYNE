export const filterAndNormalizeHashtags = (tagArray) => {
	const hashtags = [];
	for (let i = 0; i < tagArray.length; i++) {
		if (tagArray[i].includes("#")) {
			hashtags.push(tagArray[i].toLowerCase()); // Convert to lowercase for consistency
		}
	}
	return hashtags;
};
