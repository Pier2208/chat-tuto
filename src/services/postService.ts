import { Post } from "../types/Post";

export const getMessages = async (): Promise<Post[]> => {
  try {
    const res = await fetch('http://localhost:8000/posts');
    const messages: Post[] = await res.json()
    return messages
  }
  catch (err) {
    console.log('[GET_MESSAGES', err)
    return []
  }
}

export const addMessage = async (post: Post): Promise<Post | null> => {
  try {
    const res = await fetch(`http://localhost:8000/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const newPost = await res.json();
    return newPost
  }
  catch (err) {
    console.log('[ADD_MESSAGE', err)
    return null;
  }
}

export const editMessage = async (postId: string, postContent: Pick<Post, 'title' | 'message'>) => {
  try {
    const res = await fetch(`http://localhost:8000/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...postContent,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
    const editedPost = await res.json();

    return editedPost;
  }
  catch (err) {
    console.log(['EDIT_MESSAGE', err])
    return null;
  }
}

export const deleteMessage = async (messageId: string): Promise<Post | null> => {
  try {
    const res = await fetch(`http://localhost:8000/posts/${messageId}`, {
      method: 'DELETE'
    });
    const deletedMessage = await res.json();
    return deletedMessage
  }
  catch (err) {
    console.log('[DELETE_MESSAGE', err)
    return null;
  }
}
