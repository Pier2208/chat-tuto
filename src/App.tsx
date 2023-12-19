import Feed from './components/Feed';
import MessageForm from './components/forms/MessageForm';

export default function App() {
  return (
    <main className="w-full bg-slate-400 min-h-screen">
      <div className="flex flex-col items-center max-w-screen-sm mx-auto py-6">
        <h1 className="text-3xl text-slate-200 m-4">CHAT APP</h1>
        <MessageForm />
        <Feed />
      </div>
    </main>
  );
}
