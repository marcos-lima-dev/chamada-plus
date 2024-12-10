// src/components/ui/search.jsx
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Search({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder || "Pesquisar..."}
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  );
}