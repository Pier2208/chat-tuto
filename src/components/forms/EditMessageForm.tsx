import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { usePost } from '../../hooks/usePost';
import { Post } from '../../types/Post';
import EditAction from '../Post/EditAction';

interface EditFormProps {
  post: Post;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditForm({ post, setIsEditing }: EditFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState({
    title: post.title,
    message: post.message,
  });
  const { editPost } = usePost();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.title || !state.message) return;

    editPost(post.id, { title: state.title, message: state.message });
    setState({
      title: '',
      message: '',
    });
    setIsEditing(false);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="text-xl text-slate-800 outline-none bg-slate-200"
        name="title"
        value={state.title}
        onChange={handleChange}
      />

      <div className="border h-1 bg-slate-300 my-2" />

      <textarea
        className="p-2 mb-2 text-sm font-medium text-slate-500 italic bg-slate-200 outline-none"
        name="message"
        rows={3}
        value={state.message}
        onChange={handleChange}
      ></textarea>
      <EditAction setIsEditing={setIsEditing} isEditing={true} />
    </form>
  );
}
