const Joi = require("joi");
const prisma = require("../utils/connection");

const getAll = async (req, res) => {
  try {
    const posts = await prisma.blogs.findMany();

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const updatedPost = await prisma.blogs.update({
          where: { id: prisma.blogs.id },
          data: {
            views: {
              increment: 1,
            },
          },
        });
        return updatedPost;
      })
    );

    res.json({ message: "Success", data: updatedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getUsersWithPost = async (req, res) => {
  try {
    const usersWithPosts = await prisma.users.findMany({
      include: {
        posts: true,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        createdAt: true,
      },
    });

    res.json({ message: "Success", data: usersWithPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    const post = await prisma.blogs.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    res.json({ message: "Success", data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getRandom = async (req, res) => {
  try {
    const randomPosts = await prisma.blogs.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ message: "Success", data: randomPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getTop = async (req, res) => {
  try {
    const topPosts = await prisma.blogs.findMany({
      take: 10,
      orderBy: {
        views: "desc",
      },
    });

    res.json({ message: "Success", data: topPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getUsersCount = async (req, res) => {
  try {
    const usersCount = await prisma.users.count();

    res.json({ message: "Success", data: usersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getByHashtag = async (req, res) => {
  try {
    const hashtag = req.params.hashtag;
    const posts = await prisma.blogs.findMany({
      where: {
        OR: [
          { content: { contains: hashtag } },
          { title: { contains: hashtag } },
        ],
      },
    });

    res.json({ message: "Success", data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const post = async (req, res) => {
  try {
    const { title, description, hashtag } = req.body;
    const { id } = req.user;

    const newPost = await prisma.blogs.create({
      data: {
        title,
        description,
        hashtag,
      },
    });

    res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const put = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, description, hashtag } = req.body;
    const updatedPost = await prisma.blog.update({
      where: {
        id: postId,
      },
      data: {
        title,
        description,
        hashtag,
      },
    });

    res.json({ message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const remove = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    await prisma.blogs.delete({
      where: {
        id: postId,
      },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  post,
  put,
  remove,
  getAll,
  getByHashtag,
  getById,
  getRandom,
  getTop,
  getUsersCount,
  getUsersWithPost,
};
