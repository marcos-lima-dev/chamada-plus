// src/components/classes/ClassCard.jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function ClassCard({ classData, isExpanded, onToggle }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onToggle}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-blue-500" />
          <span>{classData.name}</span>
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Lista de Alunos</h4>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {classData.students.map((student, index) => (
                    <li 
                      key={index}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {student}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Total de alunos: {classData.students.length}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}