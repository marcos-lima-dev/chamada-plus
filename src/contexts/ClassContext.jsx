// src/contexts/ClassContext.jsx
import { createContext, useContext, useState } from 'react';

const CLASS_DATA = {
  'geracao-radical': {
    id: 'geracao-radical',
    name: 'Geração Radical',
    students: [
      "Alice Holanda Victor",
      "Alice Telles",
      "Ana Julia Brito da Silva",
      "Ana Sophia Correa",
      "Aline Moura",
      "Caio Vinicius Cuentro da Silva Col",
      "Camilli Freire Pereira Pacheco",
      "Davi de Lima Araujo do Nascimento",
      "Eduarda Leonidio",
      "Elisa Tulon",
      "Emilly Domingues",
      "Evelyn de Lima",
      "Gabriel Maia Alves Silva",
      "Gabriel Menezes",
      "Giovana Incutto Brabo",
      "Giulia da Silva Amorim",
      "Gustavo Dantas",
      "Isabel Vitória de Mendonça Ferreira",
      "Isabelle da Silva",
      "Jéssica Costa Martins",
      "João Victor Cardoso Ranos",
      "Júlia Tertuliano de Lima",
      "Lara Souza",
      "Lucas Barbosa de Souza",
      "Maria Isabelle",
      "Maria Isabelly",
      "Maria Vitória",
      "Mariana Pessoa",
      "Milena Lourenço Mendanha da Silva",
      "Pedro Luiz",
      "Samuel Cunha de Carvalho",
      "Sarah Cristine"
    ]
  },
  'geracao-mais-radical': {
    id: 'geracao-mais-radical',
    name: 'Geração + Radical',
    students: [
      "Ana Beatriz Antonio",
      "Ana Giulia da Silva",
      "Ana Luiza Balbino",
      "Ana Paula Silva",
      "André Nalli",
      "Anna Beatriz Lopes",
      "Ariel de Nogueira Freire",
      "Arthur Calisto",
      "Arthur Davi Souza Moreira",
      "Beatryce Reis Simões",
      "Bruna Alves dos Santos",
      "Caio Victor Duarte",
      "Camila Correia Lima",
      "Camilli freire Pereira Pacheco",
      "Cassiane Ventura",
      "Cauan Caetano de Souza",
      "Davi de Araújo",
      "Davi de Oliveira Ribeiro",
      "Davi Rodrigues Maia",
      "Emanuel",
      "Emilly Franco",
      "Emilly Miranda",
      "Estefany Patrocinio",
      "Esther de Souza Poncio",
      "Evelyn Olavio",
      "Everton Pessanha Monteiro da",
      "Evelyn Pessanha Monteiro",
      "Gabriel Carvalho Moreira",
      "Gabriel Lopes do Nascimento",
      "Gabriel Oliveira Moura",
      "Guilherme Magalhães",
      "Gustavo Gomes Marques"
    ]
  }
};

const ClassContext = createContext();

export function ClassProvider({ children }) {
  const [classes] = useState(CLASS_DATA);

  const getClass = (classId) => classes[classId];
  const getAllClasses = () => classes;
  const getStudents = (classId) => classes[classId]?.students || [];

  return (
    <ClassContext.Provider value={{ 
      getClass,
      getAllClasses,
      getStudents
    }}>
      {children}
    </ClassContext.Provider>
  );
}

export const useClasses = () => useContext(ClassContext);