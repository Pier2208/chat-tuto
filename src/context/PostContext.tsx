import { createContext, useCallback, useEffect, useReducer } from 'react';

import { POSTS_INITIAL_STATE, PostActionType, postsReducer } from '../reducers/postsReducer';
import { Post } from '../types/Post';
import { addMessage, deleteMessage, editMessage, getMessages } from '../services/postService';

type PostContext = {
  posts: Post[];
  isLoading: boolean;
  deletePost: (postId: string) => void;
  addPost: (post: Post) => void;
  editPost: (postId: string, postContent: Pick<Post, 'title' | 'message'>) => void;
};

export const PostContext = createContext<PostContext>({
  posts: [],
  isLoading: false,
  deletePost: () => {},
  addPost: () => {},
  editPost: () => {},
});

export const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ posts, isLoading }, dispatch] = useReducer(postsReducer, POSTS_INITIAL_STATE);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch({
          type: PostActionType.LOADING,
        });
        const posts = await getMessages();
        dispatch({
          type: PostActionType.GET_POSTS,
          payload: { posts },
        });
      } catch (err) {
        dispatch({
          type: PostActionType.GET_POSTS,
          payload: { posts: [] },
        });
      } finally {
        dispatch({
          type: PostActionType.LOADED,
        });
      }
    };

    fetchPosts();
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      await deleteMessage(postId);
      dispatch({
        type: PostActionType.DELETE_POST,
        payload: { postId },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addPost = useCallback(async (post: Post) => {
    try {
      await addMessage(post);
      dispatch({
        type: PostActionType.ADD_POST,
        payload: { post },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const editPost = useCallback(async (postId: string, postContent: Pick<Post, 'title' | 'message'>) => {
    try {
      await editMessage(postId, postContent);
      dispatch({
        type: PostActionType.EDIT_POST,
        payload: { postId, postContent },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <PostContext.Provider value={{ posts, isLoading, deletePost, addPost, editPost }}>{children}</PostContext.Provider>;
};
