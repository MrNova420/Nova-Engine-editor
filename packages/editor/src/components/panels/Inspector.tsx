/**
 * Inspector Panel
 * Property inspector for selected entities
 */

import React from 'react';
import { useAppSelector } from '../../hooks';

interface PropertyFieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  type?: 'number' | 'text' | 'boolean' | 'vector3' | 'color';
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
}) => {
  if (type === 'boolean') {
    return (
      <div className="flex items-center justify-between py-1">
        <label className="text-sm text-editor-text-muted">{label}</label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4"
        />
      </div>
    );
  }

  if (type === 'vector3') {
    return (
      <div className="py-1">
        <label className="text-sm text-editor-text-muted block mb-1">
          {label}
        </label>
        <div className="grid grid-cols-3 gap-1">
          <input
            type="number"
            value={value.x}
            onChange={(e) => onChange({ ...value, x: parseFloat(e.target.value) })}
            className="px-2 py-1 text-xs bg-editor-bg border border-editor-border rounded"
            placeholder="X"
          />
          <input
            type="number"
            value={value.y}
            onChange={(e) => onChange({ ...value, y: parseFloat(e.target.value) })}
            className="px-2 py-1 text-xs bg-editor-bg border border-editor-border rounded"
            placeholder="Y"
          />
          <input
            type="number"
            value={value.z}
            onChange={(e) => onChange({ ...value, z: parseFloat(e.target.value) })}
            className="px-2 py-1 text-xs bg-editor-bg border border-editor-border rounded"
            placeholder="Z"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-1">
      <label className="text-sm text-editor-text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
        className="w-32 px-2 py-1 text-xs bg-editor-bg border border-editor-border rounded focus:outline-none focus:border-editor-primary"
      />
    </div>
  );
};

export const Inspector: React.FC = () => {
  const selectedEntityId = useAppSelector((state) => state.editor.selectedEntityId);

  if (!selectedEntityId) {
    return (
      <div className="h-full flex items-center justify-center bg-editor-surface text-editor-text-muted">
        <p className="text-sm">No entity selected</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-editor-surface">
      {/* Header */}
      <div className="p-3 border-b border-editor-border">
        <h3 className="text-sm font-semibold">Inspector</h3>
      </div>

      {/* Properties */}
      <div className="p-3 space-y-4">
        {/* Transform Component */}
        <div className="border border-editor-border rounded p-3">
          <h4 className="text-sm font-semibold mb-3">Transform</h4>
          <PropertyField
            label="Position"
            value={{ x: 0, y: 0, z: 0 }}
            onChange={() => {}}
            type="vector3"
          />
          <PropertyField
            label="Rotation"
            value={{ x: 0, y: 0, z: 0 }}
            onChange={() => {}}
            type="vector3"
          />
          <PropertyField
            label="Scale"
            value={{ x: 1, y: 1, z: 1 }}
            onChange={() => {}}
            type="vector3"
          />
        </div>

        {/* Mesh Renderer Component */}
        <div className="border border-editor-border rounded p-3">
          <h4 className="text-sm font-semibold mb-3">Mesh Renderer</h4>
          <PropertyField
            label="Cast Shadows"
            value={true}
            onChange={() => {}}
            type="boolean"
          />
          <PropertyField
            label="Receive Shadows"
            value={true}
            onChange={() => {}}
            type="boolean"
          />
          <div className="py-1">
            <button className="w-full px-3 py-1.5 text-xs bg-editor-hover hover:bg-editor-active rounded">
              Select Material
            </button>
          </div>
        </div>

        {/* Add Component Button */}
        <button className="w-full px-3 py-2 text-sm bg-editor-primary hover:bg-editor-primary-hover rounded">
          + Add Component
        </button>
      </div>
    </div>
  );
};
