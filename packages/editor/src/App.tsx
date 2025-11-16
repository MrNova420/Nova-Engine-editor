/**
 * App Component
 * Root application component with editor shell
 */

import React from 'react';
import { EditorShell } from './components/layout/EditorShell';

export const App: React.FC = () => {
  return <EditorShell />;
};
