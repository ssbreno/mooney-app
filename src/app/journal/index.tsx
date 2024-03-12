'use client';
import { useState } from 'react';
import { JournalEntry } from '../../interfaces/journal';
import { useMutation } from 'react-query';
import axios from 'axios';
import { processMarkup } from '../../utils/markup';
import { useSaveHtmlDocumentMutation } from './hooks/save-html.hooks';

export default function JournalPage() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const mutation = useMutation((newEntry: JournalEntry) => {
    return axios.post('/api/journal', {
      content: newEntry.content,
    });
  });

  const handleSave = () => {
    if (entry.trim() !== '') {
      const newEntry = {
        content: entry,
      };
      mutation.mutate(newEntry, {
        onSuccess: () => {
          setEntries((currentEntries) => [...currentEntries, newEntry]);
          alert('Entry saved successfully');
        },
        onError: (error) => {
          console.error('Error saving the entry:', error);
        },
      });
    }
  };

  const {
    mutate: saveHtmlDocument,
    isLoading,
    isError,
  } = useSaveHtmlDocumentMutation();

  const handleShare = () => {
    const htmlEntries = entries
      .map((entry) => processMarkup(entry.content))
      .join('<br>');
    const htmlDocument = `<html><body>${htmlEntries}</body></html>`;

    saveHtmlDocument(
      { htmlDocument },
      {
        onSuccess: () => {
          alert('Document saved successfully');
        },
        onError: (error) => {
          console.error('Error saving the document:', error);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-600">Journal App</h1>
      </header>
      <main className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <textarea
          className="w-full p-20 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
          placeholder="Type here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleShare}
            disabled={isLoading}
          >
            Share
          </button>
          {isError && <p>Error saving document.</p>}
        </div>
      </main>
    </div>
  );
}
