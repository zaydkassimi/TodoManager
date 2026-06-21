import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
    });

    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setDueDate('');
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ marginBottom: '1.5rem' }}>
        New Task
      </button>
    );
  }

  return (
    <div className="task-form-card">
      <div className="task-form-header">New Task</div>
      <form onSubmit={handleSubmit}>
        <div className="task-form-row">
          <div className="form-group task-form-full">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              required
            />
          </div>
          <div className="form-group task-form-full">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="task-form-actions">
          <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
