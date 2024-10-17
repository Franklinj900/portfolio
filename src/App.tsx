import React, { useState, useEffect } from 'react';
import { Atom, Beaker, Book, Briefcase, Github, Linkedin, Mail, MessageSquare, Plus, Link } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const projects = [
  { 
    title: 'Quantum Entanglement Simulator', 
    description: 'A web-based simulator for quantum entanglement experiments.',
    link: 'https://github.com/franklinramos/quantum-simulator'
  },
  { 
    title: 'Neural Network Visualizer', 
    description: 'Interactive tool for visualizing neural network architectures and data flow.',
    link: 'https://github.com/franklinramos/nn-visualizer'
  },
  { 
    title: 'Climate Change Data Analysis', 
    description: 'Python-based analysis of global climate data using machine learning techniques.',
    link: 'https://github.com/franklinramos/climate-analysis'
  },
];

const publications = [
  { title: 'Advancements in Quantum Computing', journal: 'Nature Quantum Information', year: 2023 },
  { title: 'Machine Learning in Climate Science', journal: 'Journal of Climate', year: 2022 },
];

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleString()
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" alt="Franklin Ramos" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
        <h1 className="text-4xl font-bold mb-2">Franklin Ramos</h1>
        <p className="text-xl text-gray-400">Biomedical Engineer | Backend Developer | Data Scientist</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-400 hover:text-blue-300"><Github size={24} /></a>
          <a href="#" className="text-blue-400 hover:text-blue-300"><Linkedin size={24} /></a>
          <a href="#" className="text-blue-400 hover:text-blue-300"><Mail size={24} /></a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="section-title"><Atom className="inline-block mr-2" />About Me</h2>
          <div className="card">
            <p className="mb-4">
              As a backend developer and data scientist with a background in biomedical engineering, I specialize in creating robust server-side applications and deriving insights from complex datasets. My expertise lies in Python, where I leverage its powerful ecosystem for both web development and data analysis.
            </p>
            <p>
              With a strong foundation in scientific computing and machine learning, I excel at developing scalable solutions for data-intensive problems. My work often involves designing efficient APIs, implementing machine learning models, and creating data pipelines that transform raw information into actionable insights.
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title"><Briefcase className="inline-block mr-2" />Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300">
                  <Link size={20} className="mr-2" /> View Project
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title"><Book className="inline-block mr-2" />Publications</h2>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold">{pub.title}</h3>
                <p className="text-gray-300">{pub.journal}, {pub.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title"><MessageSquare className="inline-block mr-2" />Notes</h2>
          <div className="mb-6">
            {isAdding ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-400">Content (Markdown supported)</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div className="flex space-x-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Save Note
                  </button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button onClick={() => setIsAdding(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                <Plus size={20} className="mr-2" /> Add New Note
              </button>
            )}
          </div>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-400">Delete</button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </div>
                <p className="text-sm text-gray-500 mt-2">{note.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2024 Franklin Ramos. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;