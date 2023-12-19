import { Trash } from 'lucide-react';
import { usePost } from '../../hooks/usePost';

interface DeleteActionProps {
  postId: string;
}

export default function DeleteAction({ postId }: DeleteActionProps) {
  const { deletePost } = usePost();

  return <Trash onClick={() => deletePost(postId)} className="h-5 w-5 ml-2 text-slate-700 hover:text-slate-500 cursor-pointer" />;
}
