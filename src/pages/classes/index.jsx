// src/pages/classes/index.jsx
import { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { useClasses } from '../../contexts/ClassContext';

const Search = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    </div>
  );
};

// Aqui adicionamos o "export default" que estava faltando
export default function ClassesPage() { 
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllClasses } = useClasses();
  
    const classes = getAllClasses();  

  const handleClassClick = (classId) => {
    setSelectedClass(classId === selectedClass ? null : classId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Turmas</h2>
      </div>

      <Search 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar alunos..."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(classes).map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white p-6 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleClassClick(classItem.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-500" />
                <h3 className="text-lg font-medium">{classItem.name}</h3>
              </div>
              <ChevronRight
                className={`h-5 w-5 transition-transform ${
                  selectedClass === classItem.id ? 'rotate-90' : ''
                }`}
              />
            </div>
            
            {selectedClass === classItem.id && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Lista de Alunos:</h4>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <ul className="space-y-2">
                    {classItem.students
                      .filter(student => 
                        student.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((student, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {student}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Total de alunos visíveis: {classItem.students.filter(student => 
                    student.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length} / {classItem.students.length}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}