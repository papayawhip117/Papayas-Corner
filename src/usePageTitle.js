import { useEffect } from 'react';

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Papaya’s Corner` : 'Papaya’s Corner';
  }, [title]);
}
