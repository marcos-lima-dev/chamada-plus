// src/pages/attendance/index.jsx
import { useState } from 'react';
import { Calendar, MapPin, User, Check, X } from 'lucide-react';
import { useClasses } from '../../contexts/ClassContext';

export default function AttendancePage() {
  const { getAllClasses, getStudents } = useClasses();
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    teacher: '',
    students: {}
  });
  const [showAlert, setShowAlert] = useState(false);

  const classes = getAllClasses();

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    const students = getStudents(classId);
    const initialAttendance = {};
    students.forEach(student => {
      initialAttendance[student] = false;
    });
    setAttendanceData(prev => ({
      ...prev,
      students: initialAttendance
    }));
  };

  const toggleAttendance = (student) => {
    setAttendanceData(prev => ({
      ...prev,
      students: {
        ...prev.students,
        [student]: !prev.students[student]
      }
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      ...attendanceData,
      classId: selectedClass,
      className: classes[selectedClass].name,
      timestamp: new Date().toISOString()
    };
    
    console.log('Dados da chamada:', dataToSave);
    
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
      setAttendanceData({
        date: new Date().toISOString().split('T')[0],
        location: '',
        teacher: '',
        students: {}
      });
      setSelectedClass('');
    }, 3000);
  };

  return (
    <div className="space-y-6 relative">
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <p>Chamada concluída com sucesso!</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold">Registro de Chamada</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={attendanceData.date}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Local da aula"
              value={attendanceData.location}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Nome do Professor"
              value={attendanceData.teacher}
              onChange={(e) => setAttendanceData(prev => ({ ...prev, teacher: e.target.value }))}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Selecione a Turma</label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassSelect(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Selecione uma turma</option>
              {Object.values(classes).map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedClass && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-4">Lista de Presença</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto p-2">
              {getStudents(selectedClass).map((student, index) => (
                <div
                  key={student}
                  className="bg-gray-50 p-3 rounded-lg flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <span className="text-sm font-medium mb-1 line-clamp-2 h-10">
                    {student}
                  </span>
                  
                  <span className="text-xs text-gray-500 mb-2">
                    Nº {index + 1}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAttendance(student)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                        attendanceData.students[student]
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-green-100'
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => {
                        if (attendanceData.students[student]) {
                          toggleAttendance(student);
                        }
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                        !attendanceData.students[student]
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-red-100'
                      }`}
                    >
                      A
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>
                Presentes: {Object.values(attendanceData.students).filter(Boolean).length} / {
                  getStudents(selectedClass).length
                }
              </span>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Salvar Chamada
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}