class Post {
    constructor({
                    postId,
                    title,
                    content,
                    userName,
                    hobbyName,
                    createdAt,
                    imageUrls = [],
                }) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.userName = userName;
        this.hobbyName = hobbyName;
        this.createdAt = new Date(createdAt);
        this.imageUrls = imageUrls;
    }
}

export default Post;