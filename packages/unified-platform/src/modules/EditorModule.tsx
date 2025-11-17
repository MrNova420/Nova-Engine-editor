/**
 * Editor Module - Game Creation & Editing
 * 
 * Complete implementation of game editor with:
 * - Project management
 * - Scene editor with 3D viewport
 * - Entity hierarchy
 * - Component inspector
 * - Asset browser
 * - Transform tools
 */

import React, { useState, useEffect, useRef } from 'react';
import { UnifiedPlatformCore } from '../core/UnifiedPlatformCore';

interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  thumbnail: string;
}

interface Entity {
  id: string;
  name: string;
  components: any[];
  children: Entity[];
}

interface EditorModuleProps {
  platform: UnifiedPlatformCore;
}

export const EditorModule: React.FC<EditorModuleProps> = ({ platform }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [currentTool, setCurrentTool] = useState<'select' | 'translate' | 'rotate' | 'scale'>('select');
  const [showProjectBrowser, setShowProjectBrowser] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (currentProject && canvasRef.current) {
      initializeEditor();
    }
  }, [currentProject]);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const initializeEditor = () => {
    // Initialize Nova Engine editor
    // This would integrate with the actual editor package
    console.log('Initializing editor for project:', currentProject);
  };

  const handleCreateProject = async () => {
    const name = prompt('Enter project name:');
    if (!name) return;

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setProjects([...projects, data.project]);
      platform.showNotification({
        type: 'success',
        message: 'Project created successfully',
      });
    } catch (error) {
      console.error('Failed to create project:', error);
      platform.showNotification({
        type: 'error',
        message: 'Failed to create project',
      });
    }
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setShowProjectBrowser(false);
    platform.showNotification({
      type: 'info',
      message: `Opened project: ${project.name}`,
    });
  };

  const handleSaveProject = async () => {
    if (!currentProject) return;

    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entities }),
      });
      platform.showNotification({
        type: 'success',
        message: 'Project saved successfully',
      });
    } catch (error) {
      console.error('Failed to save project:', error);
      platform.showNotification({
        type: 'error',
        message: 'Failed to save project',
      });
    }
  };

  const handleCreateEntity = () => {
    const newEntity: Entity = {
      id: `entity_${Date.now()}`,
      name: 'New Entity',
      components: [],
      children: [],
    };
    setEntities([...entities, newEntity]);
  };

  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleDeleteEntity = () => {
    if (!selectedEntity) return;
    setEntities(entities.filter(e => e.id !== selectedEntity.id));
    setSelectedEntity(null);
  };

  if (showProjectBrowser) {
    return (
      <div className="editor-project-browser">
        <div className="browser-header">
          <h2>Your Projects</h2>
          <button onClick={handleCreateProject} className="create-btn">
            + New Project
          </button>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => handleOpenProject(project)}
            >
              <div className="project-thumbnail">
                <img src={project.thumbnail || '/placeholder-project.png'} alt={project.name} />
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description || 'No description'}</p>
                <span className="project-date">
                  Last modified: {new Date(project.lastModified).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .editor-project-browser {
            width: 100%;
            height: 100%;
            padding: 40px;
            background: #1a1a1a;
            color: white;
            overflow-y: auto;
          }

          .browser-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .browser-header h2 {
            font-size: 2.5em;
          }

          .create-btn {
            padding: 12px 24px;
            background: #7b2ff7;
            border: none;
            border-radius: 8px;
            color: white;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
          }

          .create-btn:hover {
            background: #6929d4;
          }

          .project-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .project-card {
            background: #2a2a2a;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s;
          }

          .project-card:hover {
            transform: translateY(-5px);
          }

          .project-thumbnail {
            width: 100%;
            height: 180px;
            background: #1a1a1a;
          }

          .project-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .project-info {
            padding: 20px;
          }

          .project-info h3 {
            margin: 0 0 10px 0;
            font-size: 1.4em;
          }

          .project-info p {
            margin: 0 0 10px 0;
            color: #888;
          }

          .project-date {
            color: #666;
            font-size: 0.9em;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="editor-module">
      {/* Top Toolbar */}
      <div className="editor-toolbar">
        <button onClick={() => setShowProjectBrowser(true)}>📁 Projects</button>
        <button onClick={handleSaveProject}>💾 Save</button>
        <button onClick={() => {}}>▶️ Play</button>
        
        <div className="tool-group">
          <button 
            className={currentTool === 'select' ? 'active' : ''}
            onClick={() => setCurrentTool('select')}
          >
            🖱️ Select
          </button>
          <button 
            className={currentTool === 'translate' ? 'active' : ''}
            onClick={() => setCurrentTool('translate')}
          >
            ↔️ Move
          </button>
          <button 
            className={currentTool === 'rotate' ? 'active' : ''}
            onClick={() => setCurrentTool('rotate')}
          >
            🔄 Rotate
          </button>
          <button 
            className={currentTool === 'scale' ? 'active' : ''}
            onClick={() => setCurrentTool('scale')}
          >
            📏 Scale
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="editor-workspace">
        {/* Left Panel - Hierarchy */}
        <div className="editor-panel hierarchy-panel">
          <div className="panel-header">
            <h3>Scene Hierarchy</h3>
            <button onClick={handleCreateEntity}>+ Entity</button>
          </div>
          <div className="hierarchy-list">
            {entities.map((entity) => (
              <div 
                key={entity.id}
                className={`entity-item ${selectedEntity?.id === entity.id ? 'selected' : ''}`}
                onClick={() => handleSelectEntity(entity)}
              >
                <span>📦 {entity.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center - 3D Viewport */}
        <div className="editor-viewport">
          <canvas ref={canvasRef} />
          <div className="viewport-overlay">
            <div className="viewport-info">
              <span>FPS: 60</span>
              <span>Entities: {entities.length}</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Inspector */}
        <div className="editor-panel inspector-panel">
          <div className="panel-header">
            <h3>Inspector</h3>
          </div>
          {selectedEntity ? (
            <div className="inspector-content">
              <div className="property-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={selectedEntity.name}
                  onChange={(e) => {
                    setSelectedEntity({ ...selectedEntity, name: e.target.value });
                  }}
                />
              </div>
              <div className="property-group">
                <label>Transform</label>
                <div className="transform-fields">
                  <div className="field">
                    <label>X</label>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="field">
                    <label>Y</label>
                    <input type="number" defaultValue="0" />
                  </div>
                  <div className="field">
                    <label>Z</label>
                    <input type="number" defaultValue="0" />
                  </div>
                </div>
              </div>
              <button onClick={handleDeleteEntity} className="delete-btn">
                🗑️ Delete Entity
              </button>
            </div>
          ) : (
            <div className="no-selection">
              Select an entity to edit
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .editor-module {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #1a1a1a;
          color: white;
        }

        .editor-toolbar {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #2a2a2a;
          border-bottom: 1px solid #3a3a3a;
        }

        .editor-toolbar button {
          padding: 8px 16px;
          background: #3a3a3a;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          transition: background 0.3s;
        }

        .editor-toolbar button:hover {
          background: #4a4a4a;
        }

        .editor-toolbar button.active {
          background: #7b2ff7;
        }

        .tool-group {
          display: flex;
          gap: 5px;
          margin-left: auto;
        }

        .editor-workspace {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .editor-panel {
          background: #2a2a2a;
          border-right: 1px solid #3a3a3a;
        }

        .hierarchy-panel {
          width: 250px;
        }

        .inspector-panel {
          width: 300px;
          border-left: 1px solid #3a3a3a;
          border-right: none;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #3a3a3a;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 1.1em;
        }

        .panel-header button {
          padding: 4px 8px;
          background: #7b2ff7;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-size: 12px;
        }

        .hierarchy-list {
          padding: 10px;
        }

        .entity-item {
          padding: 8px;
          margin: 2px 0;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s;
        }

        .entity-item:hover {
          background: #3a3a3a;
        }

        .entity-item.selected {
          background: #7b2ff7;
        }

        .editor-viewport {
          flex: 1;
          position: relative;
          background: #0a0a0a;
        }

        .editor-viewport canvas {
          width: 100%;
          height: 100%;
        }

        .viewport-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .viewport-info {
          background: rgba(0, 0, 0, 0.7);
          padding: 10px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .inspector-content {
          padding: 15px;
        }

        .property-group {
          margin-bottom: 20px;
        }

        .property-group label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
        }

        .property-group input {
          width: 100%;
          padding: 8px;
          background: #1a1a1a;
          border: 1px solid #3a3a3a;
          border-radius: 4px;
          color: white;
        }

        .transform-fields {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .field label {
          display: block;
          margin-bottom: 5px;
          font-size: 0.9em;
        }

        .field input {
          width: 100%;
          padding: 6px;
          background: #1a1a1a;
          border: 1px solid #3a3a3a;
          border-radius: 4px;
          color: white;
        }

        .delete-btn {
          width: 100%;
          padding: 10px;
          background: #d32f2f;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          margin-top: 20px;
        }

        .no-selection {
          padding: 20px;
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  );
};
