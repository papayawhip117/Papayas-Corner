const LABELS = {
  new: 'New!',
  featured: 'Featured',
  'coming-soon': 'Coming soon',
  updated: 'Updated',
};

export default function StatusBadge({ status }) {
  if (!LABELS[status]) return null;
  return <span className={`badge badge--${status}`}>{LABELS[status]}</span>;
}
