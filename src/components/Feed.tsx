import { usePost } from '../hooks/usePost';
import PostCard from './Post/PostCard';

export default function Feed() {
  const { posts, isLoading } = usePost();

  return (
    <section className="flex flex-col items-center gap-y-4 w-full mt-8">
      {isLoading ? <p>Loading...</p> : posts.map((post) => <PostCard key={post.id} post={post} />)}
    </section>
  );
}
