import { Edit2, SaveIcon, StepBack } from 'lucide-react';

interface EditActionProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
}

export default function EditAction({ setIsEditing, isEditing }: EditActionProps) {
  return isEditing ? (
    <div className="flex items-center gap-x-2">
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className=" cursor-pointer flex border-slate-900 border text-slate-900 px-2 py-1 rounded-md items-center bg-slate-300 text-xs"
      >
        cancel
        <StepBack className="text-slate-900 h-5 w-5" />
      </button>
      <button type="submit" className="cursor-pointer flex bg-slate-900 px-2 py-1 rounded-md text-slate-100 items-center text-xs">
        save
        <SaveIcon className="text-slate-100 h-5 w-5 ml-2" />
      </button>
    </div>
  ) : (
    <Edit2 onClick={() => setIsEditing(!isEditing)} className="ml-2 h-5 w-5 text-slate-500 cursor-pointer" />
  );
}
