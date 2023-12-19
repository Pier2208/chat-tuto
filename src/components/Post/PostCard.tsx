import { Post } from '../../types/Post';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';
import { useState } from 'react';
import EditForm from '../forms/EditMessageForm';
import PostContent from './PostContent';

interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="flex flex-col justify-between p-4 bg-slate-200 w-full border-1">
      {isEditing ? (
        <EditForm post={post} setIsEditing={setIsEditing} />
      ) : (
        <>
          <PostContent title={post.title} description={post.message} />
          <div className="flex items-center justify-end">
            <EditAction setIsEditing={setIsEditing} isEditing={isEditing} />
            <DeleteAction postId={post.id} />
          </div>
        </>
      )}
    </article>
  );
}
