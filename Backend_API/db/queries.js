const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            comments: true
        }
    });
    return posts;
};

async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });
    if (!post) return null;
    return post
};

async function postComment(postId, comment, commenter = 'Anonymous') {
    try {
        await prisma.comment.create({
            data: {
                content: comment,
                postId: postId,
                commenter: commenter
            }
        });
        console.log('posted');
    } catch (error) {
        console.log(error);
    }
};

async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            email: true,
            password: true
        }
    });
    return user;
}

async function postNewAdmin(name, email, hashedPassword) {
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });
    console.log('Created Admin!');
}

async function postNewPost(title, content, published, authorId) {
    const author = await prisma.user.findUnique({
        where: {
            id: authorId
        },
        select: {
            name: true
        }
    })
    await prisma.post.create({
    data: {
      title: title,
      content: content,
      published,
      author: {
        connect: {
            id: authorId
        }
      }  // link to User by authorId foreign key
    }
  });
  console.log('Created Post');
}

async function putUpdatePost(id,title, content, published){
    await prisma.post.update({
        where: {
            id: id
        },data: {
           title: title,
           content: content,
           published: published 
        }
    });
    console.log('Updated')
}

async function deletePostById(id) {
    await prisma.comment.deleteMany({
        where: { postId: id },
    });
    await prisma.post.delete({
        where: {
            id
        }
    });
    console.log('Post deleted, ID:', id)
}

async function deleteCommentById(id){
    await prisma.comment.delete({
        where: {
            id
        }
    });
    console.log('Comment deleted');
}

module.exports = {
    getAllPosts,
    getPostById,
    postComment,
    getUserByEmail,
    postNewAdmin,
    postNewPost,
    putUpdatePost,
    deletePostById,
    deleteCommentById
}