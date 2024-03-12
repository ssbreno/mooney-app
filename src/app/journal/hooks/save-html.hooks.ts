import { useMutation } from 'react-query';
import { HtmlDocument } from '../../../interfaces/journal';
import axios from 'axios';

export const useSaveHtmlDocumentMutation = () => {
  return useMutation((documentData: HtmlDocument) =>
    axios.post('/api/save-html', documentData),
  );
};
