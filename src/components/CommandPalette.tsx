import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommandItem {
  label: string;
  path: string;
  icon: string;
  shortcut?: string;
}

const commands: CommandItem[] = [
  { label: 'Home', path: '/', icon: '~', shortcut: '1' },
  { label: 'Blog', path: '/blog', icon: '✎', shortcut: '2' },
  { label: 'About', path: '/about', icon: '◉', shortcut: '3' },
  { label: 'Resources', path: '/resources', icon: '◈', shortcut: '4' },
  { label: 'GitHub', path: 'https://github.com/sharpsalt', icon: '⌥', shortcut: '' },
] as const;

const CommandPalette: React.FC = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const execute = useCallback(
    (cmd: CommandItem) => {
      setOpen(false);
      setQuery('');
      if (cmd.path.startsWith('http')) {
        window.open(cmd.path, '_blank');
      } else {
        navigate(cmd.path);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery('');
        setSelected(0);
      }

      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      execute(filtered[selected]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrapper">
          <span className="cmd-prefix">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="cmd-kbd">esc</kbd>
        </div>

        <div className="cmd-list">
          {filtered.map((cmd, idx) => (
            <button
              key={cmd.label}
              className={`cmd-item ${idx === selected ? 'cmd-item--active' : ''}`}
              onClick={() => execute(cmd)}
              onMouseEnter={() => setSelected(idx)}
            >
              <span className="cmd-item-icon">{cmd.icon}</span>
              <span className="cmd-item-label">{cmd.label}</span>
              {cmd.shortcut && <kbd className="cmd-item-shortcut">{cmd.shortcut}</kbd>}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="cmd-empty">no results found</div>
          )}
        </div>

        <div className="cmd-footer">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
});

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;
